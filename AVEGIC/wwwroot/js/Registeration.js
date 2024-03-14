var model = {};
function mysubmit(flag, stage) {
    if (stage == 'CONTINUE') {
        if (flag) {
            if (validationFirstStep()) {
                document.getElementById('accountType').style.display = 'block';
                document.getElementById('basicDetails').style.display = 'none';
                model.name = $("#fullName").val();
                model.email = $("#email").val();
                model.password = $("#password").val();
                model.mobileNo = $("#phone").val();
                console.log(model);
            }
        }
        else {
            window.location = "Login";
        }
    }
    else if (stage == "SUBMIT") {
        if (!flag) {
            document.getElementById('accountType').style.display = 'none';
            document.getElementById('basicDetails').style.display = 'block';
        }
        else {
            if (validationSecondStep()) {
                model.role = $("#userType option:selected").val();
                model.state = $("#userState option:selected").text().trim();
                model.district = $("#investigator_district option:selected").text().trim();
                model.address = $("#address").val();
                $.ajax({
                    type: "post",
                    url: '/Home/SignUp',
                    //contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: { model },

                    aysnc: false,
                    success: function (result) {
                        if (result.status == true) {
                            alertify.set('notifier', 'position', 'top-right');
                            alertify.success(result.message);
                            setTimeout(function () {
                                window.location = "Login";
                            }, 2000);
                        }

                    },

                });
            }
        }
    }
}
function validationFirstStep() {
    var valid = true;
    var fullName = $('#fullName').val();
    var phoneNumber = $('#phone').val();
    var email = $('#email').val();
    var password = $('#password').val();

    // Regular expressions for validation
    var phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Validation checks
    if (!fullName || fullName.trim() === '') {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please enter your full name");
        valid =false;
    }

    if (!phoneRegex.test(phoneNumber)) {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please enter a valid phone number.");
        valid = false;
    }

    if (!emailRegex.test(email)) {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please enter a valid email address.");
        valid = false;
    }

    if (!passwordRegex.test(password)) {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please enter a valid password (at least 8 characters, with at least one uppercase letter, one lowercase letter, and one digit).");
        valid = false;
    }
    return valid;
}

function validationSecondStep() {
    var valid = true;
    var userType = $("#userType option:selected").val();
    var state = $("#userState option:selected").val();
    var district = $("#investigator_district option:selected").val();
    var address = $("#address").val();

    if (!userType || userType.trim() === '-1') {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please select register as.");
        valid = false;
    }

    if (!state || state.trim() === '-1') {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please select state.");
        valid = false;
    }

    if (!district || district.trim() === '-1') {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please select district.");
        valid = false;
    }

    if (!address || address.trim() === '') {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error("Please enter your full address");
        valid = false;
    }
    return valid;
}

$(document).on("change", '.stateselect', function () {
    var id = $(this).find(':selected').val().trim();
    var disId = $(this).attr("disId");
    var dis = $(this).attr("classId");
    $(`#${disId}`).empty();
    $(`#${disId}`).append(`<option value="-1" selected>District</option>`)
    //console.log(dis);
    if (id != -1) {
        $.ajax({
            type: "post",
            url: '/Admin/GetDistrictByState',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },

            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    var model = JSON.parse(result.json);
                    for (var i = 0; i < model.length; i++) {
                        var ob = model[i].Id;
                        var optionValue = String(ob);
                        var optionText = model[i].Name.trim();
                        if (model[i].IsDeleted == false) {
                            $(`#${disId}`).append(`<option value="${optionValue}">
                                           ${optionText}
                                      </option>`);
                        }

                    }

                }

            },

        });
    }
});