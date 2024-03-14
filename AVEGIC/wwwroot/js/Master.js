//import { alertify } from './alertify';
$(document).ready(function () {

    //master tabs
    $(".agencyContent").hide();
    //$(".companyContent").hide();
    $(".yearContent").hide();
    $(".locationContent").hide();
    $(".reportTypeContent").hide();
    $(".departmentContent").hide();
    $(".templateContent").hide();
    $(".dynamicContent").hide();
    $(".calculationContent").hide();
    $(".conclusionContent").hide();
    $(".advocateContent").hide();
    $(document).on("click", ".tabsBtn", function () {
        var cls = $(this).attr("tabClass");
        // $(".tabsBtn").parents().removeClass("masterActive");
        $(".tabsBtn").each(function () {
            $(this).parents().removeClass("masterActive");
        });
        $(".masterContent").children().hide();
        $(`.${cls}`).show();
        $(this).parent().addClass("masterActive");
    });


    if ($('#agencyId').find(':selected').val() == 0) {
        $('.update-btns').hide();
        $('.savebtn').show();
    }
    else {
        $('.update-btns').show();
        $('.savebtn').hide();
    }

    if ($('#companyId').find(':selected').val() == 0) {
        $('.headofficeActionbtns').hide();
        $('.headofficeSavebtns').show();
    }
    else {
        $('.headofficeActionbtns').show();
        $('.headofficeSavebtns').hide();
    }

    if ($('#companybranchId').find(':selected').val() == 0) {
        $('.branchSavebtns').hide();
        $('.BranchActionbtns').hide();
    }
    else {
        if ($('#clientId').find(':selected').val() == 0) {
            $('.branchSavebtns').show();
            $('.BranchActionbtns').hide();
        }
        else {
            $('.branchSavebtns').hide();
            $('.BranchActionbtns').show();
        }

    }


    if ($('#yearId').find(':selected').val() == 0) {
        $('.YearActionbtns').hide();
        $('.YearSavebtns').show();
    }
    else {
        $('.YearActionbtns').show();
        $('.YearSavebtns').hide();
    }

    if ($('#reportTypeId').find(':selected').val() == 0) {
        $('.ReportActionbtns').hide();
        $('.ReportSavebtns').show();
    }
    else {
        $('.ReportActionbtns').show();
        $('.ReportSavebtns').hide();
    }
    if ($('#departmentId').find(':selected').val() == 0) {
        $('.departmentActionbtns').hide();
        $('.departmentSavebtns').show();
    }
    else {
        $('.departmentActionbtns').show();
        $('.departmentSavebtns').hide();
    }
    if ($('#conclusionsetId').find(':selected').val() == 0) {
        $('.ConclusionActionbtns').hide();
        $('.ConclusionSavebtns').show();
    }
    else {
        $('.ConclusionActionbtns').show();
        $('.ConclusionSavebtns').hide();
    }



    if ($('#advocateId').find(':selected').val() == 0) {
        $('.AdvocateActionbtns').hide();
        $('.AdvocateSavebtns').show();
    }
    else {
        $('.AdvocateActionbtns').show();
        $('.AdvocateSavebtns').hide();
    }



    if ($('#StateId').find(':selected').val() == 0) {

        $('.stateActionbtns').hide();
        $('.stateSavebtns').show();
    }
    else {
        $('.stateActionbtns').show();
        $('.stateSavebtns').hide();
    }

    if ($('#stateNameId').find(':selected').val() == 0) {
        $('.districtSavebtns').hide();
        $('.DistrictActionbtns').hide();
    }
    else {
        if ($('#districtId').find(':selected').val() == 0) {
            $('.districtSavebtns').show();
            $('.DistrictActionbtns').hide();
        }
        else {
            $('.districtSavebtns').hide();
            $('.DistrictActionbtns').show();
        }

    }
    if ($('#StatePoliceId').find(':selected').val() == 0) {
        $('.policeSavebtns').hide();
        $('.PoliceStationActionbtns').hide();
    }
    else {
        if ($('#districtPoliceId').find(':selected').val() == 0) {
            $('.policeSavebtns').hide();
            $('.PoliceStationActionbtns').hide();
        }
        else {
            if ($('#PoliceId').find(':selected').val() == 0) {
                $('.policeSavebtns').hide();
                $('.PoliceStationActionbtns').hide();
            }
            else {
                $('.policeSavebtns').hide();
                $('.PoliceStationActionbtns').show();
            }

        }

    }
    //Agency
    $(document).on("click", "#saveAgency", function () {
        ;
        var count = 0;
        var model = {};
        model.Name = $('#agencyname').val();
        model.Abbreviation = $('#abbreviation').val();
        model.Profile = $('#profile').val();
        model.Address_Line1 = $('#addressLine1').val();
        model.Address_Line2 = $('#addressLine2').val();
        model.Mobile = $('#mobile').val();
        model.Email = $('#email').val();
        model.Website = $('#website').val();
        model.PAN_NO = $('#pan').val();
        model.GST_NO = $('#gst').val();
        model.HeaderColor = $('#Agencycolor option:selected').val();
        model.HeaderFontSize = $('#AgencyfontSize option:selected').val();
        model.HeaderFontFamily = $('#Agencyfontfamily option:selected').val();
        model.HeaderFontWeight = $('#AgencyfontWeight option:selected').val();
        model.HeaderBg = $('#Agencybgcolor option:selected').val();
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {
            $.ajax({
                type: "post",
                url: '/Admin/CreateAgency',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.agencydrop').load(" #agencyId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });

        }

    });

    $(document).on("click", "#updateAgency", function () {

        var id = $('#agencyId option:selected').val();
        var model = {};
        model.Name = $('#agencyname').val();
        model.Abbreviation = $('#abbreviation').val();
        model.Profile = $('#profile').val();
        model.Address_Line1 = $('#addressLine1').val();
        model.Address_Line2 = $('#addressLine2').val();
        model.Mobile = $('#mobile').val();
        model.Email = $('#email').val();
        model.Website = $('#website').val();
        model.PAN_NO = $('#pan').val();
        model.GST_NO = $('#gst').val();
        model.HeaderColor = $('#Agencycolor option:selected').val();
        model.HeaderFontSize = $('#AgencyfontSize option:selected').val();
        model.HeaderFontFamily = $('#Agencyfontfamily option:selected').val();
        model.HeaderFontWeight = $('#AgencyfontWeight option:selected').val();
        model.HeaderBg = $('#Agencybgcolor option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/UpdateAgency',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { model, id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.agencydrop').load(" #agencyId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#deleteAgency", function () {
        var id = $('#agencyId option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteAgency',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.agencydrop').load(" #agencyId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });

    $(document).on("change", "#agencyId", function () {

        var id = $(this).val();
        if (id != 0) {
            $('.update-btns').show();
            $('.savebtn').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetAgencyById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        $('#agencyname').val(result.model.name);
                        $('#abbreviation').val(result.model.abbreviation);
                        $('#profile').val(result.model.profile);
                        $('#addressLine1').val(result.model.address_Line1);
                        $('#addressLine2').val(result.model.address_Line2);
                        $('#mobile').val(result.model.mobile);
                        $('#website').val(result.model.website);
                        $('#pan').val(result.model.paN_NO);
                        $('#gst').val(result.model.gsT_NO);
                        $('#email').val(result.model.email);
                        $('#Agencycolor').val(result.model.headerColor).prop('selected', true);
                        $('#AgencyfontSize').val(result.model.headerFontSize).prop('selected', true);
                        $('#Agencyfontfamily').val(result.model.headerFontFamily).prop('selected', true);
                        $('#AgencyfontWeight').val(result.model.headerFontWeight).prop('selected', true);
                        $('#Agencybgcolor').val(result.model.headerBg).prop('selected', true);
                    }

                },

            });
        }
        else {
            $('.update-btns').hide();
            $('.savebtn').show();
            $('#agencyname').val("");
            $('#abbreviation').val("");
            $('#profile').val("");
            $('#addressLine1').val("");
            $('#addressLine2').val("");
            $('#mobile').val("");
            $('#website').val("");
            $('#pan').val("");
            $('#gst').val("");
            $('#email').val("");
            $('#Agencycolor').val("");
            $('#AgencyfontSize').val("");
            $('#Agencyfontfamily').val("");
            $('#AgencyfontWeight').val("");
            $('#Agencybgcolor').val("");
        }

    });

    //HeadOffice
    $(document).on("click", "#saveHeadOffice", function () {
        ;
        var count = 0;
        var model = {};
        model.Name = $('#headofficename').val();
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {

            $.ajax({
                type: "post",
                url: '/Admin/CreateHeadOffice',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.headofficedrop').load(" #companyId");
                        $('.companybranchdrop').load(" #companybranchId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("click", "#updateHeadoffice", function () {

        var id = $('#companyId option:selected').val();
        var model = {};
        model.Name = $('#headofficename').val();
        $.ajax({
            type: "post",
            url: '/Admin/UpdateHeadOffice',
            dataType: "json",
            data: { model, id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.headofficedrop').load(" #companyId");
                    $('.companybranchdrop').load(" #companybranchId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#deleteHeadoffice", function () {
        var id = $('#companyId option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteHeadOffice',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.headofficedrop').load(" #companyId");
                    $('.companybranchdrop').load(" #companybranchId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("change", "#companyId", function () {

        var id = $(this).val();
        if (id != 0) {
            $('.headofficeActionbtns').show();
            $('.headofficeSavebtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetHeadOfficeById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        $('#headofficename').val(result.model.name);
                    }

                },

            });
        }
        else {
            $('.headofficeActionbtns').hide();
            $('.headofficeSavebtns').show();
            $('#agencyname').val("");

        }

    });

    //Branch
    $(document).on("change", "#companybranchId", function () {

        var id = $(this).val();
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/GetBranchById',
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        var model = JSON.parse(result.json);
                        for (var i = 0; i < model.length; i++) {
                            var ob = model[i].Id;
                            var optionValue = String(ob);
                            var optionText = model[i].Name
                            if (model[i].IsDeleted == false) {
                                $('#clientId').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                            }

                        }

                    }
                }

            });
            $('.branchSavebtns').show();
            $('.BranchActionbtns').hide();
        }
        else {
            $('#clientName').val("");
            $('#clientAddress').val("");
            $('#clientSelected').siblings().remove();
            $('.branchSavebtns').hide();
            $('.BranchActionbtns').hide();
        }

    });
    $(document).on("change", "#clientId", function () {

        var id = $(this).val();
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/GetClientById',
                dataType: "json",
                data: { id },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        $('#clientName').val(result.model.name);
                        $('#clientAddress').val(result.model.address);
                        //$('#clientStateNameId').find("option[text=`result.model.state`]").val();
                        var stateId = $('#clientStateNameId option').filter(function () { return $(this).html() == result.model.state; }).val()
                        $(`#clientStateNameId`).val(stateId).prop('selected', true);
                        $('#clientStateNameId').trigger("change", [result.model.district]).delay(5000);
                    }
                }

            });
            $('.branchSavebtns').hide();
            $('.BranchActionbtns').show();
        }
        else {
            $('#clientName').val("");
            $('#clientAddress').val("");
            $('.branchSavebtns').show();
            $('.BranchActionbtns').hide();
        }

    });
    $(document).on("click", "#saveBranch", function () {
        ;
        var count = 0;
        var model = {};
        model.Name = $('#clientName').val();
        model.HeadOfficeId = $('#companybranchId option:selected').val();
        model.State = $('#clientStateNameId option:selected').text();
        model.District = $('#clientDistrictId option:selected').text();
        model.Address = $('#clientAddress').val();
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {

            $.ajax({
                type: "post",
                url: '/Admin/CreateBranch',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.clientdrop').load(" #clientId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("click", "#updateBranch", function () {

        var id = $('#clientId option:selected').val();
        var model = {};
        model.Name = $('#clientName').val();
        model.HeadOfficeId = $('#companybranchId option:selected').val();
        model.State = $('#clientStateNameId option:selected').text();
        model.District = $('#clientDistrictId option:selected').text();
        model.Address = $('#clientAddress').val();
        $.ajax({
            type: "post",
            url: '/Admin/UpdateBranch',
            dataType: "json",
            data: { model, id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.clientdrop').load(" #clientId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#deleteBranch", function () {
        var id = $('#clientId option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteBranch',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.clientdrop').load(" #clientId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("change", "#clientStateNameId", function (event, districtValue) {

        var id = $(this).find(':selected').val().trim();
        if (id != 0) {
            //$('.districtSavebtns').show();
            //$('.DistrictActionbtns').hide();
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
                            var optionText = model[i].Name
                            if (model[i].IsDeleted == false) {
                                $('#clientDistrictId').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                            }

                        }
                        if (districtValue != "") {
                            //$(`#clientDistrictId`).text(districtId).prop('selected', true);
                            var districtId = $('#clientDistrictId option').filter(function () { return $(this).html() == districtValue; }).val()
                            $(`#clientDistrictId`).val(districtId).prop('selected', true);
                        }
                    }

                },

            });
        }
        else {
            $('.districtSavebtns').show();
            $('.DistrictActionbtns').hide();
            $('#district-id').val("");
            $('#districtName').val("");
            $('#districtId').val(0).prop('selected', true);
        }
    });

    //Year
    $(document).on("click", "#saveYear", function () {
        ;
        var count = 0;
        var model = {};
        model.year = $('#year').val();
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {

            $.ajax({
                type: "post",
                url: '/Admin/CreateYear',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.yeardrop').load(" #yearId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("click", "#updateYear", function () {

        var id = $('#yearId option:selected').val();
        var model = {};
        model.year = $('#year').val();
        $.ajax({
            type: "post",
            url: '/Admin/UpdateYear',
            dataType: "json",
            data: { model, id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.yeardrop').load(" #yearId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#deleteYear", function () {
        var id = $('#yearId option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteYear',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.yeardrop').load(" #yearId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("change", "#yearId", function () {

        var id = $(this).val();
        if (id != 0) {
            $('.YearActionbtns').show();
            $('.YearSavebtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetYearById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        $('#year').val(result.model.year);
                    }

                },

            });
        }
        else {
            $('.YearActionbtns').hide();
            $('.YearSavebtns').show();
            $('#year').val("");

        }

    });

    //Advocate
    $(document).on("click", "#saveAdvocate", function () {
        ;
        var model = {};
        model.UserName = $('#emailId').val();
        model.Password = $('#advopassword').val();
        model.Name = $('#advocatename').val();
        model.Email = $('#emailId').val();
        model.PhoneNo = $('#advophone').val();
        model.State = $('#advoStateId option:selected').val();
        model.District = $('#advodistrict option:selected').val();
        model.Policestation = $('#advopolice option:selected').val();
        model.Address = $('#addressId').val();
        var count = 0;
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {

            $.ajax({
                type: "post",
                url: '/Admin/CreateAdvocate',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.advocatedrop').load(" #advocateId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }

    });
    $(document).on("click", "#updateAdvocate", function () {

        var id = $('#advocateId option:selected').val();
        var model = {};
        model.UserName = $('#emailId').val();
        model.Password = $('#advopassword').val();
        model.Name = $('#advocatename').val();
        model.Email = $('#emailId').val();
        model.PhoneNo = $('#advophone').val();
        model.State = $('#advoStateId option:selected').val();
        model.District = $('#advodistrict option:selected').val();
        model.Policestation = $('#advopolice option:selected').val();
        model.Address = $('#addressId').val();
        var count = 0;
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {
            $.ajax({
                type: "post",
                url: '/Admin/UpdateAdvocate',
                dataType: "json",
                data: { model, id },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.advocatedrop').load(" #advocateId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }

    });
    $(document).on("click", "#deleteAdvocate", function () {
        var id = $('#advocateId option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteAdvocate',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.advocatedrop').load(" #advocateId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("change", "#advocateId", function () {

        var id = $(this).val();
        if (id != 0) {
            $('.AdvocateActionbtns').show();
            $('.AdvocateSavebtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetAdvocateById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        $('#advopassword').val(result.model.password);
                        $('#advocatename').val(result.model.name);
                        $('#emailId').val(result.model.email);
                        $('#advoStateId').val(result.model.state).prop('selected', true);
                        $('#advodistrict').val(result.model.district).prop('selected', true);
                        $('#advopolice').val(result.model.poilcestation).prop('selected', true);
                        $('#addressId').val(result.model.address);
                        $('#advophone').val(result.model.phoneNo)
                    }

                },

            });
        }
        else {
            $('.AdvocateActionbtns').hide();
            $('.AdvocateSavebtns').show();
            $('#emailId').val("");
            $('#advopassword').val("");
            ('#advocatename').val("");
            $('#emailId').val("");
            $('#password').val("");
            $('#advoStateId option:selected').val("");
            $('#advodistrict option:selected').val("");
            $('#advopolice option:selected').val("");
            $('#addressId').val("");

        }

    });


    //Template js
    /*$('.update - btns').hide();*/
    $('.answer').hide();
    $('.question').hide();
    $(document).on("change", "#select-datatype", function () {
        ;
        var val = $(this).val();
        if (val == 4 || val == 5) {
            $('.answer').show();
        }
        else {
            $('.answer').hide();
        }
    });
    $(document).on("change", "#select-ques-datatype", function () {
        ;
        var val = $(this).val();
        if (val == 1) {
            $('.question').show();
        }
        else {
            $('.question').hide();
        }
    });
    var dropdownoptionsques = [];
    var dropdownoptions = [];
    var dropid = 0;
    var quesdropid = 0;
    $(document).on("click", "#add-ques-choice", function () {
        ;
        var txt = $('#txtoptionsQues').val();

        var ob = {};
        optionText = txt;
        optionValue = quesdropid;
        ob.optiontxt = txt;
        ob.optionval = quesdropid;
        dropdownoptionsques.push(ob);
        $('#select-ques-choice').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
        quesdropid++;
        console.log(dropdownoptionsques);
    });
    $(document).on("click", "#add-choice", function () {
        ;
        var txt = $('#txtoptions').val();

        var ob = {};
        optionText = txt;
        optionValue = dropid;
        ob.optiontxt = txt;
        ob.optionval = dropid;
        dropdownoptions.push(ob);
        $('#select-choice').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
        dropid++;
        console.log(dropdownoptions);
    });
    var Temp = [];
    var id = 1;
    var ID = 1;
    var QID = 1;
    $(document).on("click", "#add-ques", function () {
        ;
        var ques = $('#question').val();
        var quesdatatype = $("#select-ques-datatype").val();
        var datatype = $("#select-datatype").val();
        var Qclr = $('#select-Qcolor option:selected').val();
        var Qbgclr = $('#select-Qbgcolor option:selected').val();
        var Qhrz = $('#select-Qhorizontal option:selected').val();
        var Qvrt = $('#select-Qverticle option:selected').val();
        var Qfs = $('#select-QfontStyle option:selected').val();
        var Qfw = $('#select-QfontWeight option:selected').val();
        var Aclr = $('#select-Acolor option:selected').val();
        var Abgclr = $('#select-Abgcolor option:selected').val();
        var Ahrz = $('#select-Ahorizontal option:selected').val();
        var Avrt = $('#select-Averticle option:selected').val();
        var Afs = $('#select-AfontStyle option:selected').val();
        var Afw = $('#select-AfontWeight option:selected').val();
        $('#select-choice').empty();
        $('#select-ques-choice').empty();
        $('#txtoptions').val();
        $('#txtoptionsQues').val();
        var quesId = "ques" + id;
        var ansId = "ans" + id;
        var ob = {};
        ob.quesId = quesId;
        ob.ques = ques;
        ob.qdatatype = quesdatatype;
        ob.datatype = datatype;
        ob.qcolor = Qclr;
        ob.qbgcolor = Qbgclr;
        ob.qhorizontal = Qhrz;
        ob.qverticle = Qvrt;
        ob.qfontStyle = Qfs;
        ob.qfontWeight = Qfw;
        ob.acolor = Aclr;
        ob.abgcolor = Abgclr;
        ob.ahorizontal = Ahrz;
        ob.averticle = Avrt;
        ob.afontStyle = Afs;
        ob.afontWeight = Afw;
        dropid = 0;
        if (quesdatatype == 0) {
            if (datatype == 4 || datatype == 5) {
                $('.answer').show();
                $('.temp-body').append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" type="text"  value="${ques}"  style='color:${Qclr};background-color:${Qbgclr};font-weight:${Qfw};vertical-align:${Qvrt};text-align:${Qhrz};font-family:${Qfs}'>
                <span class="input-group-text"></span>
                <select  class="form-control selectques" id="select${ID}" id="${ansId}" placeholder="Answer" aria-label="Server">
                </select>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);

                for (var i = 0; i < dropdownoptions.length; i++) {
                    var optionValue = dropdownoptions[i].optionval;
                    var optionText = dropdownoptions[i].optiontxt;
                    $(`#select${ID}`).append(`<option value="${optionValue}" style="color:${Aclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}">${optionText}
                              </option>`);
                }
                ob.choices = dropdownoptions;
                dropdownoptions = [];
                ID = ID + 1;
            }
            else if (datatype == 2) {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields"> <input class="form-control txtquestions" type="text"  value="${ques}"  style='color:${Qclr};background-color:${Qbgclr};font-weight:${Qfw};vertical-align:${Qvrt};text-align:${Qhrz};font-family:${Qfs}'>
                <span class="input-group-text"></span>
                <textarea type="text" id="${ansId}" class="form-control" placeholder="Answer" rows="1" aria-label="Server"  style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'></textarea>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);
            }
            else if (datatype == 6) {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields"> <input class="form-control txtquestions" type="text"  value="${ques}"  style='color:${Qclr};background-color:${Qbgclr};font-weight:${Qfw};vertical-align:${Qvrt};text-align:${Qhrz};font-family:${Qfs}'>
                <span class="input-group-text"></span>
                <input type="checkbox" id="${ansId}" class="form-check-input check" placeholder="Answer" aria-label="Server" style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);
            }
            else if (datatype == 3) {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields">
                 <input class="form-control txtquestions" type="text"  value="${ques}"  style='color:${Qclr};background-color:${Qbgclr};font-weight:${Qfw};vertical-align:${Qvrt};text-align:${Qhrz};font-family:${Qfs}'>
                <span class="input-group-text"></span>
                <input type="date" id="${ansId}" class="form-control" placeholder="Answer" aria-label="Server"  style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);

            }
            else {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields">
                 <input class="form-control txtquestions" type="text"  value="${ques}"  style='color:${Qclr};background-color:${Qbgclr};font-weight:${Qfw};vertical-align:${Qvrt};text-align:${Qhrz};font-family:${Qfs}'>
                <span class="input-group-text"></span>
                <input type="text" id="${ansId}" class="form-control" placeholder="Answer" aria-label="Server"  style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);
            }
            id = id + 1;
        }
        else if (quesdatatype == 1) {
            if (datatype == 4 || datatype == 5) {
                $('.answer').show();
                $('.temp-body').append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques" id="selectQues${QID}" id="${ansId}" placeholder="" aria-label="Server">
                </select>
                <span class="input-group-text"></span>
                <select  class="form-control selectques" id="select${ID}" id="${ansId}" placeholder="Answer" aria-label="Server">
                </select>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);

                for (var i = 0; i < dropdownoptions.length; i++) {
                    var optionValue = dropdownoptions[i].optionval;
                    var optionText = dropdownoptions[i].optiontxt;
                    $(`#select${ID}`).append(`<option value="${optionValue}" style="color:${Aclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}">${optionText}
                              </option>`);
                }
                ob.choices = dropdownoptions;
                dropdownoptions = [];
                ID = ID + 1;
            }
            else if (datatype == 2) {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields"> <select  class="form-control selectques" id="selectQues${QID}" id="${ansId}" placeholder="" aria-label="Server">
                </select>
                <span class="input-group-text"></span>
                <textarea type="text" id="${ansId}" class="form-control" placeholder="Answer" rows="1" aria-label="Server"  style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'></textarea>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);
            }
            else if (datatype == 6) {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields"> <select  class="form-control selectques" id="selectQues${QID}" id="${ansId}" placeholder="" aria-label="Server">
                </select>
                <span class="input-group-text"></span>
                <input type="checkbox" id="${ansId}" class="form-check-input check" placeholder="Answer" aria-label="Server" style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);
            }
            else if (datatype == 3) {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields">
                 <select  class="form-control selectques" id="selectQues${QID}" id="${ansId}" placeholder="" aria-label="Server">
                </select>
                <span class="input-group-text"></span>
                <input type="date" id="${ansId}" class="form-control" placeholder="Answer" aria-label="Server"  style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);

            }
            else {
                $('.answer').hide();
                $('.temp-body').append(`<div class="input-group mb-3 fields">
                 <select  class="form-control selectques" id="selectQues${QID}" id="${ansId}" placeholder="" aria-label="Server">
                </select>
                <span class="input-group-text"></span>
                <input type="text" id="${ansId}" class="form-control" placeholder="Answer" aria-label="Server"  style='color:${Aclr};background-color:${Abgclr};font-weight:${Afw};vertical-align:${Avrt};text-align:${Ahrz};font-family:${Afs}'>
                <span style="cursor:pointer;" class="remove">&#x2717;</span>
               </div>`);
            }
            for (var i = 0; i < dropdownoptionsques.length; i++) {
                var optionValue = dropdownoptionsques[i].optionval;
                var optionText = dropdownoptionsques[i].optiontxt;
                $(`#selectQues${QID}`).append(`<option value="${optionValue}" style="color:${Qclr};font-weight:${Qfw};vertical-align:${Qvrt};text-align:${Qhrz};font-family:${Qfs}">${optionText}
                              </option>`);
            }
            ob.Qchoices = dropdownoptionsques;
            dropdownoptionsques = [];
            id = id + 1;
            QID++;
        }


        Temp.push(ob);
    });
    $(document).on("click", ".remove", function () {
        ;
        $(this).siblings().remove();
        $(this).remove();
        $(this).parents().remove();
    });
    $(document).on("click", "#removeFields", function () {
        $('.temp-body .add').siblings().remove();
        Temp = [];
        Temp.length = 0;
    });
    $(document).on("click", "#createtemp", function () {
        ;
        var temphtml = $('.temp-body');

        var html = temphtml[0].outerHTML;
        var name = $('#templateName').val();
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Template Name");
        }
        else if (html == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Fields");
        }
        else {
            //var temp = {};
            //temp.TemplateName = name;
            //temp.TemplateFormat = Temp;

            TemplateNameCheck(name).done(function (data) {
                if (data.status == true) {

                    for (var i = 0; i < Temp.length; i++) {
                        //var ob = {};
                        var id = i + 1;
                        var ansId = "ans" + id;
                        if (Temp[i].datatype == 4 || Temp[i].datatype == 5) {
                            var ans = $(`#${ansId}`).find(':selected').text();
                            Temp[i]["answer"] = ans;
                        }
                        else if (Temp[i].datatype == 6) {
                            if ($(`#${ansId}`).prop("checked")) {
                                Temp[i]["answer"] = true;
                            }
                            else {
                                Temp[i]["answer"] = false;
                            }
                        }
                        else {
                            var ans = $(`#${ansId}`).val(); //$(`#select${ID}`)
                            Temp[i]["answer"] = ans;
                        }
                        //Temp[i].push(ob);
                    }
                    var format = JSON.stringify(Temp);
                    var border = $('#tempborder option:selected').val();
                    swal({
                        title: "Are you sure?",
                        text: "Once Created,you will not be able to Edit the Template!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            ;
                            if (willDelete) {
                                $.ajax({
                                    type: "post",
                                    url: '/Admin/CreateTemplate',
                                    //contentType: "application/json; charset=utf-8",
                                    //processData: false,
                                    //traditional: true,
                                    dataType: "json",
                                    data: { name, format, border },
                                    aysnc: false,
                                    success: function (result) {
                                        ;
                                        if (result.status == true) {

                                            swal(result.message, {
                                                icon: "success",
                                            });
                                            Temp = [];
                                            Temp.length = 0;
                                        }
                                        else {
                                            swal(result.message, {
                                                icon: "error",
                                            });
                                        }
                                    },

                                });
                            } else {
                                swal("Template is not Created, You can Edit Template", {
                                    icon: "error",
                                });
                            }
                        });
                }
                else if (data.status == false) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Name is Already Taken");
                }
            });

        }
    });
    $(document).on("click", "#checkName", function () {

        var name = $('#templateName').val();
        $('#resultName').empty();
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Name is Required");
        }
        else {

            TemplateNameCheck(name).done(function (data) {
                if (data.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success("Template Name is Availabel");
                }
                else if (data.status == false) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Name is Already Taken");
                }
            });



        }
    });

    function TemplateNameCheck(name) {

        return $.ajax({
            type: "post",
            url: '/Admin/TemplateNameCheck',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {


            },

        });

    };

    //ReportType
    var reportTypeTemp = [];
    var sequence = {};
    var t = 0;
    var d = 0;
    var c = 0;
    $(document).on("change", "#reporttemplateId", function () {

        var Id = $(this).val();
        var Name = $('#reporttemplateId option:selected').text();
        reportTypeTemp.push(Name);
        var key = "temp" + t;
        sequence[key] = Name;
        t++;
        $('.tempnames').append(`<p><span>${Name}</span><span class="ms-5" style="cursor:pointer" id="rmvTemp">x<span></p>`);
        $('#reporttemplateId option:selected').prop('disabled', true);
    });
    $(document).on("click", "#rmvTemp", function () {

        var dynname = $(this).siblings().text();
        var tg = $(this).parent();
        for (var i = 0; i < reportTypeTemp.length; i++) {

            if (reportTypeTemp[i] === dynname) {

                reportTypeTemp.splice(i, 1);
                $(this).parent().remove();
            }

        }
        for (var key in sequence) {
            if (sequence[key] == dynname) {
                delete sequence[key];
            }
        }
        $('#reporttemplateId option').each(function () {

            var txt = $(this).text();
            if (txt == dynname) {
                $(this).prop('disabled', false);
            }
        })
    });
    var reportTypeDynTable = [];
    $(document).on("change", "#reportdynamictblId", function () {

        var Id = $(this).val();
        var Name = $('#reportdynamictblId option:selected').text();
        reportTypeDynTable.push(Name);
        var key = "dyn" + d;
        sequence[key] = Name;
        d++;
        $('.tempnames').append(`<p><span>${Name}</span><span class="ms-5" style="cursor:pointer" id="rmvDynTemp">x<span></p>`);
        $('#reportdynamictblId option:selected').prop('disabled', true);
    });
    $(document).on("click", "#rmvDynTemp", function () {

        var dynname = $(this).siblings().text();
        for (var i = 0; i < reportTypeDynTable.length; i++) {

            if (reportTypeDynTable[i] === dynname) {

                reportTypeDynTable.splice(i, 1);
                $(this).parent().remove();
            }

        }
        for (var key in sequence) {
            if (sequence[key] == dynname) {
                delete sequence[key];
            }
        }
        $('#reportdynamictblId option').each(function () {

            var txt = $(this).text();
            if (txt == dynname) {
                $(this).prop('disabled', false);
            }
        })
    });
    var reportTypeCalcTable = [];
    $(document).on("change", "#reportcalctblId", function () {

        var Id = $(this).val();
        var Name = $('#reportcalctblId option:selected').text();
        reportTypeCalcTable.push(Name);
        var key = "calc" + c;
        sequence[key] = Name;
        c++;
        $('.tempnames').append(`<p><span>${Name}</span><span class="ms-5" style="cursor:pointer" id="rmvcalcTemp">x<span></p>`);
        $('#reportcalctblId option:selected').prop('disabled', true);
    });
    $(document).on("click", "#rmvcalcTemp", function () {

        var dynname = $(this).siblings().text();
        for (var i = 0; i < reportTypeCalcTable.length; i++) {

            if (reportTypeCalcTable[i] === dynname) {

                reportTypeCalcTable.splice(i, 1);
                $(this).parent().remove();
            }

        }
        for (var key in sequence) {
            if (sequence[key] == dynname) {
                delete sequence[key];
            }
        }
        $('#reportcalctblIdd option').each(function () {

            var txt = $(this).text();
            if (txt == dynname) {
                $(this).prop('disabled', false);
            }
        })
    });
    $(document).on("change", "#reportTypeId", function () {

        reportTypeTemp = [];
        var id = $(this).val();
        if (id != 0) {
            $('.ReportActionbtns').show();
            $('.ReportSavebtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetReportTypeById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        $('#reportType').val(result.model.name);
                        $('.tempnames').empty();
                        var type = JSON.parse(result.model.templates);
                        for (var i = 0; i < type.length; i++) {

                            reportTypeTemp.push(type[i]);
                            $('.tempnames').append(`<p><span>${type[i]}</span><span class="ms-5" style="cursor:pointer" id="rmvTemp">x<span></p>`);
                            $('#reporttemplateId option').each(function () {

                                var txt = $(this).text();
                                if (txt == type[i]) {
                                    $(this).prop('disabled', true);
                                }
                            });
                        }
                        var dyntype = JSON.parse(result.model.dynamicTables);
                        for (var i = 0; i < dyntype.length; i++) {

                            reportTypeDynTable.push(dyntype[i]);
                            $('.tempnames').append(`<p><span>${dyntype[i]}</span><span class="ms-5" style="cursor:pointer" id="rmvDynTemp">x<span></p>`);
                            $('#reportdynamictblId option').each(function () {

                                var txt = $(this).text();
                                if (txt == dyntype[i]) {
                                    $(this).prop('disabled', true);
                                }
                            });
                        }
                        var calctype = JSON.parse(result.model.clacTables);
                        for (var i = 0; i < calctype.length; i++) {

                            reportTypeCalcTable.push(calctype[i]);
                            $('.tempnames').append(`<p><span>${calctype[i]}</span><span class="ms-5" style="cursor:pointer" id="rmvcalcTemp">x<span></p>`);
                            $('#reportcalctblId option').each(function () {

                                var txt = $(this).text();
                                if (txt == calctype[i]) {
                                    $(this).prop('disabled', true);
                                }
                            });
                        }
                    }

                },

            });
        }
        else {
            $('.ReportActionbtns').hide();
            $('.ReportSavebtns').show();
            $('#reportType').val("");

        }

    });
    $(document).on("click", "#saveReport", function () {
        ;
        var count = 0;
        var model = {};
        model.Name = $('#reportType').val();
        model.Templates = JSON.stringify(reportTypeTemp);
        model.DynamicTables = JSON.stringify(reportTypeDynTable);
        model.ClacTables = JSON.stringify(reportTypeCalcTable);
        model.Sequence = JSON.stringify(sequence);
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {

            $.ajax({
                type: "post",
                url: '/Admin/CreateReportType',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        reportTypeTemp = [];
                        reportTypeDynTable = [];
                        reportTypeCalcTable = [];
                        sequence = [];
                        $('.reportdrop').load(" #reportTypeId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("click", "#updateReport", function () {

        var id = $('#reportTypeId option:selected').val();
        var model = {};
        model.Name = $('#reportType').val();
        model.Templates = JSON.stringify(reportTypeTemp);
        model.DynamicTables = JSON.stringify(reportTypeDynTable);
        model.ClacTables = JSON.stringify(reportTypeCalcTable);
        model.Sequence = JSON.stringify(sequence);
        $.ajax({
            type: "post",
            url: '/Admin/UpdateReportType',
            dataType: "json",
            data: { model, id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.reportdrop').load(" #reportTypeId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#deleteReport", function () {
        var id = $('#reportTypeId option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteReportType',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.reportdrop').load(" #reportTypeId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });

    //Department

    $(document).on("click", "#saveDepartment", function () {
        ;
        var count = 0;
        var model = {};
        model.Name = $('#department').val();
        $.each(model, function (index, value) {
            if (value == '') count = count + 1;
        });
        if (count != 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Details is Required");
        }
        else {

            $.ajax({
                type: "post",
                url: '/Admin/CreateDepartment',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.departmentdrop').load(" #departmentId");
                        //window.location.href = "@Url.Action("Index","Admin")";
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("click", "#updateDepartment", function () {

        var id = $('#departmentId option:selected').val();
        var model = {};
        model.Name = $('#department').val();
        $.ajax({
            type: "post",
            url: '/Admin/UpdateDepartment',
            dataType: "json",
            data: { model, id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.departmentdrop').load(" #departmentId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#deleteDepartment", function () {
        var id = $('#departmentId option:selected').val();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteDepartment',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { id },
            aysnc: false,
            success: function (result) {

                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.departmentdrop').load(" #departmentId");
                    //window.location.href = "@Url.Action("Index","Admin")";
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("change", "#departmentId", function () {

        var id = $(this).val();
        if (id != 0) {
            $('.departmentActionbtns').show();
            $('.departmentSavebtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetDepartmentById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        $('#department').val(result.model.name);
                    }

                },

            });
        }
        else {
            $('.departmentActionbtns').hide();
            $('.departmentSavebtns').show();
            $('#department').val("");

        }

    });

    //dynamic table creation

    function DynamciTableNameCheck(name) {

        return $.ajax({
            type: "post",
            url: '/Admin/DynamicTableNameCheck',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {


            },

        });

    };
    var rows = 0;
    var cols = [];
    function createTable1(number_of_rows) {
        $('.modalBody').empty();
        //var number_of_rows = $('#rows').val();
        rows = number_of_rows;
        if (number_of_rows == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Number of rows is Required");
        }
        else {


            var radio = `<div class="form-check">
                    <input class="form-check-input" type="radio" value="0" name="flexRadioDefault" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">
                        ColSpan
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="1" name="flexRadioDefault" id="flexRadioDefault2">
                    <label class="form-check-label" for="flexRadioDefault2">
                       RowSpan
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="2" name="flexRadioDefault" id="flexRadioDefault2">
                    <label class="form-check-label" for="flexRadioDefault2">
                       Width
                    </label>
                </div>`;
            $('.modalBody').append(radio);
            for (var i = 0; i < number_of_rows; i++) {
                var id = "row" + i;
                var string = `<div class="form-group m-3" id=""><label>Enter columns for Row ${i + 1}</label> <input type="text" value="" id='${id}'><div>`
                $('.modalBody').append(string);

            }

            $('#exampleModal').modal("show");
        }
    }
    $(document).on("click", "#createTable", function () {
        ;
        var nr = $('#rows').val();
        createTable1(nr);
        $('#edittable').hide();
        $('#createtable').show();
    });
    var max = 0;
    function createtable2(table_body) {
        for (var i = 0; i < rows; i++) {
            var id = "row" + i;

            //dynamictbldata.push(dr);
            var val2 = $(`#${id}`).val();
            cols.push(val2);
            if (val2 > max) max = val2;
            table_body += '<tr>';
            for (var j = 0; j < val2; j++) {
                var colId = "row" + i + j;
                var widthId = "width" + i + j;
                var height = "height" + i + j;
                var size = "size" + i + j;
                var colorId = "color" + i + j;
                var bgcolorId = "bgcolor" + i + j;
                var fontWeight = "weight" + i + j;
                var verticalId = "verticle" + i + j;
                var horizontalId = "horizontal" + i + j;
                var fontFamily = "family" + i + j;
                var cSet = "conclusionSet" + i + j;
                var cellborder = "cellborder" + i + j;
                var fontsize = "fontsize" + i + j;
                var underline = "underline" + i + j;
                var fontstyle = "fontstyle" + i + j;
                var staticcol = "staticcol" + i + j;
                var fromtemp = "fromtemp" + i + j;
                var totemp = "totemp" + i + j;
                var printshow = "printshow" + i + j;
                var margintop = "margintop" + i + j;
                var marginbottom = "marginbottom" + i + j;
                table_body += '<td style="min-width:350px;">';
                table_body += ` 
                                     
<div class="row">
<div class="col-6">
<select id="${colId}" class="form-select">
                                            <option value="select" selected>DataType</option>
                                            <option value="0">Textbox</option>
                                            <option value="1">Textarea</option>
                                            <option value="2">date</option>
                                            <option value="3">checkbox</option>
                                            <option value="4">Number</option>
                                            <option value="5">Dropdown</option>
                                            <option value="6">File Upload</option>
                                            <option value="7">State</option>
                                            <option value="8">District</option>
                                            <option value="9">PoliceStation</option>
                                            <option value="10">Agency</option>
                                            <option value="11">Branch</option>
                                            <option value="12">Currency</option>
                                            <option value="13">Conclusion Set</option>
                                            <option value="14">Head office</option>
                                            <option value="15">RefId</option>
                                            <option value="16">Advocate</option>
                                            <option value="17">Department</option>
                                            <option value="18">Year</option>
                                        </select>
</div>
<div class="col-6">
<input type="number" id="${widthId}" class="form-control" placeholder="">
</div>
</div>
<div class="row">
<div class="col-6">
<select id="${colorId}" class="form-select">
                                            <option value="select" selected>Text Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
<div class="col-6">
<select id="${bgcolorId}" class="form-select">
                                            <option value="select"  selected>Bg-Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
</div>
<div class="row">
<div class="col-6">
<select id="${verticalId}" class="form-select">
                                            <option value="select"  selected>Verticle Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="top">Top</option>
                                            <option value="bottom">Bottom</option>
</select>
</div>
<div class="col-6">

         <select id="${horizontalId}" class="form-select">
                                            <option value="select" selected>Horizontal Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                            <option value="justify">Justify</option>
</select>
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontWeight}" class="form-select">
                                            <option value="select"  selected>Font Weight</option>
                                            <option value="400">400</option>
                                            <option value="600">600</option>
                                            <option value="800">800</option>
                                            <option value="Bold">Bold</option>
</select>
</div>
<div class="col-6">

 <select id="${fontFamily}" class="form-select">
                                            <option value="select"  selected>Font Family</option>
                                            <option value="Book Antiqua">Book Antiqua</option>
                                            <option value="Arial">Arial</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Comic Sans MS">Comic Sans MS</option>
                                            <option value="Century">Century</option>
                                            <option value="Lucida Console">Lucida Console</option>
                                            <option value="kruti dev">kruti dev</option>
</select>
</div>
</div>
<div class="row">
    <div class="col-6">
    <span style="display:flex;">ConclusionSets
    <input class="form-check" type="checkbox" id="${cSet}" style="margin-left:1em" ></span>
</div>
 <div class="col-6">
 <select id="${cellborder}" class="form-select">
                                            <option value="select"  selected>Border</option>
                                            <option value="border:1px solid black;">full border</option>
                                            <option value="border-right:1px solid black;">right-border</option>
                                            <option value="border-bottom:1px solid black;">bottom-border</option>
                                            <option value="border-left:1px solid black;">left-border</option>
                                            <option value="border-top:1px solid black;">top-border</option>
                                            <option value="border-top:1px solid black;border-bottom:1px solid black;">top bottom border</option>
                                            <option value="no-border">no border</option>
                                            
</select></div>
</div>
<div class="row">
<div class="col-6">
<input type="number" id="${size}" class="form-control" placeholder="width% only">
</div>
<div class="col-6">
<input type="number" id="${height}" class="form-control" placeholder="height in em only">
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontsize}" class="form-select">
                                            <option value="select"  selected>Font Size</option>
                                            <option value="10">10</option>
                                            <option value="12">12</option>
                                            <option value="14">14</option>
                                            <option value="16">16</option>
                                            <option value="18">18</option>
                                            <option value="20">20</option>
                                            <option value="22">22</option>
                                            <option value="24">24</option>
                                            <option value="26">26</option>
                                            <option value="28">28</option>
                                            <option value="30">30</option>
</select>
</div>
<div class="col-6">

 <select id="${underline}" class="form-select">
                                            <option value="none" selected>Text Decoration</option>
                                            <option value="Overline">Overline</option>
                                            <option value="UnderLine">UnderLine</option>
                                            <option value="line-through">line-through</option>
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontstyle}" class="form-select">
                                            <option value="select"  selected>Font Style</option>
                                            <option value="normal">Normal</option>
                                            <option value="italic">Italic</option>
                                            <option value="oblique">Oblique</option>
                                           
</select>
</div>
<div class="col-6">
   <select id="${staticcol}" class="form-select">
                                            <option value="select"  selected>Static column</option>
                                            <option value="disabled">Static</option>
                                            <option value="visible">Dynamic</option>
                                            
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
<input type="text" id="${fromtemp}" class="form-control" placeholder="From (name#row#col)">
</div>
<div class="col-6">
<input type="text" id="${totemp}" class="form-control" placeholder="To (name#row#col)">
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${printshow}" class="form-select">
                                            <option value="visible"selected>Print Show</option>
                                            <option value="visible">Show</option>
                                            <option value="hidden">Not Show</option>
                                           
                                           
</select>
</div>
<div class="col-6">
<input type="text" id="${margintop}" class="form-control" placeholder="margin top">
</div>
</div>
<div class="row">
<div class="col-6">
<input type="text" id="${marginbottom}" class="form-control" placeholder="margin bottom">
</div>
</div>
                                `

                table_body += '</td>';
            }
            table_body += '</tr>';
        }
        return table_body;
    }
    $(document).on("click", "#createtable", function () {
        ;
        cols = [];

        $('#table-datatype').empty();
        var table_body = '<table border="1" class="table">';
        table_body = createtable2(table_body);
        table_body += '</table>';
        $('#table-datatype').append(table_body);
        $('#finishBtn').removeAttr('hidden');
        $('#exampleModal').modal("hide");
    });
    var count = 0;
    var radioval;
    var golabltbldata = {};
    var inpi = 0;
    var stateopt;
    var agencyopt;
    var insureropt;
    function getStates() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllStates',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });;
    }
    function getAgency() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllAgency',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });
    }
    function getInsurer() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllInsurer',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });
    }
    function getHeadoffice() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllHeadOffice',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });
    }
    function getYear() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllYear',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });
    }
    function getAdvocate() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllAdvocate',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });
    }
    function getDepartment() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllDepartment',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });
    }
    async function finishtable() {
        var colChoices = [];


        radioval = $('input[name="flexRadioDefault"]:checked').val();
        for (var i = 0; i < rows; i++) {
            colChoices[i] = {};

            for (var j = 0; j < cols[i]; j++) {
                var key = "row" + i + j;
                var val = $(`#${key}`).val();
                var key2 = "width" + i + j;
                var size = "size" + i + j;
                var height = "height" + i + j;
                var colorId = "color" + i + j;
                var bgcolorId = "bgcolor" + i + j;
                var fontWeight = "weight" + i + j;
                var verticalId = "verticle" + i + j;
                var horizontalId = "horizontal" + i + j;
                var fontFamily = "family" + i + j;
                var cSet = "conclusionSet" + i + j;
                var cellborder = "cellborder" + i + j;
                var fontsize = "fontsize" + i + j;
                var underline = "underline" + i + j;
                var fontstyle = "fontstyle" + i + j;
                var staticcol = "staticcol" + i + j;
                var fromtemp = "fromtemp" + i + j;
                var totemp = "totemp" + i + j;
                var printshow = "printshow" + i + j;
                var margintop = "margintop" + i + j;
                var marginbottom = "marginbottom" + i + j;
                //var location = "location" + i + j;
                colChoices[i][key] = $(`#${key}`).val();
                colChoices[i][key2] = $(`#${key2}`).val();
                colChoices[i][colorId] = $(`#${colorId}`).val();
                colChoices[i][bgcolorId] = $(`#${bgcolorId}`).val();
                colChoices[i][fontWeight] = $(`#${fontWeight}`).val();
                colChoices[i][verticalId] = $(`#${verticalId}`).val();
                colChoices[i][horizontalId] = $(`#${horizontalId}`).val();
                colChoices[i][fontFamily] = $(`#${fontFamily}`).val();
                colChoices[i][size] = $(`#${size}`).val();
                colChoices[i][height] = $(`#${height}`).val();
                colChoices[i][cellborder] = $(`#${cellborder}`).val();
                colChoices[i][fontsize] = $(`#${fontsize}`).val();
                colChoices[i][underline] = $(`#${underline}`).val();
                colChoices[i][fontstyle] = $(`#${fontstyle}`).val();
                colChoices[i][staticcol] = $(`#${staticcol}`).val();
                colChoices[i][fromtemp] = $(`#${fromtemp}`).val();
                colChoices[i][totemp] = $(`#${totemp}`).val();
                colChoices[i][printshow] = $(`#${printshow}`).val();
                colChoices[i][margintop] = $(`#${margintop}`).val();
                colChoices[i][marginbottom] = $(`#${marginbottom}`).val();
                if ($(`#${cSet}`).is(":checked")) {
                    colChoices[i][cSet] = true;
                }
                else {
                    colChoices[i][cSet] = false;
                }

                //colChoices[i][horizontalId] = $(`#${horizontalId}`).val();
            }
        }

        var tblId = "table" + count;
        var dynamictbldata = [];
        var agencyres = await getAgency();
        agencyopt = JSON.parse(agencyres.json);


        var result = await getStates();
        stateopt = JSON.parse(result.json);
        var table_body = `<table id="${tblId}" class="table">`;
        for (var i = 0; i < rows; i++) {
            var id = "row" + i;
            var dr = [];
            var rowno = "" + count + i;
            //if (val2 > max) max = val2;
            table_body += `<tr class="" rowno="${rowno}">`;

            for (var j = 0; j < cols[i]; j++) {
                var celld = {};
                var colId = "row" + i + j;
                var inpId = "col" + i + j;
                var widthId = "width" + i + j;
                var size = "size" + i + j;
                var height = "height" + i + j;
                var colorId = "color" + i + j;
                var bgcolorId = "bgcolor" + i + j;
                var fontWeight = "weight" + i + j;
                var verticalId = "verticle" + i + j;
                var horizontalId = "horizontal" + i + j;
                var fontFamily = "family" + i + j;
                var cSet = "conclusionSet" + i + j;
                var cellborder = "cellborder" + i + j;
                var fontsize = "fontsize" + i + j;
                var underline = "underline" + i + j;
                var fontstyle = "fontstyle" + i + j;
                var staticcol = "staticcol" + i + j;
                var fromtemp = "fromtemp" + i + j;
                var totemp = "totemp" + i + j;
                var printshow = "printshow" + i + j;
                var margintop = "margintop" + i + j;
                var marginbottom = "marginbottom" + i + j;
                //var location = "location" + i + j;
                if (radioval == '0') {
                    celld.datatype = colChoices[i][colId];
                    celld.colspan = colChoices[i][widthId];
                    celld.rowspan = "";
                    celld.height = colChoices[i][height];
                    celld.width = colChoices[i][size];
                    celld.color = colChoices[i][colorId];
                    celld.backgroundcolor = colChoices[i][bgcolorId];
                    celld.verticalalign = colChoices[i][verticalId];
                    celld.textalign = colChoices[i][horizontalId];
                    celld.fontweight = colChoices[i][fontWeight];
                    celld.fontfamily = colChoices[i][fontFamily];
                    celld.cSet = colChoices[i][cSet];
                    celld.cellborder = colChoices[i][cellborder];
                    celld.fontsize = colChoices[i][fontsize];
                    celld.underline = colChoices[i][underline];
                    celld.fontstyle = colChoices[i][fontstyle];
                    celld.staticcol = colChoices[i][staticcol];
                    celld.fromtemp = colChoices[i][fromtemp];
                    celld.totemp = colChoices[i][totemp];
                    celld.printshow = colChoices[i][printshow];
                    celld.margintop = colChoices[i][margintop];
                    celld.marginbottom = colChoices[i][marginbottom];
                    // celld.location = colChoices[i][location];
                    dr.push(celld);
                    if (colChoices[i][colId] == 0) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" style='font-style:${colChoices[i][fontstyle]};font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' value="" class="form-control"> `;
                        table_body += '</td>';

                    }
                    if (colChoices[i][colId] == 1) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<textarea id="inp${inpi}" class="form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 2) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="date" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 3) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="checkbox" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-check"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 4) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="number" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 5) {
                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" list="list${inpi}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"><button type="button" class="btn btn-info" id="addbtndrp">+</button>
                                        <datalist id="list${inpi}">
                                        </datalist>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 6) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="file" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 7) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="state${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>State</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 8) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="state${inpi}" class="stateselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                      <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 9) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="state${inpi}" class="stateselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="districtselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                       <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `<select id="police${inpi}"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  class="form-control">
                                       <option value="0" selected>Poilce</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 10) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="agency${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Agency</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 11) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        //table_body += `<select id="insurer${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                        //                <option value="0" selected>Branch</option>
                        //               </select>`;
                        table_body += `<select id="state${inpi}" class="stateselect form-control branchState"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="form-control branchDistrict" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                      <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `<select id="branch${inpi}" class="branchselect form-control branchTemp"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Branch</option>
                                       </select>`;
                        table_body += `<textarea id="inp${inpi}" class="branch-address form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 12) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}"  type="text" name="currency-field"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  data-type="currency" placeholder="₹ 1,000,000.00" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control currencyField"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 13) {
                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" list="con${inpi}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control">
                                        <datalist id="con${inpi}">
                                        </datalist>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 14) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="head${inpi}" class="headselect form-control headTemp"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Head</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 15) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="av${inpi}" class=" form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Agency</option>
                                       </select>`;
                        table_body += `<textarea id="inp${inpi}" class=" form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;
                        table_body += `<select id="year${inpi}" class="t form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Year</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 16) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="advo${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Advocate</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 17) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="depart${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Department</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 18) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="year${inpi}" class="t form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Year</option>
                                       </select>`;

                        table_body += '</td>';
                    }

                }
                if (radioval == '1') {
                    celld.datatype = colChoices[i][colId];
                    celld.colspan = "";
                    celld.rowspan = colChoices[i][widthId];
                    celld.height = colChoices[i][height];
                    celld.width = colChoices[i][size];
                    celld.color = colChoices[i][colorId];
                    celld.backgroundcolor = colChoices[i][bgcolorId];
                    celld.verticalalign = colChoices[i][verticalId];
                    celld.textalign = colChoices[i][horizontalId];
                    celld.fontweight = colChoices[i][fontWeight];
                    colChoices[i][horizontalId];
                    celld.fontfamily = colChoices[i][fontFamily];
                    celld.cSet = colChoices[i][cSet];
                    celld.cellborder = colChoices[i][cellborder];
                    celld.fontsize = colChoices[i][fontsize];
                    celld.underline = colChoices[i][underline];
                    celld.fontstyle = colChoices[i][fontstyle];
                    celld.staticcol = colChoices[i][staticcol];
                    celld.fromtemp = colChoices[i][fromtemp];
                    celld.totemp = colChoices[i][totemp];
                    celld.printshow = colChoices[i][printshow];
                    celld.margintop = colChoices[i][margintop];
                    celld.marginbottom = colChoices[i][marginbottom];
                    dr.push(celld);
                    if (colChoices[i][colId] == 0) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 1) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<textarea id="inp${inpi}" class="form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 2) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input type="date" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 3) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="checkbox" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-check"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 4) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="number" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 5) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" list="list${inpi}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"><button type="button" class="btn btn-info" id="addbtndrp">+</button>
                                         <datalist id="list${inpi}">
                                        </datalist>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 6) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="file" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 7) {

                        table_body += `<td class="${id}" id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="state${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>State</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 8) {

                        table_body += `<td class="${id}" id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="state${inpi}" class="stateselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                      <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 9) {

                        table_body += `<td class="${id}" id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="state${inpi}" class="stateselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="districtselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                       <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `<select id="police${inpi}"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  class="form-control">
                                       <option value="0" selected>Poilce</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 10) {

                        table_body += `<td class="${id}" id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="agency${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Agency</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 11) {

                        table_body += `<td class="${id}" id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        //table_body += `<select id="insurer${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                        //                <option value="0" selected>Insurer</option>
                        //               </select>`;
                        table_body += `<select id="state${inpi}" class="stateselect form-control branchState"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="form-control branchDistrict" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                      <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `<select id="branch${inpi}" class="branchselect form-control branchTemp"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Branch</option>
                                       </select>`;
                        table_body += `<textarea id="inp${inpi}" class="branch-address form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 12) {
                        table_body += `<td class="${id}"  id="${inpId}" rowspan="${colChoices[i][widthId]}"  style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}"  type="text" name="currency-field"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  data-type="currency" placeholder="₹ 1,000,000.00" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control currencyField"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 13) {
                        table_body += `<td class="${id}" id="${inpId}" rowspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" list="con${inpi}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control">
                                        <datalist id="con${inpi}">
                                        </datalist>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 14) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="head${inpi}" class="headselect form-control headTemp"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Head</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 15) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="av${inpi}" class=" form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Agency</option>
                                       </select>`;
                        table_body += `<textarea id="inp${inpi}" class=" form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;
                        table_body += `<select id="year${inpi}" class="t form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Year</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 16) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="advo${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Advocate</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 17) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="depart${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Department</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 18) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="year${inpi}" class="t form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Year</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                }
                if (radioval == '2') {
                    celld.datatype = colChoices[i][colId];
                    celld.colspan = "";
                    celld.rowspan = "";
                    celld.width = colChoices[i][size];
                    celld.height = colChoices[i][height];
                    celld.color = colChoices[i][colorId];
                    celld.backgroundcolor = colChoices[i][bgcolorId];
                    celld.verticalalign = colChoices[i][verticalId];
                    celld.textalign = colChoices[i][horizontalId];
                    celld.fontweight = colChoices[i][fontWeight];
                    colChoices[i][horizontalId];
                    celld.fontfamily = colChoices[i][fontFamily];
                    celld.cSet = colChoices[i][cSet];
                    celld.cellborder = colChoices[i][cellborder];
                    celld.fontsize = colChoices[i][fontsize];
                    celld.underline = colChoices[i][underline];
                    celld.fontstyle = colChoices[i][fontstyle];
                    celld.staticcol = colChoices[i][staticcol];
                    celld.fromtemp = colChoices[i][fromtemp];
                    celld.totemp = colChoices[i][totemp];
                    celld.printshow = colChoices[i][printshow];
                    celld.margintop = colChoices[i][margintop];
                    celld.marginbottom = colChoices[i][marginbottom];
                    dr.push(celld);
                    if (colChoices[i][colId] == 0) {
                        table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 1) {
                        table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<textarea id="inp${inpi}" class="form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 2) {
                        table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="date" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 3) {
                        table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="checkbox" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-check"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 4) {
                        table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="number" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 5) {
                        table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" list="list${inpi}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"><button type="button" class="btn btn-info" id="addbtndrp">+</button>
                                        <datalist id="list${inpi}">
                                        </datalist>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 6) {
                        table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="file" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 7) {

                        table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="state${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>State</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 8) {

                        table_body += `<td class="${id}" id="${inpId}"  width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="state${inpi}" class="stateselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                      <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 9) {

                        table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="state${inpi}" class="stateselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="districtselect form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                       <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `<select id="police${inpi}"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  class="form-control">
                                       <option value="0" selected>Poilce</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 10) {

                        table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="agency${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Agency</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 11) {

                        table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        //table_body += `<select id="insurer${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                        //                <option value="0" selected>Insurer</option>
                        //               </select>`;
                        table_body += `<select id="state${inpi}" class="stateselect form-control branchState"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                       <option value="0" selected>State</option>
                                       </select>`;

                        table_body += `<select id="district${inpi}" class="form-control branchDistrict" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;' >
                                      <option value="0" selected>District</option>
                                       </select>`;
                        table_body += `<select id="branch${inpi}" class="form-control branchTemp branchSelect"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Branch</option>
                                       </select>`;
                        table_body += `<textarea id="inp${inpi}" class="branch-address form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;


                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 12) {
                        table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}"  type="text" name="currency-field"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  data-type="currency" placeholder="₹ 1,000,000.00" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control currencyField"> `;
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 13) {
                        table_body += `<td class="${id}" id="${inpId}"  width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<input id="inp${inpi}" type="text" list="con${inpi}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control">
                                        <datalist id="con${inpi}">
                                        </datalist>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 14) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="head${inpi}" class="headselect form-control headTemp"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Head</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 15) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<div class="d-flex w-100">`
                        table_body += `<select id="av${inpi}" class=" form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Agency</option>
                                       </select>`;
                        table_body += `<textarea id="inp${inpi}" class=" form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;
                        table_body += `<select id="year${inpi}" class="t form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Year</option>
                                       </select>`;
                        table_body += `</div>`
                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 16) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="advo${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Advocate</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 17) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="depart${inpi}" class="form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  >
                                        <option value="0" selected>Department</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                    if (colChoices[i][colId] == 18) {

                        table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                        table_body += `<select id="year${inpi}" class="t form-control"  style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'>
                                       <option value="0" selected>Year</option>
                                       </select>`;

                        table_body += '</td>';
                    }
                }
                inpi++;
            }
            dynamictbldata.push(dr);
            table_body += '<td><a href="javascript:void(0)" class="deleteCreateDynrow">X</a></td>'
            table_body += '</tr>';
        }
        table_body += '</table>';

        console.log(dynamictbldata);
        golabltbldata[tblId] = dynamictbldata;
        //console.log("jiii");
        //alert("hiii");
        console.log(golabltbldata);
        count++;
        return table_body;
    }

    $(document).on("blur", ".currencyField", function () {
        debugger
        let value = $(this).val();
        if (value === "") {

            return;
        }
        //value = value
        value = value.replace(/,/g, '');
        value = value.replace(/₹/g, '');
        let num = parseFloat(value);
        num = num.toLocaleString("en-IN", { style: "currency", currency: "INR" });
        $(this).val(num.toString());
    });

    $(document).on("click", "#finishBtn", async function () {

        var std = 0;
        var table_body = await finishtable();
        $('#table-content').append(table_body);
        var insurerres = await getInsurer();
        insureropt = JSON.parse(insurerres.json);

        var headres = await getHeadoffice();
        headopt = JSON.parse(headres.json);

        var yearres = await getYear();
        yearopt = JSON.parse(yearres.json);
        var advocateres = await getAdvocate();
        advocateopt = JSON.parse(advocateres.json);
        var departmentres = await getDepartment();
        departmentopt = JSON.parse(departmentres.json);

        var tbllength = Object.keys(golabltbldata).length;
        for (var k = 0; k < tbllength; k++) {
            var tblid = "table" + k;
            for (var i = 0; i < golabltbldata[tblid].length; i++) {
                for (var j = 0; j < golabltbldata[tblid][i].length; j++) {
                    var vl = $(`#inp${val}`).val();
                    golabltbldata[tblid][i][j].value = vl
                    if (golabltbldata[tblid][i][j].datatype == 7) {
                        $(`#state${std}`).empty();
                        $(`#state${std}`).append(`<option value="0" selected>State</option>`);
                        $.each(stateopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Name;
                            $(`#state${std}`).append(`<option value="${optval}">${name}</option>`);
                            console.log(`#state${std} 7`);
                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 8) {
                        $(`#state${std}`).empty();
                        $(`#state${std}`).append(`<option value="0" selected>State</option>`);
                        $.each(stateopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Name;
                            $(`#state${std}`).append(`<option value="${optval}">${name}</option>`);
                        });
                        console.log(`#state${std} 8`);
                    }
                    if (golabltbldata[tblid][i][j].datatype == 9) {
                        $(`#state${std}`).empty();
                        $(`#state${std}`).append(`<option value="0" selected>State</option>`);
                        $.each(stateopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Name;
                            $(`#state${std}`).append(`<option value="${optval}">${name}</option>`);
                            console.log(`#state${std} 9`);
                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 10) {
                        $(`#agency${std}`).empty();
                        $(`#agency${std}`).append(`<option value="0">Agency</option>`);
                        $.each(agencyopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Name;
                            $(`#agency${std}`).append(`<option value="${optval}">${name}</option>`);

                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 11) {
                        //$(`#insurer${std}`).empty();
                        //$(`#insurer${std}`).append(`<option value="0" selected>Insurer</option>`);
                        //$.each(insureropt, function (index, element) {
                        //    
                        //    var id = element.Id;
                        //    var optval = String(id)
                        //    var name = element.Name;
                        //    $(`#insurer${std}`).append(`<option value="${optval}">${name}</option>`);

                        //});
                        $(`#state${std}`).empty();
                        $(`#state${std}`).append(`<option value="0" selected>State</option>`);
                        $.each(stateopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Name;
                            $(`#state${std}`).append(`<option value="${optval}">${name}</option>`);
                            console.log(`#state${std} 9`);
                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 14) {
                        $(`#head${std}`).empty();
                        $(`#head${std}`).append(`<option value="0" selected>Head Office</option>`);
                        $.each(headopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Name;
                            $(`#head${std}`).append(`<option value="${optval}">${name}</option>`);

                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 15) {
                        $(`#av${std}`).empty();
                        $(`#year${std}`).empty();
                        $(`#av${std}`).append(`<option value="0" selected>Agency</option>`);
                        $(`#year${std}`).append(`<option value="0" selected>Year</option>`);
                        $.each(agencyopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Abbreviation;
                            $(`#av${std}`).append(`<option value="${optval}">${name}</option>`);

                        });
                        $.each(yearopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.year;
                            $(`#year${std}`).append(`<option value="${optval}">${name}</option>`);

                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 16) {
                        $(`#advo${std}`).empty();
                        $(`#advo${std}`).append(`<option value="0" selected>Advocate</option>`);
                        $.each(advocateopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.name;
                            $(`#advo${std}`).append(`<option value="${optval}">${name}</option>`);

                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 17) {
                        $(`#depart${std}`).empty();
                        $(`#depart${std}`).append(`<option value="0" selected>Department</option>`);
                        $.each(departmentopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.Name;
                            $(`#depart${std}`).append(`<option value="${optval}">${name}</option>`);

                        });
                    }
                    if (golabltbldata[tblid][i][j].datatype == 18) {
                        $(`#year${std}`).empty();
                        $(`#year${std}`).append(`<option value="0" selected>Year</option>`);
                        $.each(yearopt, function (index, element) {

                            var id = element.Id;
                            var optval = String(id)
                            var name = element.year;
                            $(`#year${std}`).append(`<option value="${optval}">${name}</option>`);

                        });
                    }
                    std++;

                }
            }
        }

    });
    var dpv = 0;
    $(document).on("click", "#addbtndrp", function () {

        var v = $(this).prev().val();
        var dp = $(this).next();
        dp.append(`<option value="${v}"><option>`);
        dpv++;
    });
    $(document).on("click", "#dynamictblcheckName", function () {

        var name = $('#dynamictblName').val();
        $('#resultName').empty();
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Name is Required");
        }
        else {

            DynamciTableNameCheck(name).done(function (data) {
                if (data.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success("Template Name is Availabel");
                }
                else if (data.status == false) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Name is Already Taken");
                }
            });



        }
    });
    var val = 0;
    $(document).on("click", "#createdynamictbl", function () {

        ;
        var temphtml = $('.table-content');
        var name = $('#dynamictblName').val();

        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Template Name");
        }

        else {
            //$.each(golabltbldata,key,val)
            var tbllength = Object.keys(golabltbldata).length;
            for (var k = 0; k < tbllength; k++) {
                var tblid = "table" + k;
                for (var i = 0; i < golabltbldata[tblid].length; i++) {
                    for (var j = 0; j < golabltbldata[tblid][i].length; j++) {
                        var vl = $(`#inp${val}`).val();
                        golabltbldata[tblid][i][j].value = vl;

                        if (golabltbldata[tblid][i][j].datatype == 5) {
                            var optn = [];
                            //var dt = 
                            $(`#list${val} option`).each(function () {
                                var vt = $(this).val();
                                if (vt != "") {
                                    optn.push(vt);
                                }

                            });
                            golabltbldata[tblid][i][j]["options"] = optn;
                            var vl = $(`#inp${val}`).val();
                            if (typeof vl == "undefined") vl = "Select";
                            golabltbldata[tblid][i][j].value = vl;
                        }
                        if (golabltbldata[tblid][i][j].datatype == 7) {
                            $.each(stateopt.model, function (index, element) {

                                var id = element.id;
                                var name = element.name;
                                $(`#state${val}`).append(`<option value="${id}">${name}</option>`);
                            });
                        }
                        if (golabltbldata[tblid][i][j].datatype == 8) {
                            $.each(stateopt.model, function (index, element) {

                                var id = element.id;
                                var name = element.name;
                                $(`#state${val}`).append(`<option value="${id}">${name}</option>`);
                            });
                        }
                        if (golabltbldata[tblid][i][j].datatype == 9) {
                            $.each(stateopt.model, function (index, element) {

                                var id = element.id;
                                var name = element.name;
                                $(`#state${val}`).append(`<option value="${id}">${name}</option>`);
                            });
                        }
                        val++;
                    }
                }
            }


            DynamciTableNameCheck(name).done(function (data) {
                if (data.status == true) {
                    var format = JSON.stringify(golabltbldata);
                    var border = $('#dynborder option:selected').val();
                    var display = $('#dyndisplay option:selected').val();
                    var model = {};
                    model.TableName = name;
                    model.TableFormat = format;
                    model.Border = border;
                    model.Display = display;
                    swal({
                        title: "Are you sure?",
                        text: "Once Created,you will not be able to Edit the Template!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            ;
                            if (willDelete) {
                                $.ajax({
                                    type: "post",
                                    url: '/Admin/CreateDynamicTable',
                                    //contentType: "application/json; charset=utf-8",
                                    //processData: false,
                                    //traditional: true,
                                    dataType: "json",
                                    data: { model },
                                    aysnc: false,
                                    success: function (result) {
                                        ;
                                        if (result.status == true) {

                                            swal(result.message, {
                                                icon: "success",
                                            });
                                            golabltbldata = {};
                                            inpi = 0;
                                            count = 0;
                                            //.length = 0;
                                        }
                                        else {
                                            swal(result.message, {
                                                icon: "error",
                                            });
                                        }
                                    },

                                });
                            } else {
                                swal("Template is not Created, You can Edit Template", {
                                    icon: "error",
                                });
                            }
                        });
                }
                else if (data.status == false) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Name is Already Taken");
                }
            });
        }
    });
    $(document).on("click", "#removedynamicFields", function () {
        $('#table-datatype').children().remove();
        $('#table-content').children().remove();
        golabltbldata = {};
    });
    $(document).on("click", ".deleteCreateDynrow", function () {

        //$(this).parents().remove();
        var item = $(this).parents("tr");
        var rowno = item.attr("rowno");
        item.remove();
        console.log(golabltbldata);
        var tbllength = Object.keys(golabltbldata).length;
        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < golabltbldata[tblid].length; i++) {
                var r = "" + k + i;
                if (r == rowno) {

                    golabltbldata[tblid].splice(i, 1);

                }
            }
        }
        console.log(golabltbldata);

    });

    //calculation table
    var calcrows = 0;
    var calccols = [];
    function CalcNameCheck(name) {

        return $.ajax({
            type: "post",
            url: '/Admin/CalcNameCheck',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {


            },

        });

    };
    function createCalcTable1(number_of_rows_calc) {
        calcrows = number_of_rows_calc;
        if (number_of_rows_calc == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Number of rows is Required");
        }
        else {
            for (var i = 0; i < number_of_rows_calc; i++) {
                var id = "rows" + i;
                var string = `<div class="form-group m-3" id=""><label>Enter columns for Row ${i + 1}</label> <input type="text" value="" id='${id}'><div>`
                $('.modalCalcBody').append(string);

            }

            $('#calcModal').modal("show");
        }
    }
    $(document).on("click", "#createCalcTable", function () {
        ;
        $('.modalCalcBody').empty();
        var number_of_rows_calc = $('#calcrows').val();
        createCalcTable1(number_of_rows_calc);
        $('#editcalctable').hide();
        $('#createcalctable').show();

    });
    var max = 0;
    function createCalcTable2(table_body) {
        for (var i = 0; i < calcrows; i++) {
            var id = "rows" + i;
            var val2 = $(`#${id}`).val();
            calccols.push(val2);
            if (val2 > max) max = val2;
            table_body += '<tr>';
            for (var j = 0; j < val2; j++) {
                var colId = "row" + i + j;
                var widthId = "width" + i + j;
                var height = "height" + i + j;
                var size = "size" + i + j;
                var colorId = "color" + i + j;
                var bgcolorId = "bgcolor" + i + j;
                var fontWeight = "weight" + i + j;
                var verticalId = "verticle" + i + j;
                var horizontalId = "horizontal" + i + j;
                var fontFamily = "family" + i + j;
                var cSet = "conclusionSet" + i + j;
                var cellborder = "cellborder" + i + j;
                var fontsize = "fontsize" + i + j;
                var underline = "underline" + i + j;
                var fontstyle = "fontstyle" + i + j;
                var staticcol = "staticcol" + i + j;
                var fromtemp = "fromtemp" + i + j;
                var totemp = "totemp" + i + j;
                var printshow = "printshow" + i + j;
                table_body += '<td style="min-width:350px;">';
                table_body += ` 
                                     
<div class="row">
<div class="col-6">
<select id="${colId}" class="form-select">
                                            <option value="select"  selected>DataType</option>
                                            <option value="0">Textbox</option>
                                            <option value="1">Textarea</option>
                                            <option value="2">date</option>
                                            <option value="3">checkbox</option>
                                            <option value="4">Number</option>
                                            <option value="5">Dropdown</option>
                                            <option value="6">File Upload</option>
                                            <option value="7">Currency</option>
                                        </select>
</div>
<div class="col-6">
<input type="number" id="${widthId}" class="form-control" placeholder="">
</div>
</div>
<div class="row">
<div class="col-6">
<select id="${colorId}" class="form-select">
                                            <option value="select"  selected>Text Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
<div class="col-6">
<select id="${bgcolorId}" class="form-select">
                                            <option value="select"  selected>Bg-Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
</div>
<div class="row">
<div class="col-6">
<select id="${verticalId}" class="form-select">
                                            <option value="select"  selected>Verticle Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="top">Top</option>
                                            <option value="bottom">Bottom</option>
</select>
</div>
<div class="col-6">

         <select id="${horizontalId}" class="form-select">
                                            <option value="select"  selected>Horizontal Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                            <option value="justify">Justify</option>
</select>
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontWeight}" class="form-select">
                                            <option value="select"  selected>Font Weight</option>
                                            <option value="400">400</option>
                                            <option value="600">600</option>
                                            <option value="800">800</option>
                                            <option value="Bold">Bold</option>
</select>
</div>
<div class="col-6">

 <select id="${fontFamily}" class="form-select">
                                            <option value="select"  selected>Font Family</option>
                                            <option value="Book Antiqua">Book Antiqua</option>
                                            <option value="Arial">Arial</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Comic Sans MS">Comic Sans MS</option>
                                            <option value="Century">Century</option>
                                            <option value="Lucida Console">Lucida Console</option>
                                            <option value="kruti dev">kruti dev</option>
</select>
</div>
</div>
<div class="row">
    <div class="col-6">
    <span style="display:flex;">ConclusionSets
    <input class="form-check" type="checkbox" id="${cSet}" style="margin-left:1em" ></span>
</div>
 <div class="col-6">
 <select id="${cellborder}" class="form-select">
                                            <option value="select"  selected>Border</option>
                                            <option value="border:1px solid black;">full border</option>
                                            <option value="border-right:1px solid black;">right-border</option>
                                            <option value="border-bottom:1px solid black;">bottom-border</option>
                                            <option value="border-left:1px solid black;">left-border</option>
                                            <option value="border-top:1px solid black;">top-border</option>
                                            <option value="border-top:1px solid black;border-bottom:1px solid black;">top bottom border</option>
                                            <option value="no-border">no border</option>
                                            
</select></div>
</div>
<div class="row">
<div class="col-6">
<input type="number" id="${size}" class="form-control" placeholder="width% only">
</div>
<div class="col-6">
<input type="number" id="${height}" class="form-control" placeholder="height in em only">
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontsize}" class="form-select">
                                            <option value="select"  selected>Font Size</option>
                                            <option value="10">10</option>
                                            <option value="12">12</option>
                                            <option value="14">14</option>
                                            <option value="16">16</option>
                                            <option value="18">18</option>
                                            <option value="20">20</option>
                                            <option value="22">22</option>
                                            <option value="24">24</option>
                                            <option value="26">26</option>
                                            <option value="28">28</option>
                                            <option value="30">30</option>
</select>
</div>
<div class="col-6">

 <select id="${underline}" class="form-select">
                                            <option value="select"  selected>Text Decoration</option>
                                            <option value="Overline">Overline</option>
                                            <option value="UnderLine">UnderLine</option>
                                            <option value="line-through">line-through</option>
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontstyle}" class="form-select">
                                            <option value="select"  selected>Font Style</option>
                                            <option value="normal">Normal</option>
                                            <option value="italic">Italic</option>
                                            <option value="oblique">Oblique</option>
                                           
</select>
</div>
<div class="col-6">
   <select id="${staticcol}" class="form-select">
                                            <option value="select"  selected>Static column</option>
                                            <option value="disabled">Static</option>
                                            <option value="visible">Dynamic</option>
                                            
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
<input type="text" id="${fromtemp}" class="form-control" placeholder="From (name#row#col)">
</div>
<div class="col-6">
<input type="text" id="${totemp}" class="form-control" placeholder="To (name#row#col)">
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${printshow}" class="form-select">
                                            <option value="visible"selected>Print Show</option>
                                            <option value="visible">Show</option>
                                            <option value="hidden">Not Show</option>
                                           
                                           
</select>
</div>
</div>


                                `

                table_body += '</td>';
            }
            table_body += '</tr>';
        }
        return table_body;
    }
    $(document).on("click", "#createcalctable", function () {
        ;
        calccols = [];

        $('#calc-table-datatype').empty();
        var table_body = '<table border="1" class="table">';
        table_body += createCalcTable2(table_body);
        table_body += '</table>';
        $('#calc-table-datatype').html(table_body);
        $('#calc-finishBtn').removeAttr('hidden');
        $('#calcModal').modal("hide");
    });
    var count = 0;
    var calcglobaldata = {};
    var calinp = 0;
    function CalcFinish() {
        var colChoices = [];
        for (var i = 0; i < calcrows; i++) {
            colChoices[i] = {};

            for (var j = 0; j < calccols[i]; j++) {
                var key = "row" + i + j;
                var val = $(`#${key}`).val();
                var key2 = "width" + i + j;
                var size = "size" + i + j;
                var height = "height" + i + j;
                var colorId = "color" + i + j;
                var bgcolorId = "bgcolor" + i + j;
                var fontWeight = "weight" + i + j;
                var verticalId = "verticle" + i + j;
                var horizontalId = "horizontal" + i + j;
                var fontFamily = "family" + i + j;
                var cSet = "conclusionSet" + i + j;
                var cellborder = "cellborder" + i + j;
                var fontsize = "fontsize" + i + j;
                var underline = "underline" + i + j;
                var fontstyle = "fontstyle" + i + j;
                var staticcol = "staticcol" + i + j;
                var fromtemp = "fromtemp" + i + j;
                var totemp = "totemp" + i + j;
                var printshow = "printshow" + i + j;
                var margintop = "margintop" + i + j;
                var marginbottom = "marginbottom" + i + j;
                //var location = "location" + i + j;
                colChoices[i][key] = $(`#${key}`).val();
                colChoices[i][key2] = $(`#${key2}`).val();
                colChoices[i][colorId] = $(`#${colorId}`).val();
                colChoices[i][bgcolorId] = $(`#${bgcolorId}`).val();
                colChoices[i][fontWeight] = $(`#${fontWeight}`).val();
                colChoices[i][verticalId] = $(`#${verticalId}`).val();
                colChoices[i][horizontalId] = $(`#${horizontalId}`).val();
                colChoices[i][fontFamily] = $(`#${fontFamily}`).val();
                colChoices[i][size] = $(`#${size}`).val();
                colChoices[i][height] = $(`#${height}`).val();
                colChoices[i][cellborder] = $(`#${cellborder}`).val();
                colChoices[i][fontsize] = $(`#${fontsize}`).val();
                colChoices[i][underline] = $(`#${underline}`).val();
                colChoices[i][fontstyle] = $(`#${fontstyle}`).val();
                colChoices[i][staticcol] = $(`#${staticcol}`).val();
                colChoices[i][fromtemp] = $(`#${fromtemp}`).val();
                colChoices[i][totemp] = $(`#${totemp}`).val();
                colChoices[i][margintop] = $(`#${margintop}`).val();
                colChoices[i][marginbottom] = $(`#${marginbottom}`).val();
                if ($(`#${cSet}`).is(":checked")) {
                    colChoices[i][cSet] = true;
                }
                else {
                    colChoices[i][cSet] = false;
                }
            }
        }

        var caldata = [];
        var tblId = "table" + count;
        var table_body = `<table id="${tblId}" class="table">`;
        for (var i = 0; i < calcrows; i++) {
            var id = "rows" + i;
            var dr = [];
            //if (val2 > max) max = val2;
            var rowno = "" + count + i;
            table_body += `<tr rowno="${rowno}">`;
            for (var j = 0; j < calccols[i]; j++) {
                var cold = {};
                var celld = {};
                var colId = "row" + i + j;
                var inpId = "col" + i + j;
                var widthId = "width" + i + j;
                var size = "size" + i + j;
                var height = "height" + i + j;
                var colorId = "color" + i + j;
                var bgcolorId = "bgcolor" + i + j;
                var fontWeight = "weight" + i + j;
                var verticalId = "verticle" + i + j;
                var horizontalId = "horizontal" + i + j;
                var fontFamily = "family" + i + j;
                var cSet = "conclusionSet" + i + j;
                var cellborder = "cellborder" + i + j;
                var fontsize = "fontsize" + i + j;
                var underline = "underline" + i + j;
                var fontstyle = "fontstyle" + i + j;
                var staticcol = "staticcol" + i + j;
                var fromtemp = "fromtemp" + i + j;
                var totemp = "totemp" + i + j;
                var printshow = "printshow" + i + j;
                var margintop = "margintop" + i + j;
                var marginbottom = "marginbottom" + i + j;
                celld.datatype = colChoices[i][colId];
                celld.colspan = "";
                celld.rowspan = "";
                celld.width = colChoices[i][size];
                celld.height = colChoices[i][height];
                celld.color = colChoices[i][colorId];
                celld.backgroundcolor = colChoices[i][bgcolorId];
                celld.verticalalign = colChoices[i][verticalId];
                celld.textalign = colChoices[i][horizontalId];
                celld.fontweight = colChoices[i][fontWeight];
                colChoices[i][horizontalId];
                celld.fontfamily = colChoices[i][fontFamily];
                celld.cSet = colChoices[i][cSet];
                celld.cellborder = colChoices[i][cellborder];
                celld.fontsize = colChoices[i][fontsize];
                celld.underline = colChoices[i][underline];
                celld.fontstyle = colChoices[i][fontstyle];
                celld.staticcol = colChoices[i][staticcol];
                celld.fromtemp = colChoices[i][fromtemp];
                celld.totemp = colChoices[i][totemp];
                celld.margintop = colChoices[i][margintop];
                celld.marginbottom = colChoices[i][marginbottom];
                dr.push(celld);
                if (colChoices[i][colId] == 0) {
                    table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${calinp}" type="text" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 1) {
                    table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<textarea id="inp${calinp}" class="form-control" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" row="1"></textarea>`;
                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 2) {
                    table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${calinp}" type="date" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 3) {
                    table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${calinp}" type="checkbox" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-check"> `;
                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 4) {
                    table_body += `<td class="${id}"  id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${inpi}" type="number" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 5) {
                    table_body += `<td class="${id}" id="${inpId}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${calinp}" type="text" list="list${calinp}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"><button type="button" class="btn btn-info" id="addcalcbtndrp">+</button>
                                        <datalist id="list${calinp}">
                                        </datalist>`;

                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 6) {
                    table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${calinp}" type="file" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control"> `;
                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 7) {
                    table_body += `<td class="${id}"  id="${inpId}" colspan="${colChoices[i][widthId]}" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${calinp}" type="text" name="currency-field" pattern="^₹\s?(\d{1,3}(,\d{2,3})*(\.\d{2})?|\d{1,})(,\d{2})?$" data-type="currency" placeholder="₹ 1,00,000.00" style="font-style:${colChoices[i][fontstyle]}; text-decoration:${colChoices[i][underline]}; font-size:${colChoices[i][fontsize]}; color:${colChoices[i][colorId]}; background-color:${colChoices[i][bgcolorId]}; font-weight:${colChoices[i][fontWeight]}; vertical-align:${colChoices[i][verticalId]}; text-align:${colChoices[i][horizontalId]}; font-family:${colChoices[i][fontFamily]}; height:${colChoices[i][height]}em;" value="" class="form-control currencyField"> `;
                    table_body += '</td>';
                }
                if (colChoices[i][colId] == 8) {
                    table_body += `<td class="${id}" id="${inpId}" colspan="${colChoices[i][widthId]}" width="${colChoices[i][size]}%" style="${colChoices[i][cellborder]};margin-top:${colChoices[i][margintop]}em;margin-bottom:${colChoices[i][marginbottom]}em">`;
                    table_body += `<input id="inp${calinp}" type="text" list="con${calinp}" style='font-style:${colChoices[i][fontstyle]};text-decoration:${colChoices[i][underline]};font-size:${colChoices[i][fontsize]};color:${colChoices[i][colorId]};background-color:${colChoices[i][bgcolorId]};font-weight:${colChoices[i][fontWeight]};vertical-align:${colChoices[i][verticalId]};text-align:${colChoices[i][horizontalId]};font-family:${colChoices[i][fontFamily]};height:${colChoices[i][height]}em;'  value="" class="form-control">
                                        <datalist id="con${calinp}">
                                        </datalist>`;

                    table_body += '</td>';
                }
                calinp++;
            }

            //table_body += `<td class="${id}" style="vertical-align : middle;text-align:center;" id="${inpId}">`;
            //table_body += `<input type="radio" class="form-check" value="0" id="${id}add" name="${id}add"><span style="cursor:pointer;" id="addBtn">+</span>`
            //table_body += `<input type="radio" class="form-check" value="1" id="${id}add" name="${id}add"><span style="cursor:pointer; margin-left:1em;" id="multiBtn">*</span>`
            //table_body += '</td>';
            table_body += '<td><a href="javascript:void(0)" class="deleteCreateCalcrow">X</a></td>'
            table_body += '</tr>';
            caldata.push(dr);
        }

        table_body += '</table>';

        console.log(caldata);
        calcglobaldata[tblId] = caldata;
        //console.log("jiii");
        //alert("hiii");
        console.log(calcglobaldata);
        count++;
        return table_body;
    }
    $(document).on("click", "#calc-finishBtn", function () {

        var table_body = CalcFinish();

        $('#calc-table-content').append(table_body);
        $('#operations').removeAttr("hidden");

    });
    var dpv = 0;
    $(document).on("click", "#addcalcbtndrp", function () {

        var v = $(this).prev().val();
        var dp = $(this).next();
        dp.append(`<option value="${v}"><option>`);
        dpv++;
    });
    $(document).on("click", "#addBtn", function () {

        var id = $(this).parents().attr('class');
        var addcol = $(this).parents().prev().attr('id');
        var sum = 0;
        //console.log(id);
        $(`.${id}`).each(function () {

            var type = $(this).children().attr('type');
            if (type == 'number' && $(this).attr('id') != addcol) {
                var val = parseInt($(this).children().val());
                sum = sum + val;
            }

        });
        $(`#${addcol}`).children().attr('value', sum);
        //alert(addcol);
    });
    $(document).on("click", "#multiBtn", function () {
        var id = $(this).parents().attr('class');
        var addcol = $(this).parents().prev().prev().attr('id');
        var sum = 1;
        //console.log(id);
        $(`.${id}`).each(function () {

            var type = $(this).children().attr('type');
            if (type == 'number' && $(this).attr('id') != addcol) {
                var val = parseInt($(this).children().val());
                sum = sum * val;
            }

        });
        $(`#${addcol}`).children().attr('value', sum);

    });

    $(document).on("click", "#calctblcheckName", function () {

        var name = $('#calctblName').val();
        $('#resultName').empty();
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Name is Required");
        }
        else {

            CalcNameCheck(name).done(function (data) {
                if (data.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success("Template Name is Availabel");
                }
                else if (data.status == false) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Name is Already Taken");
                }
            });



        }
    });
    var operations = {};
    $(document).on("click", "#addOperations", function () {

        operations = {};
        var add = $("#addition").val();
        var mul = $("#multiplication").val();
        var sub = $("#subtraction").val();
        var div = $("#division").val();
        var per = $("#percentage").val();
        var sing = $("#singleAddition").val();
        if (add != "") {
            var item = add.split(',');
            operations["addition"] = item;
        }
        if (mul != "") {
            var item = mul.split(',');
            operations["multiplication"] = item;
        }
        if (sub != "") {
            var item = sub.split(',');
            operations["subtraction"] = item;
        }
        if (div != "") {
            var item = div.split(',');
            operations["division"] = item;
        }
        if (per != "") {
            var item = per.split(',');
            operations["percentage"] = item;
        }
        if (sing != "") {
            var item = sing.split(',');
            operations["singleaddition"] = item;
        }
        alertify.set('notifier', 'position', 'top-right');
        alertify.success("Operation Added Successfully");
        console.log(operations);
    });
    var calval = 0;
    $(document).on("click", "#createcalctbl", function () {
        ;
        var temphtml = $('.table-content');
        var name = $('#calctblName').val();
        //var html = temphtml.outerHTML;
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Please Enter Template Name");
        }
        //else if (html == "") {
        //    alertify.set('notifier', 'position', 'top-right');
        //    alertify.error("Please Enter Fields");
        //}
        else {
            var tbllength = Object.keys(calcglobaldata).length;
            for (var k = 0; k < tbllength; k++) {
                var tblid = "table" + k;
                for (var i = 0; i < calcglobaldata[tblid].length; i++) {
                    for (var j = 0; j < calcglobaldata[tblid][i].length; j++) {

                        var vl = $(`#inp${calval}`).val();
                        if (typeof vl == "undefined") vl = "";
                        calcglobaldata[tblid][i][j].value = vl;

                        if (calcglobaldata[tblid][i][j].datatype == 5) {
                            var optn = [];
                            //var dt = 
                            var vl = $(`#inp${calval}`).val();
                            $(`#list${calval} option`).each(function () {
                                var vt = $(this).val();
                                if (vt != "") {
                                    optn.push(vt);
                                }

                            });
                            calcglobaldata[tblid][i][j]["options"] = optn;
                            if (typeof vl == "undefine") vl = "Select";
                            calcglobaldata[tblid][i][j].value = vl;
                        }
                        if (calcglobaldata[tblid][i][j].datatype == 7) {
                            var vl = $(`#inp${calval}`).val();
                            if (typeof vl == "undefined" || vl == "") vl = 0.00;
                            calcglobaldata[tblid][i][j].value = vl;
                        }
                        calval++;
                    }
                }
            }
            CalcNameCheck(name).done(function (data) {
                if (data.status == true) {
                    var format = JSON.stringify(calcglobaldata);
                    var border = $('#calcborder option:selected').val();
                    var billtype = $('#calcBill option:selected').val();
                    var operation = JSON.stringify(operations);
                    var model = {};
                    model.CalcName = name;
                    model.CalcFormat = format;
                    model.Border = border;
                    model.BillType = billtype;
                    model.Operations = operation;
                    swal({
                        title: "Are you sure?",
                        text: "Once Created,you will not be able to Edit the Template!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            ;
                            if (willDelete) {
                                $.ajax({
                                    type: "post",
                                    url: '/Admin/CreateCalcTable',
                                    //contentType: "application/json; charset=utf-8",
                                    //processData: false,
                                    //traditional: true,
                                    dataType: "json",
                                    data: { model },
                                    aysnc: false,
                                    success: function (result) {
                                        ;
                                        if (result.status == true) {

                                            swal(result.message, {
                                                icon: "success",
                                            });
                                            calcdata = [];
                                            calval = 0;
                                            //.length = 0;
                                        }
                                        else {
                                            swal(result.message, {
                                                icon: "error",
                                            });
                                        }
                                    },

                                });
                            } else {
                                swal("Template is not Created, You can Edit Template", {
                                    icon: "error",
                                });
                            }
                        });
                }
                else if (data.status == false) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error("Name is Already Taken");
                }
            });
        }
    });
    $(document).on("click", "#removecalcFields", function () {
        $('#calc-table-datatype').children().remove();
        $('#calc-table-content').children().remove();
        calcdata = [];
    });
    $(document).on("click", ".deleteCreateCalcrow", function () {

        //$(this).parents().remove();
        var item = $(this).parents("tr");
        var rowno = item.attr("rowno");
        item.remove();
        console.log(calcglobaldata);
        var tbllength = Object.keys(calcglobaldata).length;
        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < calcglobaldata[tblid].length; i++) {
                var r = "" + k + i;
                if (r == rowno) {

                    calcglobaldata[tblid].splice(i, 1);

                }
            }
        }
        console.log(calcglobaldata);

    });

    //Render and Edit templates
    EditGlobal = [];
    dynmodel = {};
    var EditTempName;
    var delname;
    var rowcount;
    $(document).on("change", "#tempId", function () {

        $(".renderTemps").empty();
        var name = $(this).find(':selected').text();
        delname = name;
        $.ajax({
            type: "post",
            url: '/Reports/RenderTemplate',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {

                if (result.model != null) {
                    var format = JSON.parse(result.model.templateFormat);
                    data = format;
                    EditGlobal = format;
                    dynmodel.Id = result.model.id;
                    dynmodel.TemplateName = result.model.templateName;
                    dynmodel.TemplateId = result.model.templateId;
                    dynmodel.Created_Date = result.model.created_Date;
                    dynmodel.IsDeleted = result.model.isDeleted;
                    dynmodel.Border = result.model.border;
                    console.log(EditGlobal);
                    var ID = 1;
                    var quesId = "ques";
                    var ansdId = "ans";
                    for (var i = 0; i < format.length; i++) {
                        //var ques = format[i].ques;
                        result.model.templateName = result.model.templateName.split(" ").join("");
                        result.model.templateName = result.model.templateName.replace(/[^\w\s]/gi, '');
                        if (format[i].qdatatype == 0) {
                            if (format[i].datatype == 0 || format[i].datatype == 1) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" id="${quesId + i}" type="text"  value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <input type="text" class="form-control txtanswer" id="${ansdId + i}" value="${format[i].answer}" placeholder="" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               <a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div>

`);

                            }
                            if (format[i].datatype == 4 || format[i].datatype == 5) {
                                $(`.renderTemps`).append(
                                    `<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" id="${quesId + i}" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <select  class="form-control selectques  ${result.model.templateName + ID}" id="${ansdId + i}" placeholder="" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                </select><a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
               </div> `);

                                var array = format[i].choices;
                                for (var j = 0; j < array.length; j++) {
                                    var optionValue = array[j].optionval;
                                    var optionText = array[j].optiontxt;
                                    $(`.${result.model.templateName + ID}`).append(`<option value="${optionValue}" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                                   ${optionText}
                              </option>`);
                                }
                                ID = ID + 1;
                            }
                            if (format[i].datatype == 3) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" id="${quesId + i}" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <input type="date" class="form-control txtanswer" id="${ansdId + i}" value="${format[i].answer}" placeholder="" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
<a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div> `);

                            }
                            if (format[i].datatype == 6) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" id="${quesId + i}" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <input type="checkbox" class="form-check-input txtanswer check" id="" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
<a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div> `);

                            }
                            if (format[i].datatype == 2) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" id="${quesId + i}" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <textarea type="text" class="form-control txtanswer" id="${ansdId + i}" value="${format[i].answer}" placeholder="" rows="1" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>${format[i].answer}</textarea>
<a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div> `);

                            }
                        }
                        else if (format[i].qdatatype == 1) {
                            if (format[i].datatype == 0 || format[i].datatype == 1) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName}" id="${quesId + i}" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <input type="text" class="form-control txtanswer" id="${ansdId + i}" value="${format[i].answer}" placeholder="" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               <a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div>

`);

                            }
                            if (format[i].datatype == 4 || format[i].datatype == 5) {
                                $(`.renderTemps`).append(
                                    `<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName}" id="${quesId + i}" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <select  class="form-control selectques  ${result.model.templateName + ID}" id="${ansdId + i}" placeholder="" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                </select><a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
               </div> `);

                                var array = format[i].choices;
                                for (var j = 0; j < array.length; j++) {
                                    var optionValue = array[j].optionval;
                                    var optionText = array[j].optiontxt;
                                    $(`.${result.model.templateName + ID}`).append(`<option value="${optionValue}" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                                   ${optionText}
                              </option>`);
                                }
                                ID = ID + 1;
                            }
                            if (format[i].datatype == 3) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName}" id="${quesId + i}" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <input type="date" class="form-control txtanswer" id="${ansdId + i}" value="${format[i].answer}" placeholder="" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
<a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div> `);

                            }
                            if (format[i].datatype == 6) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName}" id="${quesId + i}" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <input type="checkbox" class="form-check-input txtanswer check" id="" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
<a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div> `);

                            }
                            if (format[i].datatype == 2) {
                                $(`.renderTemps`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName}" id="${quesId + i}" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <textarea type="text" class="form-control txtanswer" id="${ansdId + i}" value="${format[i].answer}" placeholder="" rows="1" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>${format[i].answer}</textarea>
<a href="javascript:void(0)" count="${i}" id="edittemprow">Edit</a>
</div> `);

                            }

                            for (var j = 0; j < format[i].Qchoices.length; j++) {
                                var optionValue = format[i].Qchoices[j].optionval;
                                var optionText = format[i].Qchoices[j].optiontxt;
                                $(`#${quesId + i}`).append(`<option value="${optionValue}" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                                   ${optionText}
                              </option>`);
                            }
                        }

                        if (dynmodel.Border == "0") {
                            $(`.renderTemps`).css("border", "1px solid black");
                            //$(`.tbl:th`).css("border", "1px solid black");
                            //$(`.tbl:td`).css("border", "1px solid black");
                        }
                        else if (dynmodel.Border == "1") {
                            $(`.renderTemps`).css("border-right", "1px solid black");
                            //$(`.tbl:th`).css("border-right", "1px solid black");
                            //$(`.tbl:td`).css("border-right", "1px solid black");
                        }
                        else if (dynmodel.Border == "2") {
                            $(`.renderTemps`).css("border-left", "1px solid black");
                            //$(`.tbl:th`).css("border-left", "1px solid black");
                            //$(`.tbl:td`).css("border-left", "1px solid black");
                        }
                        else if (dynmodel.Border == "3") {
                            $(`.renderTemps`).css("border-top", "1px solid black");
                            //$(`.tbl:th`).css("border-top", "1px solid black");
                            //$(`.tbl:td`).css("border-top", "1px solid black");

                        }
                        else if (dynmodel.Border == "4") {
                            $(`.renderTemps`).css("border-bottom", "1px solid black");
                            //$(`.tbl:th`).css("border-bottom", "1px solid black");
                            //$(`.tbl:td`).css("border-bottom", "1px solid black");
                        }


                    }

                }

            },
        });
    });
    var questionName;
    var QuestionId;
    var AnswerId;
    //Simple Templates
    $(document).on("click", "#edittemprow", function () {

        $('#editTemp').modal('show');
        $('.quesEditDrop').hide();
        $('.ansEditDrop').hide();
        rowcount = $(this).attr("count");
        var ques = $(this).siblings().first('input').val();
        $('#editQuestionName').val(ques);
        QuestionId = "ques" + rowcount;
        AnswerId = "ans" + rowcount;
        if (EditGlobal[rowcount]['qdatatype'] == 1) {
            $('.quesEditDrop').show();
            for (var i = 0; i < EditGlobal[rowcount]['Qchoices'].length; i++) {
                var optionValue = EditGlobal[rowcount]['Qchoices'][i].optionval;
                var optionText = EditGlobal[rowcount]['Qchoices'][i].optiontxt;
                $('#edit-ques-choice').append(`<option value="${optionValue}" style=''>
                                   ${optionText}
                              </option>`);
            }
        }
        if (EditGlobal[rowcount]['datatype'] == 4 || EditGlobal[rowcount]['datatype'] == 5) {
            $('.ansEditDrop').show();
            for (var i = 0; i < EditGlobal[rowcount]['choices'].length; i++) {
                var optionValue = EditGlobal[rowcount]['choices'][i].optionval;
                var optionText = EditGlobal[rowcount]['choices'][i].optiontxt;
                $('#edit-ans-choice').append(`<option value="${optionValue}" style=''>
                                   ${optionText}
                              </option>`);
            }
        }



    });
    $(document).on("click", "#edit-Addques-choice", function () {
        ;
        var txt = $('#EdittxtoptionsQues').val();

        var ob = {};
        optionText = txt;
        var lastValue = $('#edit-ques-choice option:last-child').val() + 1;
        optionValue = lastValue;
        ob.optiontxt = txt;
        ob.optionval = lastValue;
        EditGlobal[rowcount]['Qchoices'].push(ob);
        $('#edit-ques-choice').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
        //quesdropid++;
        //console.log(dropdownoptionsques);
    });
    $(document).on("click", "#edit-Addans-choice", function () {
        ;
        var txt = $('#Edittxtoptions').val();

        var ob = {};
        optionText = txt;
        var lastValue = $('#edit-ans-choice option:last-child').val() + 1;
        optionValue = lastValue;
        ob.optiontxt = txt;
        ob.optionval = lastValue;
        EditGlobal[rowcount]['choices'].push(ob);
        $('#edit-ans-choice').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
        //dropid++;
        //console.log(dropdownoptions);
    });
    $(document).on("click", "#Templaterowedit", function () {

        var ques = $('#editQuestionName').val();
        var Qcolor = $('#edit-Qcolor option:selected').val();
        var Qbgcolor = $('#edit-Qbgcolor option:selected').val();
        var Qhorizontal = $('#edit-Qhorizontal option:selected').val();
        var Qverticle = $('#edit-Qverticle option:selected').val();
        var QfontStyle = $('#edit-QfontStyle option:selected').val();
        var QfontWeight = $('#edit-QfontWeight option:selected').val();
        var Acolor = $('#edit-Acolor option:selected').val();
        var Abgcolor = $('#edit-Abgcolor option:selected').val();
        var Ahorizontal = $('#edit-Ahorizontal option:selected').val();
        var Averticle = $('#edit-Averticle option:selected').val();
        var AfontWeight = $('#edit-AfontStyle option:selected').val();
        var AfontStyle = $('#edit-AfontWeight option:selected').val();
        $(`#${QuestionId}`).val(ques);
        $(`#${QuestionId}`).css({ "color": Qcolor, "background-color": Qbgcolor, "font-weight": QfontStyle, "vertical-align": Qverticle, "text-align": Qhorizontal, "font-family": QfontWeight });

        $(`#${AnswerId}`).css({ "color": Acolor, "background-color": Abgcolor, "font-weight": AfontStyle, "vertical-align": Averticle, "text-align": Ahorizontal, "font-family": AfontWeight });
        for (var i = 0; i < EditGlobal.length; i++) {
            if (i == rowcount) {
                if (EditGlobal[i].qdatatype == 1) {
                    $(`#${QuestionId}`).empty();
                    for (var j = 0; j < EditGlobal[rowcount]['Qchoices'].length; j++) {
                        var optionValue = EditGlobal[rowcount]['Qchoices'][j].optionval;
                        var optionText = EditGlobal[rowcount]['Qchoices'][j].optiontxt;
                        $(`#${QuestionId}`).append(`<option value="${optionValue}" style=''>
                                   ${optionText}
                              </option>`);
                    }
                }
                if (EditGlobal[i].datatype == 4 || EditGlobal[i].datatype == 5) {
                    $(`#${AnswerId}`).empty();
                    for (var j = 0; j < EditGlobal[rowcount]['choices'].length; j++) {
                        var optionValue = EditGlobal[rowcount]['choices'][j].optionval;
                        var optionText = EditGlobal[rowcount]['choices'][j].optiontxt;
                        $(`#${AnswerId}`).append(`<option value="${optionValue}" style=''>
                                   ${optionText}
                              </option>`);
                    }
                }


                EditGlobal[i].ques = ques;
                EditGlobal[i].qcolor = Qcolor;
                EditGlobal[i].qbgcolor = Qbgcolor;
                EditGlobal[i].qfontWeight = QfontWeight;
                EditGlobal[i].qverticle = Qverticle;
                EditGlobal[i].qhorizontal = Qhorizontal;
                EditGlobal[i].qfontStyle = QfontStyle;
                EditGlobal[i].acolor = Acolor;
                EditGlobal[i].abgcolor = Abgcolor;
                EditGlobal[i].afontWeight = AfontStyle;
                EditGlobal[i].averticle = Averticle;
                EditGlobal[i].ahorizontal = Ahorizontal;
                EditGlobal[i].afontStyle = AfontWeight;

            }
        }
        console.log(EditGlobal);
        swal("Changes saved successfully", {
            icon: "success",
        });

    });
    $(document).on("click", "#updateTemplates", function () {

        var name = EditTempName;
        for (var i = 0; i < EditGlobal.length; i++) {
            //var ob = {};
            var id = i + 1;
            var ansId = "ans" + i;
            if (EditGlobal[i].datatype == 4 || EditGlobal[i].datatype == 5) {
                var ans = $(`#${ansId}`).find(':selected').text();
                EditGlobal[i]["answer"] = ans;
            }
            else if (EditGlobal[i].datatype == 6) {
                if ($(`#${ansId}`).prop("checked")) {
                    EditGlobal[i]["answer"] = true;
                }
                else {
                    EditGlobal[i]["answer"] = false;
                }
            }
            else {
                var ans = $(`#${ansId}`).val(); //$(`#select${ID}`)
                EditGlobal[i]["answer"] = ans;
            }
            //Temp[i].push(ob);
        }
        var format = JSON.stringify(EditGlobal);
        var border = $('#tempEditborder option:selected').val();
        var obj = {};
        obj = dynmodel;
        obj.TemplateFormat = format;
        obj.Border = border;

        $.ajax({
            type: "post",
            url: '/Admin/UpdateTemplate',
            dataType: "json",
            data: { obj },
            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#clearTemplates", function () {
        $('.renderTemps').empty();
        $('#stage2editTemp').empty();
        EditGlobal = [];
        dynmodel = {};
    });
    $(document).on("click", "#deleteTemplates", function () {
        var name = $("#tempId").find(':selected').text();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteTemplate',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.editTempdrop').load("#tempId");
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });

    //Dynamic Templates
    var stl = 0;
    $(document).on("change", "#dynamicTableId", async function () {

        $(".renderDynTemps").empty();
        dynmodel = {};
        var name = $(this).find(':selected').text();
        var statel = await getStates();
        var statelist = JSON.parse(statel.json);

        var agencyr = await getAgency();
        var agencylist = JSON.parse(agencyr.json);

        var insurerr = await getInsurer();
        var insurerlist = JSON.parse(insurerr.json);

        var headres = await getHeadoffice();
        headlist = JSON.parse(headres.json);

        var yearres = await getYear();
        yearlist = JSON.parse(yearres.json);

        var advocateres = await getAdvocate();
        advocatelist = JSON.parse(advocateres.json);

        var departmentres = await getDepartment();
        departmentlist = JSON.parse(departmentres.json);

        $.ajax({
            type: "post",
            url: '/Admin/RenderDynaimcTable',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {

                if (result.model != null) {
                    var format = JSON.parse(result.model.tableFormat);
                    EditGlobal = format;
                    console.log(format);
                    dynmodel.Id = result.model.Id;
                    dynmodel.TableName = result.model.tableName;
                    dynmodel.TableId = result.model.tableId;
                    dynmodel.Created_Date = result.model.created_Date;
                    dynmodel.IsDeleted = result.model.isDeleted;
                    dynmodel.Border = result.model.border;
                    console.log(EditGlobal);
                    //data = format;
                    tabelName = result.model.tableName;
                    var tblname = result.model.tableName.replace(/[^\w\s]/gi, '');
                    tblname = tblname.split(" ").join("");
                    EditTempName = tblname;
                    $(`#dynEditborder`).val(result.model.border).prop("selected", true);
                    $(`#dynEditdisplay`).val(result.model.display).prop("selected", true);
                    var displayTable = result.model.display;
                    var tbllength = Object.keys(format).length;
                    for (var it = 0; it < tbllength; it++) {
                        var tblid = "table" + it;
                        var table_body = `<table id="" class="table tbl" style="border-collapse:collapse; margin-bottom:0;">`;
                        for (var i = 0; i < format[tblid].length; i++) {
                            var rowNo = "" + it + i;
                            table_body += `<tr class="" rowno="${rowNo}">`;
                            for (var j = 0; j < format[tblid][i].length; j++) {
                                var dynid = tblname + it + i + j;
                                if (format[tblid][i][j].height == "null" || typeof format[tblid][i][j].height == "undefined" || format[tblid][i][j].height == "" || format[tblid][i][j].height == "undefined") format[tblid][i][j].height = 2;
                                if (format[tblid][i][j].datatype == '0') {
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="text" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '1') {
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea class="form-control" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em !important;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '2') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="date" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '3') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="checkbox" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-check"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '4') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="number" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '5') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea type="text" id="dyn${dynid}" list="list2${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control">${format[tblid][i][j].value}</textarea>
                                                   <a type="" href="javascript:void(0);" style="color:blue;curson:pointer;" class="" id="editbtndrp">+</a>
                                                   <a type="" href="javascript:void(0);" style="color:red;curson:pointer;" class="" id="deloption">x</a>
                                               <select id="list2${dynid}" class="form-control selectTextarea" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                               <option value="select" selected>Select</option>
                                               </select>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '6') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="file" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '7') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="state${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>State</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '8') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<div class="d-flex w-100">`
                                    table_body += `<select id="state${dynid}" class="stateselect form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>State</option>
                                       </select>`;

                                    table_body += `<select id="district${dynid}" class="form-control" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                      <option value="0" selected>District</option>
                                       </select>`;
                                    table_body += `</div>`
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '9') {

                                    table_body += `<td class="" id="$" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<div class="d-flex w-100">`
                                    table_body += `<select id="state${dynid}" class="stateselect form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                       <option value="0" selected>State</option>
                                       </select>`;

                                    table_body += `<select id="district${dynid}" class="districtselect form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>District</option>
                                       </select>`;
                                    table_body += `<select id="police${dynid}"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  class="form-control">
                                       <option value="0" selected>Poilce</option>
                                       </select>`;
                                    table_body += `</div>`
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '10') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="agency${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>Agency</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '11') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    //table_body += `<select id="insurer${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                    //    <option value="0" selected>Insurer</option>
                                    //   </select>`;
                                    table_body += `<select id="state${dynid}" class="stateselect form-control branchState"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                       <option value="0" selected>State</option>
                                       </select>`;

                                    table_body += `<select id="district${dynid}" class="districtselect form-control branchDistrict"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>District</option>
                                       </select>`;
                                    table_body += `<select id="branch${dynid}" class="branchselect form-control branchTemp"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>Branch</option>
                                       </select>`;
                                    table_body += `<textarea class="branch-address form-control" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em !important;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '12') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="text" name="currency-field"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  data-type="currency" placeholder="₹ 1,000,000.00"  id="dyn${dynid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control currencyField"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '13') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea type="text" id="dyn${dynid}" list="con${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"></textarea>
                                               <select id="con${dynid}" class="form-control selectTextarea" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                        </select>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '14') {

                                    table_body += `<td class="" id="$" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<div class="d-flex w-100">`
                                    table_body += `<select id="head${dynid}" class="headselect form-control headTemp"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                       <option value="0" selected>Head Office</option>
                                       </select>`;

                                    table_body += `</div>`
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '15') {

                                    table_body += `<td class="" id="$" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<div class="d-flex w-100">`
                                    table_body += `<select id="av${dynid}" class=" form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                       <option value="0" selected>Agency</option>
                                       </select>`;
                                    table_body += `<textarea class="form-control" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em !important;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;
                                    table_body += `<select id="year${dynid}" class=" form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>Year</option>
                                       </select>`;
                                    table_body += `</div>`
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '16') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="advo${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>Advocate</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '17') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="department${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>Department</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '18') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="year${dynid}" class=" form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>Year</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                            }

                            table_body += '<td><a href="javascript:void(0)" class="deletedynrow">X</a></td>'
                            table_body += '</tr>';
                        }
                        table_body += '</table>';
                        $(`.renderDynTemps`).append(table_body);


                    }

                    if (dynmodel.Border == "0") {
                        $(`.renderDynTemps`).css("border", "1px solid black");
                        //$(`.tbl tr`).css("border", "1px solid black");
                        //$(`.tbl`).css("border", "1px solid black");
                    }
                    else if (dynmodel.Border == "1") {
                        $(`.renderDynTemps`).css("border-right", "1px solid black");
                        //$(`.tbl tr`).css("border-right", "1px solid black");
                        // $(`.tbl`).css("border-right", "1px solid black");
                    }
                    else if (dynmodel.Border == "2") {
                        $(`.renderDynTemps`).css("border-left", "1px solid black");
                        //$(`.tbl tr`).css("border-left", "1px solid black");
                        //$(`.tbl`).css("border-left", "1px solid black");
                    }
                    else if (dynmodel.Border == "3") {
                        $(`.renderDynTemps`).css("border-top", "1px solid black");
                        //$(`.tbl tr`).css("border-top", "1px solid black");
                        //$(`.tbl`).css("border-top", "1px solid black");

                    }
                    else if (dynmodel.Border == "4") {
                        $(`.renderDynTemps`).css("border-bottom", "1px solid black");
                        // $(`.tbl tr`).css("border-bottom", "1px solid black");
                        //$(`.tbl`).css("border-bottom", "1px solid black");
                    }
                    for (var it = 0; it < tbllength; it++) {
                        var tblid = "table" + it;
                        for (var i = 0; i < format[tblid].length; i++) {
                            for (var j = 0; j < format[tblid][i].length; j++) {

                                var dynid = tblname + it + i + j;
                                if (format[tblid][i][j].datatype == '5') {
                                    $.each(format[tblid][i][j].options, function (i, item) {

                                        $(`#list2${dynid}`).append(`<option value="${item}">${item}
                                        
                                        </option>`);
                                    });

                                }
                                if (format[tblid][i][j].datatype == 7) {
                                    $.each(statelist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#state${dynid}`).append(`<option value="${optval}">${name}</option>`);
                                        console.log(`#state${dynid} 7`);
                                    });
                                }
                                if (format[tblid][i][j].datatype == 8) {
                                    $.each(statelist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#state${dynid}`).append(`<option value="${optval}">${name}</option>`);
                                    });
                                    console.log(`#state${dynid} 8`);
                                }
                                if (format[tblid][i][j].datatype == 9) {
                                    $.each(statelist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#state${dynid}`).append(`<option value="${optval}">${name}</option>`);
                                        console.log(`#state${dynid} 9`);
                                    });
                                }
                                if (format[tblid][i][j].datatype == 10) {
                                    $.each(agencylist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#agency${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 11) {
                                    //$.each(insurerlist, function (index, element) {
                                    //    
                                    //    var id = element.Id;
                                    //    var optval = String(id)
                                    //    var name = element.Name;
                                    //    $(`#insurer${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    //});
                                    $.each(statelist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#state${dynid}`).append(`<option value="${optval}">${name}</option>`);
                                        console.log(`#state${dynid} 9`);
                                    });
                                }
                                if (format[tblid][i][j].datatype == 14) {
                                    $.each(headlist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#head${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 15) {

                                    $.each(agencylist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Abbreviation;
                                        $(`#av${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                    $.each(yearlist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.year;
                                        $(`#year${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 16) {
                                    $.each(advocatelist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.name;
                                        $(`#advo${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 17) {
                                    $.each(departmentlist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#department${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 18) {

                                    $.each(yearlist, function (index, element) {

                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.year;
                                        $(`#year${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                stl++;

                            }
                        }
                    }


                }
            }
        });
    });
    var edv = 0;
    var edval = 0;
    $(document).on("click", "#editbtndrp", function () {

        var v = $(this).prev().val();
        var dp = $(this).next().next();
        dp.append(`<option value="${v}">${v}<option>`);
        alertify.set('notifier', 'position', 'top-right');
        alertify.success("Option Added Successfully");
        dpv++;
    });
    $(document).on("click", "#editDynTemplate", function () {

        var temparray = [];
        temparray = EditGlobal;
        $('#stage2editDyn').empty();
        $('#saveChangesDyn').css("display", "block");
        var tempname = EditTempName;
        var tbllength = Object.keys(temparray).length;
        for (var k = 0; k < tbllength; k++) {

            var table_body = `<table id="" class="table tbl">`;
            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                table_body += `<tr>`;
                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    //var vl = $(`#dyn${dynid}`).val();var colId = "row" + i + j;
                    //var widthId = "width" +k+i + j;
                    var colorId = "color" + k + i + j;
                    var bgcolorId = "bgcolor" + k + i + j;
                    var fontWeight = "weight" + k + i + j;
                    var verticalId = "verticle" + k + i + j;
                    var horizontalId = "horizontal" + k + i + j;
                    var fontFamily = "family" + k + i + j;
                    var height = "height" + k + i + j;
                    var size = "size" + k + i + j;
                    var cellborder = "cellborder" + k + i + j;
                    var fontsize = "fontsize" + k + i + j;
                    var underline = "underline" + k + i + j;
                    var fontstyle = "fontstyle" + k + i + j;
                    var staticcol = "staticcol" + k + i + j;
                    var fromtemp = "fromtemp" + k + i + j;
                    var totemp = "totemp" + k + i + j;
                    var printshow = "printshow" + k + i + j;
                    var margintop = "marginbottom" + k + i + j;
                    var marginbottom = "marginbottom" + k + i + j;
                    table_body += '<td style="min-width:350px;">';
                    table_body += ` 
                                     
<div class="row">
<div class="col-6">
<select id="${colorId}" class="form-select">
                                            <option value="select"  selected>Text Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
<div class="col-6">
<select id="${bgcolorId}" class="form-select">
                                            <option value="select"  selected>Bg-Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
</div>
<div class="row">
<div class="col-6">
<select id="${verticalId}" class="form-select">
                                            <option value="select"  selected>Verticle Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="top">Top</option>
                                            <option value="bottom">Bottom</option>
</select>
</div>
<div class="col-6">

         <select id="${horizontalId}" class="form-select">
                                            <option value="select"  selected>Horizontal Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                            <option value="justify">Justify</option>
</select>
</div>
</div>
<div class="row">
<div class="col-5">
   <select id="${fontWeight}" class="form-select">
                                            <option value="select"  selected>Font Weight</option>
                                            <option value="400">400</option>
                                            <option value="600">600</option>
                                            <option value="800">800</option>
                                            <option value="Bold">Bold</option>
</select>
</div>
<div class="col-7">

 <select id="${fontFamily}" class="form-select">
                                            <option value="select"  selected>Font Family</option>
                                            <option value="Book Antiqua">Book Antiqua</option>
                                            <option value="Arial">Arial</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Comic Sans MS">Comic Sans MS</option>
                                            <option value="Century">Century</option>
                                            <option value="Lucida Console">Lucida Console</option>
                                            <option value="kruti dev">kruti dev</option>
</select>
</div>
</div>
<div class="row">
<div class="col-6">
<input type="number" id="${size}" class="form-control" placeholder="width% only">
</div>
<div class="col-6">
<input type="number" id="${height}" class="form-control" placeholder="height in em">
</div>
</div>
<div class="row">
 <div class="col-6">
 <select id="${cellborder}" class="form-select">
                                            <option value="select"  selected>Border</option>
                                            <option value="border:1px solid black;">full border</option>
                                            <option value="border-right:1px solid black;">right-border</option>
                                            <option value="border-bottom:1px solid black;">bottom-border</option>
                                            <option value="border-left:1px solid black;">left-border</option>
                                            <option value="border-top:1px solid black;">top-border</option>
                                            <option value="border-top:1px solid black;border-bottom:1px solid black;">top bottom border</option>
                                            <option value="no-border">no border</option>
                                            
</select></div>
<div class="col-6">
       <select id="${fontstyle}" class="form-select">
                                            <option value="select"  selected>Font Style</option>
                                            <option value="normal">Normal</option>
                                            <option value="italic">Italic</option>
                                            <option value="oblique">Oblique</option>
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontsize}" class="form-select">
                                            <option value="select"  selected>Font Size</option>
                                            <option value="10">10</option>
                                            <option value="12">12</option>
                                            <option value="14">14</option>
                                            <option value="16">16</option>
                                            <option value="18">18</option>
                                            <option value="20">20</option>
                                            <option value="22">22</option>
                                            <option value="24">24</option>
                                            <option value="26">26</option>
                                            <option value="28">28</option>
                                            <option value="30">30</option>
</select>
</div>
<div class="col-6">

 <select id="${underline}" class="form-select">
                                            <option value="select"  selected>Text Decoration</option>
                                            <option value="Overline">Overline</option>
                                            <option value="UnderLine">UnderLine</option>
                                            <option value="line-through">line-through</option>
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
<input type="text" id="${fromtemp}" class="form-control" placeholder="From (name#row#col)">
</div>
<div class="col-6">
<input type="text" id="${totemp}" class="form-control" placeholder="To (name#row#col)">
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${staticcol}" class="form-select">
                                           <option value="select"  selected>Static column</option>
                                            <option value="disabled">Static</option>
                                            <option value="visible">Dynamic</option>
                                          
</select>
</div>
<div class="col-6">
   <select id="${printshow}" class="form-select">
                                            <option value="visible"selected>Print Show</option>
                                            <option value="visible">Show</option>
                                            <option value="hidden">Not Show</option>
                                           
                                           
</select>
</div
</div>
<div class="row">
<div class="col-6">
<input type="text" id="${margintop}" class="form-control" placeholder="margin top">
</div>
<div class="col-6">
<input type="text" id="${marginbottom}" class="form-control" placeholder="margin bottom">
</div>
</div>
                                `

                    table_body += '</td>';


                    //edval++;
                }
                table_body += `</tr>`;
            }
            table_body += `</table>`;
            $('#stage2editDyn').append(table_body);
        }

        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {

                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    var colorId = "color" + k + i + j;
                    var bgcolorId = "bgcolor" + k + i + j;
                    var fontWeight = "weight" + k + i + j;
                    var verticalId = "verticle" + k + i + j;
                    var horizontalId = "horizontal" + k + i + j;
                    var fontFamily = "family" + k + i + j;
                    var height = "height" + k + i + j;
                    var size = "size" + k + i + j;
                    var cellborder = "cellborder" + k + i + j;
                    var fontsize = "fontsize" + k + i + j;
                    var underline = "underline" + k + i + j;
                    var fontstyle = "fontstyle" + k + i + j;
                    var staticcol = "staticcol" + k + i + j;
                    var fromtemp = "fromtemp" + k + i + j;
                    var totemp = "totemp" + k + i + j;
                    var printshow = "printshow" + k + i + j;
                    var margintop = "marginbottom" + k + i + j;
                    var marginbottom = "marginbottom" + k + i + j;
                    //$(`#${colorId} option:contains(${EditGlobal[tblid][i][j].color})`).prop('selected', true);
                    if (EditGlobal[tblid][i][j].color != "undefine" && EditGlobal[tblid][i][j].color != null && EditGlobal[tblid][i][j].color != "")
                        $(`#${colorId}`).val(EditGlobal[tblid][i][j].color).prop('selected', true);
                    if (EditGlobal[tblid][i][j].backgroundcolor != "undefine" && EditGlobal[tblid][i][j].backgroundcolor != null && EditGlobal[tblid][i][j].backgroundcolor != "")
                        $(`#${bgcolorId}`).val(EditGlobal[tblid][i][j].backgroundcolor).prop('selected', true);
                    if (EditGlobal[tblid][i][j].fontweight != "undefine" && EditGlobal[tblid][i][j].fontweight != null && EditGlobal[tblid][i][j].fontweight != "")
                        $(`#${fontWeight}`).val(EditGlobal[tblid][i][j].fontweight).prop('selected', true);
                    if (EditGlobal[tblid][i][j].verticalalign != "undefine" && EditGlobal[tblid][i][j].verticalalign != null && EditGlobal[tblid][i][j].verticalalign != "")
                        $(`#${verticalId}`).val(EditGlobal[tblid][i][j].verticalalign).prop('selected', true);
                    if (EditGlobal[tblid][i][j].textalign != "undefine" && EditGlobal[tblid][i][j].textalign != null && EditGlobal[tblid][i][j].textalign != "")
                        $(`#${horizontalId}`).val(EditGlobal[tblid][i][j].textalign).prop('selected', true);
                    if (EditGlobal[tblid][i][j].fontfamily != "undefine" && EditGlobal[tblid][i][j].fontfamily != null && EditGlobal[tblid][i][j].fontfamily != "")
                        $(`#${fontFamily}`).val(EditGlobal[tblid][i][j].fontfamily).prop('selected', true);
                    if (EditGlobal[tblid][i][j].height != "undefine" && EditGlobal[tblid][i][j].height != null && EditGlobal[tblid][i][j].height != "")
                        $(`#${height}`).val(EditGlobal[tblid][i][j].height);
                    if (EditGlobal[tblid][i][j].width != "undefine" && EditGlobal[tblid][i][j].width != null && EditGlobal[tblid][i][j].width != "")
                        $(`#${size}`).val(EditGlobal[tblid][i][j].width);
                    if (EditGlobal[tblid][i][j].cellborder != "undefine" && EditGlobal[tblid][i][j].cellborder != null && EditGlobal[tblid][i][j].cellborder != "")
                        $(`#${cellborder}`).val(EditGlobal[tblid][i][j].cellborder);
                    if (EditGlobal[tblid][i][j].fontsize != "undefine" && EditGlobal[tblid][i][j].fontsize != null && EditGlobal[tblid][i][j].fontsize != "")
                        $(`#${fontsize}`).val(EditGlobal[tblid][i][j].fontsize);
                    if (EditGlobal[tblid][i][j].underline != "undefine" && EditGlobal[tblid][i][j].underline != null && EditGlobal[tblid][i][j].underline != "")
                        $(`#${underline}`).val(EditGlobal[tblid][i][j].underline);
                    if (EditGlobal[tblid][i][j].fontstyle != "undefine" && EditGlobal[tblid][i][j].fontstyle != null && EditGlobal[tblid][i][j].fontstyle != "")
                        $(`#${fontstyle}`).val(EditGlobal[tblid][i][j].fontstyle);
                    if (EditGlobal[tblid][i][j].staticcol != "undefine" && EditGlobal[tblid][i][j].staticcol != null && EditGlobal[tblid][i][j].staticcol != "")
                        $(`#${staticcol}`).val(EditGlobal[tblid][i][j].staticcol);
                    if (EditGlobal[tblid][i][j].fromtemp != "undefine" && EditGlobal[tblid][i][j].fromtemp != null && EditGlobal[tblid][i][j].fromtemp != "")
                        $(`#${fromtemp}`).val(EditGlobal[tblid][i][j].fromtemp);
                    if (EditGlobal[tblid][i][j].totemp != "undefine" && EditGlobal[tblid][i][j].totemp != null && EditGlobal[tblid][i][j].totemp != "")
                        $(`#${totemp}`).val(EditGlobal[tblid][i][j].totemp);
                    if (EditGlobal[tblid][i][j].printshow != "undefine" && EditGlobal[tblid][i][j].printshow != null && EditGlobal[tblid][i][j].printshow != "")
                        $(`#${printshow}`).val(EditGlobal[tblid][i][j].printshow);
                    if (EditGlobal[tblid][i][j].margintop != "undefine" && EditGlobal[tblid][i][j].margintop != null && EditGlobal[tblid][i][j].margintop != "")
                        $(`#${margintop}`).val(EditGlobal[tblid][i][j].margintop);
                    if (EditGlobal[tblid][i][j].marginbottom != "undefine" && EditGlobal[tblid][i][j].marginbottom != null && EditGlobal[tblid][i][j].marginbottom != "")
                        $(`#${marginbottom}`).val(EditGlobal[tblid][i][j].marginbottom);
                    //edval++;
                }

            }

        }
    });
    $(document).on("click", "#saveChangesDyn", function () {

        var tbllength = Object.keys(EditGlobal).length;
        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    var colorId = "color" + k + i + j;
                    var bgcolorId = "bgcolor" + k + i + j;
                    var fontWeight = "weight" + k + i + j;
                    var verticalId = "verticle" + k + i + j;
                    var horizontalId = "horizontal" + k + i + j;
                    var fontFamily = "family" + k + i + j;
                    var height = "height" + k + i + j;
                    var size = "size" + k + i + j;
                    var cellborder = "cellborder" + k + i + j;
                    var fontsize = "fontsize" + k + i + j;
                    var underline = "underline" + k + i + j;
                    var fontstyle = "fontstyle" + k + i + j;
                    var staticcol = "staticcol" + k + i + j;
                    var fromtemp = "fromtemp" + k + i + j;
                    var totemp = "totemp" + k + i + j;
                    var printshow = "printshow" + k + i + j;
                    var margintop = "marginbottom" + k + i + j;
                    var marginbottom = "marginbottom" + k + i + j;
                    if ($(`#${bgcolorId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].backgroundcolor = $(`#${bgcolorId}`).val();
                    if ($(`#${colorId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].color = $(`#${colorId}`).val();
                    if ($(`#${fontFamily}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontfamily = $(`#${fontFamily}`).val();
                    if ($(`#${fontWeight}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontweight = $(`#${fontWeight}`).val();
                    if ($(`#${horizontalId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].textalign = $(`#${horizontalId}`).val();
                    if ($(`#${verticalId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].verticalalign = $(`#${verticalId}`).val();
                    if ($(`#${height}`).val() != "undefine")
                        EditGlobal[tblid][i][j].height = $(`#${height}`).val();
                    if ($(`#${size}`).val() != "undefine")
                        EditGlobal[tblid][i][j].width = $(`#${size}`).val();
                    if ($(`#${cellborder}`).val() != "undefine")
                        EditGlobal[tblid][i][j].cellborder = $(`#${cellborder}`).val();
                    if ($(`#${fontsize}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontsize = $(`#${fontsize}`).val();
                    if ($(`#${underline}`).val() != "undefine")
                        EditGlobal[tblid][i][j].underline = $(`#${underline}`).val();
                    if ($(`#${fontstyle}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontstyle = $(`#${fontstyle}`).val();
                    if ($(`#${staticcol}`).val() != "undefine")
                        EditGlobal[tblid][i][j].staticcol = $(`#${staticcol}`).val();
                    if ($(`#${fromtemp}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fromtemp = $(`#${fromtemp}`).val();
                    if ($(`#${totemp}`).val() != "undefine")
                        EditGlobal[tblid][i][j].totemp = $(`#${totemp}`).val();
                    if ($(`#${printshow}`).val() != "undefine")
                        EditGlobal[tblid][i][j].printshow = $(`#${printshow}`).val();
                    if ($(`#${margintop}`).val() != "undefine")
                        EditGlobal[tblid][i][j].margintop = $(`#${margintop}`).val();
                    if ($(`#${marginbottom}`).val() != "undefine")
                        EditGlobal[tblid][i][j].marginbottom = $(`#${marginbottom}`).val();
                    edval++;
                }
            }
        }
        console.log(EditGlobal);
        swal("Changes saved successfully", {
            icon: "success",
        });
    });

    $(document).on("click", "#clearDynTemplates", function () {

        $('.renderDynTemps').empty();
        $('#stage2editDyn').empty();
        EditGlobal = [];
        dynmodel = {};
    });
    $(document).on("click", "#deleteDynTemplates", function () {

        var name = $("#dynamicTableId").find(':selected').text();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteDynTemplate',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.editDynTempdrop').load("#dynamicTableId");
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#addrows", function () {
        $('#addRow').removeAttr('hidden');
    });
    $(document).on("click", "#EditTable", function () {
        ;
        var nr = $("#Editrows").val();
        createTable1(nr);
        $("#createtable").hide();
        $("#edittable").show();
    });

    $(document).on("click", "#edittable", function () {
        ;
        cols = [];

        $('#Edit-table-datatype').empty();
        var table_body = '<table border="1" class="table">';
        table_body = createtable2(table_body);
        table_body += '</table>';
        $('#Edit-table-datatype').html(table_body);
        $('#EditfinishBtn').removeAttr('hidden');
        $('#exampleModal').modal("hide");
    });
    $(document).on("click", "#EditfinishBtn", async function () {

        var table_body = await finishtable();
        $('#Edit-table-content').append(table_body);
    });
    $(document).on("click", "#updateDynTemplates", function () {

        var name = EditTempName;
        var tbllength = Object.keys(golabltbldata).length;
        var edittbllength = Object.keys(EditGlobal).length;
        if (tbllength > 0) {
            for (var k = 0; k < tbllength; k++) {
                var tblid = "table" + k;
                for (var i = 0; i < golabltbldata[tblid].length; i++) {
                    for (var j = 0; j < golabltbldata[tblid][i].length; j++) {
                        var vl = $(`#inp${val}`).val();
                        golabltbldata[tblid][i][j].value = vl;

                        if (golabltbldata[tblid][i][j].datatype == 5) {
                            var optn = [];
                            //var dt = 
                            $(`#list${val} option`).each(function () {
                                var vt = $(this).val();
                                if (vt != "") {
                                    optn.push(vt);
                                }

                            });
                            golabltbldata[tblid][i][j]["options"] = optn;
                        }
                        if (golabltbldata[tblid][i][j].datatype == 7) {
                            $.each(stateopt.model, function (index, element) {

                                var id = element.id;
                                var name = element.name;
                                $(`#state${val}`).append(`<option value="${id}">${name}</option>`);
                            });
                        }
                        if (golabltbldata[tblid][i][j].datatype == 8) {
                            $.each(stateopt.model, function (index, element) {

                                var id = element.id;
                                var name = element.name;
                                $(`#state${val}`).append(`<option value="${id}">${name}</option>`);
                            });
                        }
                        if (golabltbldata[tblid][i][j].datatype == 9) {
                            $.each(stateopt.model, function (index, element) {

                                var id = element.id;
                                var name = element.name;
                                $(`#state${val}`).append(`<option value="${id}">${name}</option>`);
                            });
                        }
                        val++;
                    }
                }
            }
            for (var i = 0; i < tbllength; i++) {
                var tbllength2 = Object.keys(EditGlobal).length;
                var tblid = "table" + tbllength2;
                var tb = "table" + i;
                var tbl = golabltbldata[tb];
                //var dyn = {};
                EditGlobal[tblid] = tbl;
            }
        }

        //var tbllength = Object.keys(EditGlobal).length;
        for (var k = 0; k < edittbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    if (EditGlobal[tblid][i][j].datatype != 5 && EditGlobal[tblid][i][j].datatype != 6 && EditGlobal[tblid][i][j].datatype != 7 && EditGlobal[tblid][i][j].datatype != 8) {
                        var vl = $(`#dyn${dynid}`).val();
                        if (typeof vl != "undefine")
                            EditGlobal[tblid][i][j].value = vl;
                    }

                    if (EditGlobal[tblid][i][j].datatype == 5) {
                        var optn = [];
                        var vl = $(`#dyn${dynid}`).val();
                        //var dt = 
                        $(`#list2${dynid} option`).each(function () {
                            var vt = $(this).val();
                            if (vt != "") {
                                optn.push(vt);
                            }

                        });
                        EditGlobal[tblid][i][j]["options"] = optn;
                        if (typeof vl == "undefine") vl = "Select";
                        EditGlobal[tblid][i][j].value = vl;
                    }
                    //edval++;
                }
            }
        }
        console.log(EditGlobal);
        var format = JSON.stringify(EditGlobal);
        var border = $('#dynEditborder option:selected').val();
        var displaytbl = $('#dynEditdisplay option:selected').val();
        var obj = {};
        obj = dynmodel;
        obj.TableFormat = format;
        obj.Border = border;
        obj.Display = displaytbl;

        $.ajax({
            type: "post",
            url: '/Admin/UpdateDynamicTemplate',
            dataType: "json",
            data: { obj },
            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });

    $(document).on("click", ".deletedynrow", function () {

        //$(this).parents().remove();
        var item = $(this).parents("tr");
        var rowno = item.attr("rowno");
        item.remove();
        console.log(EditGlobal);
        var tbllength = Object.keys(EditGlobal).length;
        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                var r = "" + k + i;
                if (r == rowno) {

                    EditGlobal[tblid].splice(i, 1);

                }
            }
        }
        console.log(EditGlobal);

    });
    $(document).on("click", "#deloption", function () {

        var v = $(this).prev().prev().val();
        var dp = $(this).next();
        $(dp[0].options).each(function () {

            var x = $(this).val();
            if (x == v) $(this).remove();
            //var x2 = $(this);

        });
        alertify.set('notifier', 'position', 'top-right');
        alertify.success("Option deleted Successfully");
    });

    //Calculation Templates

    $(document).on("change", "#calctblId", function () {
        var name = $(this).find(':selected').text();
        EditGlobal = [];
        dynmodel = {};
        operations = {};
        $(".renderCalTemps").empty();
        $.ajax({
            type: "post",
            url: '/Reports/RenderCalcTable',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {

                if (result.model != null) {
                    var format = JSON.parse(result.model.calcFormat);
                    EditGlobal = format;
                    dynmodel.Id = result.model.Id;
                    dynmodel.CalcName = result.model.calcName;
                    dynmodel.CalcId = result.model.calcId;
                    dynmodel.Created_Date = result.model.created_Date;
                    dynmodel.IsDeleted = result.model.isDeleted;
                    dynmodel.Border = result.model.border;
                    operations = JSON.parse(result.model.operations);
                    console.log(format);
                    //data = format;
                    EditTempName = result.model.calcName;
                    $(`#calcEditborder`).val(result.model.border).prop("selected", true);
                    $(`#calcEditbill`).val(result.model.billType).prop("selected", true);
                    var tblname = result.model.calcName.replace(/[^\w\s]/gi, '');
                    tblname = tblname.split(" ").join("");
                    calcEditName = tblname;
                    EditTempName = tblname;
                    var table_body = `<table id="" class="table tbl">`;
                    var no_rows = format.length;
                    var no_cols = [];
                    var tbllength = Object.keys(format).length;
                    var tblNo = (tbllength - 1)
                    var row_no = "" + tblNo + (format["table" + tblNo].length - 1);
                    console.log(row_no);
                    for (var it = 0; it < tbllength; it++) {
                        var tblid = "table" + it;
                        var table_body = `<table id="" class="table tbl" style="border-collapse:collapse; margin-bottom:0;">`;
                        for (var i = 0; i < format[tblid].length; i++) {

                            var rowcount = "" + it + i;
                            table_body += `<tr rowno="${rowcount}">`;
                            for (var j = 0; j < format[tblid][i].length; j++) {
                                no_cols.push(format[tblid][i].length);
                                var calid = tblname + it + i + j;
                                if (format[tblid][i][j].height == "null" || format[tblid][i][j].height == "" || format[tblid][i][j].height == "undefined" || typeof format[tblid][i][j].height == "undefined") format[tblid][i][j].height = 2;
                                if (format[tblid][i][j].datatype == '0') {
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="text" id="calc${calid}" rowNo="${i}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' value="${format[tblid][i][j].value}" class="form-control"> `;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '1') {
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea class="form-control" id="calc${calid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em !important;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '2') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="date" id="calc${calid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '3') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="checkbox" id="calc${calid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-check"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '4') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="number" id="calc${calid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    if (row_no == rowcount) {
                                        table_body += `<input type="checkbox" class="checksum">`
                                    }
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '5') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea type="text" id="calc${calid}" colNo="${j}" list="list2${calid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control">${format[tblid][i][j].value}</textarea>
                                                   <a type="" class="" href="javascript:void(0);" style="color:blue;cursor:pointer;" id="editCalcbtndrp">+</a>
                                                   <a type="" class="" href="javascript:void(0);" style="color:red;cursor:pointer;" id="delCalcoption">+</a>
                                               <select id="list2${calid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' class="form-control selectTeaxtarea">
                                        </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '6') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="file" id="calc${calid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '7') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="text" name="currency-field"  pattern="^₹\s?(\d{1,3}(,\d{2,3})*(\.\d{2})?|\d{1,})(,\d{2})?$"  data-type="currency" placeholder="₹ 10,00,000.00"  id="calc${calid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control currencyField"> `;
                                    if (row_no == rowcount) {
                                        table_body += `<input type="checkbox" class="checksum">`
                                    }
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == 8) {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="text" id="calc${dynid}" list="con${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control">
                                               <datalist id="con${dynid}">
                                        </datalist>`;
                                    table_body += '</td>';
                                }

                            }
                            table_body += '<td><a href="javascript:void(0)" class="deletecalcrow">X</a></td>'
                            table_body += '</tr>';

                        }
                        table_body += '</table>';
                        $(`.renderCalTemps`).append(table_body);
                    }
                    if (dynmodel.Border == "0") {
                        $(`.renderCalTemps`).css("border", "1px solid black");
                        //$(`.tbl tr`).css("border", "1px solid black");
                        //$(`.tbl`).css("border", "1px solid black");
                    }
                    else if (dynmodel.Border == "1") {
                        $(`.renderCalTemps`).css("border-right", "1px solid black");
                        //$(`.tbl tr`).css("border-right", "1px solid black");
                        //$(`.tbl`).css("border-right", "1px solid black");
                    }
                    else if (dynmodel.Border == "2") {
                        $(`.renderCalTemps`).css("border-left", "1px solid black");
                        //$(`.tbl tr`).css("border-left", "1px solid black");
                        //$(`.tbl`).css("border-left", "1px solid black");
                    }
                    else if (dynmodel.Border == "3") {
                        $(`.renderCalTemps`).css("border-top", "1px solid black");
                        //$(`.tbl tr`).css("border-top", "1px solid black");
                        //$(`.tbl`).css("border-top", "1px solid black");

                    }
                    else if (dynmodel.Border == "4") {
                        $(`.renderCalTemps`).css("border-bottom", "1px solid black");
                        // $(`.tbl tr`).css("border-bottom", "1px solid black");
                        //$(`.tbl`).css("border-bottom", "1px solid black");
                    }

                    for (var it = 0; it < tbllength; it++) {
                        var tblid = "table" + it;
                        for (var i = 0; i < format[tblid].length; i++) {
                            for (var j = 0; j < format[tblid][i].length; j++) {

                                var dynid = tblname + it + i + j;
                                if (format[tblid][i][j].datatype == '5') {
                                    $.each(format[tblid][i][j].options, function (i, item) {

                                        $(`#list2${dynid}`).append(`<option value="${item}"></option>`);
                                    });
                                }
                                stl++;

                            }
                        }
                    }


                    if (typeof operations["addition"] != "undefined" && operations["addition"].length > 0) {
                        var s = "";
                        for (var i = 0; i < operations["addition"].length; i++) {
                            s = s + operations["addition"][i] + ",";
                        }
                        $('#addition').val(s);
                    }
                    if (typeof operations["multiplication"] != "undefined" && operations["multiplication"].length > 0) {
                        var s = "";
                        for (var i = 0; i < operations["multiplication"].length; i++) {
                            s = s + operations["multiplication"][i] + ",";
                        }
                        $('#addition').val(s);
                    }
                    if (typeof operations["addition"] != "undefined" && operations["addition"].length > 0) {
                        var s = "";
                        for (var i = 0; i < operations["addition"].length; i++) {
                            s = s + operations["addition"][i] + ",";
                        }
                        $('#multiplication').val(s);
                    }
                    if (typeof operations["subtraction"] != "undefined" && operations["subtraction"].length > 0) {
                        var s = "";
                        for (var i = 0; i < operations["subtraction"].length; i++) {
                            s = s + operations["subtraction"][i] + ",";
                        }
                        $('#subtraction').val(s);
                    }
                    if (typeof operations["dividion"] != "undefined" && operations["dividion"].length > 0) {
                        var s = "";
                        for (var i = 0; i < operations["dividion"].length; i++) {
                            s = s + operations["dividion"][i] + ",";
                        }
                        $('#dividion').val(s);
                    }
                    if (typeof operations["percentage"] != "undefined" && operations["percentage"].length > 0) {
                        var s = "";
                        for (var i = 0; i < operations["percentage"].length; i++) {
                            s = s + operations["percentage"][i] + ",";
                        }
                        $('#percentage').val(s);
                    }
                    if (typeof operations["singleaddition"] != "undefined" && operations["singleaddition"].length > 0) {
                        var s = "";
                        for (var i = 0; i < operations["singleaddition"].length; i++) {
                            s = s + operations["singleaddition"][i] + ",";
                        }
                        $('#singleAddition').val(s);
                    }

                }

            }
        });
    });
    $(document).on("click", "#editCalcbtndrp", function () {

        var v = $(this).prev().val();
        var dp = $(this).next().next();
        dp.append(`<option value="${v}">${v}<option>`);
        dpv++;
        alertify.set('notifier', 'position', 'top-right');
        alertify.success("Option Added Successfully");
    });
    $(document).on("click", "#editCalTemplate", function () {

        var temparray = [];
        temparray = EditGlobal;
        $('.stage2editCalc').empty();
        $('#saveChangesCal').css("display", "block");
        var tempname = EditTempName;
        var tbllength = Object.keys(temparray).length;
        for (var k = 0; k < tbllength; k++) {

            var table_body = `<table id="" class="table tbl">`;
            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                table_body += `<tr>`;
                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    //var vl = $(`#dyn${dynid}`).val();var colId = "row" + i + j;
                    //var widthId = "width" +k+i + j;
                    var colorId = "color" + k + i + j;
                    var bgcolorId = "bgcolor" + k + i + j;
                    var fontWeight = "weight" + k + i + j;
                    var verticalId = "verticle" + k + i + j;
                    var horizontalId = "horizontal" + k + i + j;
                    var fontFamily = "family" + k + i + j;
                    var height = "height" + k + i + j;
                    var size = "size" + k + i + j;
                    var cellborder = "cellborder" + k + i + j;
                    var fontsize = "fontsize" + k + i + j;
                    var underline = "underline" + k + i + j;
                    var fontstyle = "fontstyle" + k + i + j;
                    var staticcol = "staticcol" + k + i + j;
                    var fromtemp = "fromtemp" + k + i + j;
                    var totemp = "totemp" + k + i + j;
                    var printshow = "printshow" + k + i + j;
                    var margintop = "marginbottom" + k + i + j;
                    var marginbottom = "marginbottom" + k + i + j;
                    table_body += '<td style="min-width:350px;">';
                    table_body += ` 
                                     
<div class="row">
<div class="col-6">
<select id="${colorId}" class="form-select">
                                            <option value="select"  selected>Text Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
<div class="col-6">
<select id="${bgcolorId}" class="form-select">
                                            <option value="select"  selected>Bg-Color</option>
                                            <option value="Red" style="background-color:red">Red</option>
                                            <option value="Blue" style="background-color:blue">Blue</option>
                                            <option value="Green" style="background-color:green">Green</option>
                                            <option value="Aqua" style="background-color:aqua">Aqua</option>
                                            <option value="Yellow" style="background-color:yellow">Yellow</option>
                                            <option value="Brown" style="background-color:brown">Brown</option>
                                            <option value="Black" style="background-color:black">Black</option>
                                            <option value="darkmagenta" style="background-color:darkmagenta">DarkMagenta</option>
                                            <option value="deafult" style="background-color:deafult">Deafult</option>
                                            <option value="skyblue" style="background-color:skyblue">SkyBlue</option>
                                            <option value="darkgoldenrod" style="background-color:darkgoldenrod">DarkGoldenRod</option>
                                            <option value="cadetblue" style="background-color:cadetblue">CadetBlue</option>
 </select>
</div>
</div>
<div class="row">
<div class="col-6">
<select id="${verticalId}" class="form-select">
                                            <option value="select"  selected>Verticle Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="top">Top</option>
                                            <option value="bottom">Bottom</option>
</select>
</div>
<div class="col-6">

         <select id="${horizontalId}" class="form-select">
                                            <option value="select"  selected>Horizontal Alignment</option>
                                            <option value="center">Center</option>
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                            <option value="justify">Justify</option>
</select>
</div>
</div>
<div class="row">
<div class="col-5">
   <select id="${fontWeight}" class="form-select">
                                            <option value="select"  selected>Font Weight</option>
                                            <option value="400">400</option>
                                            <option value="600">600</option>
                                            <option value="800">800</option>
                                            <option value="Bold">Bold</option>
</select>
</div>
<div class="col-7">

 <select id="${fontFamily}" class="form-select">
                                            <option value="select"  selected>Font Family</option>
                                            <option value="Book Antiqua">Book Antiqua</option>
                                            <option value="Arial">Arial</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Comic Sans MS">Comic Sans MS</option>
                                            <option value="Century">Century</option>
                                            <option value="Lucida Console">Lucida Console</option>
                                            <option value="kruti dev">kruti dev</option>
</select>
</div>
</div>
<div class="row">
<div class="col-6">
<input type="number" id="${size}" class="form-control" placeholder="width% only">
</div>
<div class="col-6">
<input type="number" id="${height}" class="form-control" placeholder="height in em">
</div>
</div>
<div class="row">
 <div class="col-6">
 <select id="${cellborder}" class="form-select">
                                            <option value="select"  selected>Border</option>
                                            <option value="border:1px solid black;">full border</option>
                                            <option value="border-right:1px solid black;">right-border</option>
                                            <option value="border-bottom:1px solid black;">bottom-border</option>
                                            <option value="border-left:1px solid black;">left-border</option>
                                            <option value="border-top:1px solid black;">top-border</option>
                                            <option value="border-top:1px solid black;border-bottom:1px solid black;">top bottom border</option>
                                            <option value="no-border">no border</option>
                                            
</select></div>
<div class="col-6">
       <select id="${fontstyle}" class="form-select">
                                            <option value="select"  selected>Font Style</option>
                                            <option value="normal">Normal</option>
                                            <option value="italic">Italic</option>
                                            <option value="oblique">Oblique</option>
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${fontsize}" class="form-select">
                                            <option value="select"  selected>Font Size</option>
                                            <option value="10">10</option>
                                            <option value="12">12</option>
                                            <option value="14">14</option>
                                            <option value="16">16</option>
                                            <option value="18">18</option>
                                            <option value="20">20</option>
                                            <option value="22">22</option>
                                            <option value="24">24</option>
                                            <option value="26">26</option>
                                            <option value="28">28</option>
                                            <option value="30">30</option>
</select>
</div>
<div class="col-6">

 <select id="${underline}" class="form-select">
                                            <option value="select"  selected>Text Decoration</option>
                                            <option value="Overline">Overline</option>
                                            <option value="UnderLine">UnderLine</option>
                                            <option value="line-through">line-through</option>
                                           
</select>
</div>
</div>
<div class="row">
<div class="col-6">
<input type="text" id="${fromtemp}" class="form-control" placeholder="From (name#row#col)">
</div>
<div class="col-6">
<input type="text" id="${totemp}" class="form-control" placeholder="To (name#row#col)">
</div>
</div>
<div class="row">
<div class="col-6">
   <select id="${staticcol}" class="form-select">
                                            <option value="select"  selected>Static column</option>
                                            <option value="disabled">Static</option>
                                            <option value="visible">Dynamic</option>
                                            
                                           
</select>
</div>
<div class="col-6">
   <select id="${printshow}" class="form-select">
                                            <option value="visible"selected>Print Show</option>
                                            <option value="visible">Show</option>
                                            <option value="hidden">Not Show</option>
                                           
                                           
</select>
</div
</div>
<div class="row">
<div class="col-6">
<input type="text" id="${margintop}" class="form-control" placeholder="margin top">
</div>
<div class="col-6">
<input type="text" id="${marginbottom}" class="form-control" placeholder="margin bottom">
</div>
</div>
                                `

                    table_body += '</td>';


                    //edval++;
                }
                table_body += `</tr>`;
            }
            table_body += `</table>`;
            $('#stage2editCal').append(table_body);
        }

        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {

                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    var colorId = "color" + k + i + j;
                    var bgcolorId = "bgcolor" + k + i + j;
                    var fontWeight = "weight" + k + i + j;
                    var verticalId = "verticle" + k + i + j;
                    var horizontalId = "horizontal" + k + i + j;
                    var fontFamily = "family" + k + i + j;
                    var height = "height" + k + i + j;
                    var size = "size" + k + i + j;
                    var cellborder = "cellborder" + k + i + j;
                    var fontsize = "fontsize" + k + i + j;
                    var underline = "underline" + k + i + j;
                    var fontstyle = "fontstyle" + k + i + j;
                    var staticcol = "staticcol" + k + i + j;
                    var fromtemp = "fromtemp" + k + i + j;
                    var totemp = "totemp" + k + i + j;
                    var printshow = "printshow" + k + i + j;
                    var margintop = "marginbottom" + k + i + j;
                    var marginbottom = "marginbottom" + k + i + j;
                    //$(`#${colorId} option:contains(${EditGlobal[tblid][i][j].color})`).prop('selected', true);
                    if (EditGlobal[tblid][i][j].color != "undefine" && EditGlobal[tblid][i][j].color != null && EditGlobal[tblid][i][j].color != "")
                        $(`#${colorId}`).val(EditGlobal[tblid][i][j].color).prop('selected', true);
                    if (EditGlobal[tblid][i][j].backgroundcolor != "undefine" && EditGlobal[tblid][i][j].backgroundcolor != null && EditGlobal[tblid][i][j].backgroundcolor != "")
                        $(`#${bgcolorId}`).val(EditGlobal[tblid][i][j].backgroundcolor).prop('selected', true);
                    if (EditGlobal[tblid][i][j].fontweight != "undefine" && EditGlobal[tblid][i][j].fontweight != null && EditGlobal[tblid][i][j].fontweight != "")
                        $(`#${fontWeight}`).val(EditGlobal[tblid][i][j].fontweight).prop('selected', true);
                    if (EditGlobal[tblid][i][j].verticalalign != "undefine" && EditGlobal[tblid][i][j].verticalalign != null && EditGlobal[tblid][i][j].verticalalign != "")
                        $(`#${verticalId}`).val(EditGlobal[tblid][i][j].verticalalign).prop('selected', true);
                    if (EditGlobal[tblid][i][j].textalign != "undefine" && EditGlobal[tblid][i][j].textalign != null && EditGlobal[tblid][i][j].textalign != "")
                        $(`#${horizontalId}`).val(EditGlobal[tblid][i][j].textalign).prop('selected', true);
                    if (EditGlobal[tblid][i][j].fontfamily != "undefine" && EditGlobal[tblid][i][j].fontfamily != null && EditGlobal[tblid][i][j].fontfamily != "")
                        $(`#${fontFamily}`).val(EditGlobal[tblid][i][j].fontfamily).prop('selected', true);
                    if (EditGlobal[tblid][i][j].height != "undefine" && EditGlobal[tblid][i][j].height != null && EditGlobal[tblid][i][j].height != "")
                        $(`#${height}`).val(EditGlobal[tblid][i][j].height);
                    if (EditGlobal[tblid][i][j].width != "undefine" && EditGlobal[tblid][i][j].width != null && EditGlobal[tblid][i][j].width != "")
                        $(`#${size}`).val(EditGlobal[tblid][i][j].width);
                    if (EditGlobal[tblid][i][j].cellborder != "undefine" && EditGlobal[tblid][i][j].cellborder != null && EditGlobal[tblid][i][j].cellborder != "")
                        $(`#${cellborder}`).val(EditGlobal[tblid][i][j].cellborder);
                    if (EditGlobal[tblid][i][j].fontsize != "undefine" && EditGlobal[tblid][i][j].fontsize != null && EditGlobal[tblid][i][j].fontsize != "")
                        $(`#${fontsize}`).val(EditGlobal[tblid][i][j].fontsize);
                    if (EditGlobal[tblid][i][j].underline != "undefine" && EditGlobal[tblid][i][j].underline != null && EditGlobal[tblid][i][j].underline != "")
                        $(`#${underline}`).val(EditGlobal[tblid][i][j].underline);
                    if (EditGlobal[tblid][i][j].fontstyle != "undefine" && EditGlobal[tblid][i][j].fontstyle != null && EditGlobal[tblid][i][j].fontstyle != "")
                        $(`#${fontstyle}`).val(EditGlobal[tblid][i][j].fontstyle);
                    if (EditGlobal[tblid][i][j].staticcol != "undefine" && EditGlobal[tblid][i][j].staticcol != null && EditGlobal[tblid][i][j].staticcol != "")
                        $(`#${staticcol}`).val(EditGlobal[tblid][i][j].staticcol);
                    if (EditGlobal[tblid][i][j].printshow != "undefine" && EditGlobal[tblid][i][j].printshow != null && EditGlobal[tblid][i][j].printshow != "")
                        $(`#${printshow}`).val(EditGlobal[tblid][i][j].printshow);
                    if (EditGlobal[tblid][i][j].fromtemp != "undefine" && EditGlobal[tblid][i][j].fromtemp != null && EditGlobal[tblid][i][j].fromtemp != "")
                        $(`#${fromtemp}`).val(EditGlobal[tblid][i][j].fromtemp);
                    if (EditGlobal[tblid][i][j].totemp != "undefine" && EditGlobal[tblid][i][j].totemp != null && EditGlobal[tblid][i][j].totemp != "")
                        $(`#${totemp}`).val(EditGlobal[tblid][i][j].totemp);
                    if (EditGlobal[tblid][i][j].margintop != "undefine" && EditGlobal[tblid][i][j].margintop != null && EditGlobal[tblid][i][j].margintop != "")
                        $(`#${margintop}`).val(EditGlobal[tblid][i][j].margintop);
                    if (EditGlobal[tblid][i][j].marginbottom != "undefine" && EditGlobal[tblid][i][j].marginbottom != null && EditGlobal[tblid][i][j].marginbottom != "")
                        $(`#${marginbottom}`).val(EditGlobal[tblid][i][j].marginbottom);
                    //edval++;
                }

            }

        }
        //}

    });
    $(document).on("click", "#saveChangesCal", function () {

        var tbllength = Object.keys(EditGlobal).length;
        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    var colorId = "color" + k + i + j;
                    var bgcolorId = "bgcolor" + k + i + j;
                    var fontWeight = "weight" + k + i + j;
                    var verticalId = "verticle" + k + i + j;
                    var horizontalId = "horizontal" + k + i + j;
                    var fontFamily = "family" + k + i + j;
                    var height = "height" + k + i + j;
                    var size = "size" + k + i + j;
                    var cellborder = "cellborder" + k + i + j;
                    var fontsize = "fontsize" + k + i + j;
                    var underline = "underline" + k + i + j;
                    var fontstyle = "fontstyle" + k + i + j;
                    var staticcol = "staticcol" + k + i + j;
                    var fromtemp = "fromtemp" + k + i + j;
                    var totemp = "totemp" + k + i + j;
                    var printshow = "printshow" + k + i + j;
                    var margintop = "marginbottom" + k + i + j;
                    var marginbottom = "marginbottom" + k + i + j;
                    if ($(`#${bgcolorId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].backgroundcolor = $(`#${bgcolorId}`).val();
                    if ($(`#${colorId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].color = $(`#${colorId}`).val();
                    if ($(`#${fontFamily}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontfamily = $(`#${fontFamily}`).val();
                    if ($(`#${fontWeight}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontweight = $(`#${fontWeight}`).val();
                    if ($(`#${horizontalId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].textalign = $(`#${horizontalId}`).val();
                    if ($(`#${verticalId}`).val() != "undefine")
                        EditGlobal[tblid][i][j].verticalalign = $(`#${verticalId}`).val();
                    if ($(`#${height}`).val() != "undefine")
                        EditGlobal[tblid][i][j].height = $(`#${height}`).val();
                    if ($(`#${size}`).val() != "undefine")
                        EditGlobal[tblid][i][j].width = $(`#${size}`).val();
                    if ($(`#${cellborder}`).val() != "undefine")
                        EditGlobal[tblid][i][j].cellborder = $(`#${cellborder}`).val();
                    if ($(`#${fontsize}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontsize = $(`#${fontsize}`).val();
                    if ($(`#${underline}`).val() != "undefine")
                        EditGlobal[tblid][i][j].underline = $(`#${underline}`).val();
                    if ($(`#${fontstyle}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fontstyle = $(`#${fontstyle}`).val();
                    if ($(`#${staticcol}`).val() != "undefine")
                        EditGlobal[tblid][i][j].staticcol = $(`#${staticcol}`).val();
                    if ($(`#${printshow}`).val() != "undefine")
                        EditGlobal[tblid][i][j].printshow = $(`#${printshow}`).val();
                    if ($(`#${fromtemp}`).val() != "undefine")
                        EditGlobal[tblid][i][j].fromtemp = $(`#${fromtemp}`).val();
                    if ($(`#${totemp}`).val() != "undefine")
                        EditGlobal[tblid][i][j].totemp = $(`#${totemp}`).val();
                    if ($(`#${margintop}`).val() != "undefine")
                        EditGlobal[tblid][i][j].margintop = $(`#${margintop}`).val();
                    if ($(`#${marginbottom}`).val() != "undefine")
                        EditGlobal[tblid][i][j].marginbottom = $(`#${marginbottom}`).val();
                    edval++;
                }
            }
        }
        console.log(EditGlobal);
        swal("Changes saved successfully", {
            icon: "success",
        });
    });

    $(document).on("click", "#addCalcrows", function () {
        $('#addCalcRow').removeAttr('hidden');
    });
    $(document).on("click", "#EditCalcTable", function () {
        ;
        var nr = $("#EditCalcrows").val();
        createCalcTable1(nr);
        $('#editcalctable').show();
        $('#createcalctable').hide();
    });

    $(document).on("click", "#editcalctable", function () {
        ;
        cols = [];

        $('#Edit-Calctable-datatype').empty();
        var table_body = '<table border="1" class="table">';
        table_body = createCalcTable2(table_body);
        table_body += '</table>';
        $('#Edit-Calctable-datatype').html(table_body);
        $('#EditCalcfinishBtn').removeAttr('hidden');
        $('#calcModal').modal("hide");
    });
    $(document).on("click", "#EditCalcfinishBtn", function () {

        var table_body = CalcFinish();
        $('#Edit-Calctable-content').append(table_body);
    });

    $(document).on("click", "#updateCalTemplates", function () {

        var name = EditTempName;
        var tbllength = Object.keys(calcglobaldata).length;
        var edittbllength = Object.keys(EditGlobal).length;
        if (tbllength > 0) {
            for (var k = 0; k < tbllength; k++) {
                var tblid = "table" + k;
                for (var i = 0; i < calcglobaldata[tblid].length; i++) {
                    for (var j = 0; j < calcglobaldata[tblid][i].length; j++) {
                        var vl = $(`#inp${calval}`).val();
                        if (typeof vl == "undefined") vl = "";
                        calcglobaldata[tblid][i][j].value = vl;

                        if (calcglobaldata[tblid][i][j].datatype == 5) {
                            var optn = [];
                            //var dt = 
                            $(`#list${calval} option`).each(function () {
                                var vt = $(this).val();
                                if (vt != "") {
                                    optn.push(vt);
                                }

                            });
                            calcglobaldata[tblid][i][j]["options"] = optn;
                        }
                        if (calcglobaldata[tblid][i][j].datatype == 7) {
                            var vl = $(`#inp${calval}`).val();
                            if (typeof vl == "undefined" || vl == "") vl = 0.00;
                            calcglobaldata[tblid][i][j].value = vl;
                        }
                        calval++;
                    }
                }
            }
            for (var i = 0; i < tbllength; i++) {
                var tbllength2 = Object.keys(EditGlobal).length;
                var tblid = "table" + tbllength2;
                var tb = "table" + i;
                var tbl = calcglobaldata[tb];
                //var dyn = {};
                EditGlobal[tblid] = tbl;
            }
        }

        //var tbllength = Object.keys(EditGlobal).length;
        for (var k = 0; k < edittbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    if (EditGlobal[tblid][i][j].datatype != 5 && EditGlobal[tblid][i][j].datatype != 6) {
                        var vl = $(`#calc${dynid}`).val();
                        if (vl != "undefine")
                            EditGlobal[tblid][i][j].value = vl;
                    }

                    if (EditGlobal[tblid][i][j].datatype == 5) {
                        var optn = [];
                        //var dt = 
                        var vl = $(`#calc${dynid}`).val();
                        $(`#list2${dynid} option`).each(function () {
                            var vt = $(this).val();
                            if (vt != "") {
                                optn.push(vt);
                            }

                        });
                        EditGlobal[tblid][i][j]["options"] = optn;
                        if (typeof vl == "undefine") vl = "Select";
                        EditGlobal[tblid][i][j].value = vl;
                    }
                    //edval++;
                }
            }
        }
        console.log(EditGlobal);
        var format = JSON.stringify(EditGlobal);
        var border = $('#calcEditborder option:selected').val();
        var operation = JSON.stringify(operations);
        var bill = $('#calcEditbill option:selected').val();
        var obj = {};
        obj = dynmodel;
        obj.CalcFormat = format;
        obj.Border = border;
        obj.Operations = operation;
        obj.BillType = bill;

        $.ajax({
            type: "post",
            url: '/Admin/UpdateCalcTemplate',
            dataType: "json",
            data: { obj },
            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", "#clearCalTemplates", function () {
        $('.renderCalTemps').empty();
        $('#stage2editCal').empty();
        EditGlobal = [];
        dynmodel = {};
    });
    $(document).on("click", "#deleteCalTemplates", function () {
        var name = $("#calctblId").find(':selected').text();
        $.ajax({
            type: "post",
            url: '/Admin/DeleteCalcTemplate',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    $('.editCalcTempdrop').load("#calctblId");
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                }
            }
        });
    });
    $(document).on("click", ".deletecalcrow", function () {

        //$(this).parents().remove();
        var item = $(this).parents("tr");
        var rowno = item.attr("rowno");
        item.remove();
        console.log(EditGlobal);
        var tbllength = Object.keys(EditGlobal).length;
        for (var k = 0; k < tbllength; k++) {

            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                var r = "" + k + i;
                if (r == rowno) {

                    EditGlobal[tblid].splice(i, 1);

                }
            }
        }
        console.log(EditGlobal);

    });
    $(document).on("click", "#delCalcoption", function () {

        var v = $(this).prev().prev().val();
        var dp = $(this).next();
        $(dp[0].options).each(function () {

            var x = $(this).val();
            if (x == v) $(this).remove();
            //var x2 = $(this);

        });
        alertify.set('notifier', 'position', 'top-right');
        alertify.success("Option deleted Successfully");
    });
    $(document).on("change", ".checksum", function () {
        debugger
        var col = $(this).siblings().attr("colno");
        if ($(this).prop('checked')) {
            var totalSum = 0;
            var tbllength = Object.keys(EditGlobal).length;
            var sum = 0;
            if (typeof operations["addition"] != "undefined" && operations["addition"].length > 0) {
                for (var k = 0; k < tbllength; k++) {

                    var tblid = "table" + k;
                    for (var i = 0; i < EditGlobal[tblid].length; i++) {
                        //for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                        for (var j = 0; j < operations["addition"].length; j++) {
                            var dynid = "calc" + EditTempName + k + i + (operations["addition"][j] - 1);
                            var val = $(`#${dynid}`).val();
                            //val = val.replace(/,/g, '');
                            if (val == "" || val == "undefined" || typeof val === "undefined") val = 0;
                            else {
                                val = val.replace(/₹/g, '');
                                val = val.replace(/,/g, '');
                            }
                            sum = sum + parseFloat(val);
                        }

                        //mulSum = mulSum + mul;

                        //}
                    }
                }
            }

            var mulSum = 0;
            console.log(operations);
            if (typeof operations["multiplication"] != "undefined" && operations["multiplication"].length > 0) {
                for (var k = 0; k < tbllength; k++) {

                    var tblid = "table" + k;
                    for (var i = 0; i < EditGlobal[tblid].length; i++) {
                        //for (var j = 0; j < EditGlobal[tblid][i].length; j++) {

                        var mul = 1;
                        for (var j = 0; j < operations["multiplication"].length; j++) {
                            var dynid = "calc" + EditTempName + k + i + (operations["multiplication"][j] - 1);
                            var val = $(`#${dynid}`).val();

                            if (val == "" || val == "undefined" || typeof val === "undefined") val = 0;
                            else {
                                val = val.replace(/₹/g, '');
                                val = val.replace(/,/g, '');
                            }
                            mul = mul * parseFloat(val);
                        }

                        mulSum = mulSum + mul;

                        //}
                    }
                }
            }
            var colsum = 0;
            if (typeof operations["singleaddition"] != "undefined" && operations["singleaddition"].length > 0) {

                for (var k = 0; k < tbllength; k++) {

                    var tblid = "table" + k;
                    for (var i = 0; i < EditGlobal[tblid].length; i++) {
                        for (var j = 0; j < operations["singleaddition"].length; j++) {

                            var dynid = "calc" + EditTempName + k + i + (operations["singleaddition"][j] - 1);
                            var val = $(`#${dynid}`).val();
                            //val = val.replace(/,/g, '');
                            if (val == "" || val == "undefined" || typeof val === "undefined") val = 0;
                            else {
                                val = val.replace(/₹/g, '');
                                val = val.replace(/,/g, '');
                            }
                            colsum = colsum + parseFloat(val);
                            break;


                        }


                    }
                }

            }
            if (typeof operations["division"] != "undefined" && operations["division"].length > 0) {
                for (var k = 0; k < tbllength; k++) {

                    var tblid = "table" + k;
                    for (var i = 0; i < EditGlobal[tblid].length; i++) {
                        for (var j = 0; j < operations["division"].length; j++) {

                            var dynid = "calc" + EditTempName + k + i + (operations["addition"][j] - 1);
                            var val = $(`#${dynid}`).val();
                            if (val == "" || val == "undefined" || typeof val === "undefined") val = 0;
                            else {
                                val = val.replace(/₹/g, '');
                                val = val.replace(/,/g, '');
                            }
                            colsum = colsum + parseFloat(val);


                        }


                    }
                }

            }
            var percent = 0;
            if (typeof operations["percentage"] != "undefined" && operations["percentage"].length > 0) {
                for (var k = 0; k < tbllength; k++) {

                    var tblid = "table" + k;
                    for (var i = 0; i < EditGlobal[tblid].length; i++) {
                        var perc = 1;
                        var dynid1 = "calc" + EditTempName + k + i + (operations["percentage"][0] - 1);
                        var val1 = $(`#${dynid1}`).val();
                        var dynid2 = "calc" + EditTempName + k + i + (operations["percentage"][1] - 1);
                        var val2 = $(`#${dynid1}`).val();
                        if ((val1 == "" || val1 == "undefined" || typeof val1 === "undefined") || (val2 == "" || val2 == "undefined" || typeof val2 === "undefined")) { val1 = 0; val2 = 0; }
                        else {
                            val = val.replace(/₹/g, '');
                            val = val.replace(/,/g, '');
                        }
                        perc = (val1 * val2) / 100;


                        percent = percent + perc;

                        //}
                    }
                }
            }
            totalSum = sum + mulSum + colsum + percent;
            totalSum = parseFloat(totalSum);
            if ($(this).siblings().attr("type") == "text") $(this).siblings().val(totalSum.toFixed(2)).trigger("blur");
            else $(this).siblings().val(totalSum.toFixed(2)).trigger("blur");

        }
        else {
            $(this).siblings().val("");
        }

    });
    /*  $(document).on("click","")*/
    //conclusion set
    var conclusionSet = [];

    $(document).on("click", "#addSetItems", function () {
        var setvalue = $("#setItem").val();
        //setCount++;
        conclusionSet.push(setvalue);
        var item = `<p>-> <span>${setvalue}</span> <span style="cursor:pointer;color:red" id="removeSetItem">X</span></p>`;
        $("#statements").append(item);

    });
    $(document).on("click", "#removeSetItem", function () {

        console.log(conclusionSet);
        var valueItem = $(this).prev().text();
        const index = conclusionSet.indexOf(valueItem);
        if (index > -1) { // only splice array when item is found
            conclusionSet.splice(index, 1); // 2nd parameter means remove one item only
        }
        $(this).parent().remove();
        // array = [2, 9]
        console.log(conclusionSet);
    });
    $(document).on("change", "#conclusionsetId", function () {

        var id = $(this).val();
        $("#statements").empty();
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/GetConclusionSetById',
                dataType: "json",
                data: { id },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        $("#conclusionSetName").val(result.model.name);
                        conclusionSet = result.model.conclusionSets;
                        for (var i = 0; i < conclusionSet.length; i++) {
                            var item = `<p>-> <span>${conclusionSet[i]}</span> <span style="cursor:pointer;color:red" id="removeSetItem">X</span></p>`;
                            $("#statements").append(item);
                        }
                        $('.ConclusionActionbtns').show();
                        $('.ConclusionSavebtns').hide();
                    }
                    else {

                    }
                }
            });
        }
        else {
            conclusionSet = [];
            $("#conclusionSetName").val("");
            $("#statements").empty();
            $('.ConclusionActionbtns').hide();
            $('.ConclusionSavebtns').show();
        }


    });
    $(document).on("click", "#saveConclusion", function () {

        var name = $("#conclusionSetName").val();
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Enter Name Of ConclusionSet");
        }
        else {
            var model = {};
            model.Name = name;
            model.ConclusionSets = conclusionSet;
            $.ajax({
                type: "post",
                url: '/Admin/CreateConclusionSet',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.conclusiondrop').load(" #conclusionsetId");
                        conclusionSet = [];
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }
    });
    $(document).on("click", "#updateConclusion", function () {

        var name = $("#conclusionSetName").val();
        var id = $("#conclusionsetId option:selected").val();
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Enter Name Of ConclusionSet");
        }
        else {
            var model = {};
            model.Name = name;
            model.ConclusionSets = conclusionSet;
            //model.Id = id;
            $.ajax({
                type: "post",
                url: '/Admin/UpdateConclusionSet',
                dataType: "json",
                data: { model, id },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.conclusiondrop').load(" #conclusionsetId");
                        conclusionSet = [];
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }
    });
    $(document).on("click", "#deleteConclusion", function () {

        var name = $("#conclusionSetName").val();
        var id = $("#conclusionsetId option:selected").val();
        if (name == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Enter Name Of ConclusionSet");
        }
        else {
            var model = {};
            model.Name = name;
            model.ConclusionSets = conclusionSet;
            //model.Id = id;
            $.ajax({
                type: "post",
                url: '/Admin/DeleteConclusionSet',
                dataType: "json",
                data: { model, id },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.conclusiondrop').load(" #conclusionsetId");
                        conclusionSet = [];
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }
    });

    $(document).on("change", ".selectTextarea", function () {
        var x = $(this).val();
        $(this).prev().prev().prev().val(x);
        $(this).val('Select').prop('selected', true);
    });

    //Location
    $(document).on("click", "#saveState", function () {
        var txt = $('#stateName').val();
        if (txt == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("State Name is Required");
        }
        else {
            var model = {};
            model.Name = txt;
            $.ajax({
                type: "post",
                url: '/Admin/CreateState',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.statedrop').load(" #StateId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("change", "#StateId", function () {
        var id = $(this).find(':selected').val().trim();
        if (id != 0) {
            $('.stateActionbtns').show();
            $('.stateSavebtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetStateById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        $('#stateName').val(result.model.name);
                    }

                },

            });
        }
        else {
            $('.stateActionbtns').hide();
            $('.stateSavebtns').show();
            $('#stateName').val("");
            //$('#agencyname').val("");

        }
    });
    $(document).on("click", "#updateState", function () {

        var id = $('#StateId option:selected').val();
        var model = {};
        model.Name = $('#stateName').val();
        if (model.Name != "") {
            $.ajax({
                type: "post",
                url: '/Admin/UpdateState',
                dataType: "json",
                data: { model, id },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.statedrop').load(" #StateId");
                        //$('.companybranchdrop').load(" #companybranchId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }
        else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("State Name is Required");
        }

    });
    $(document).on("click", "#deleteState", function () {
        var id = $('#StateId option:selected').val();
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/DeleteState',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.statedrop').load(" #StateId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }

    });
    //district
    $(document).on("change", "#stateNameId", function () {

        var id = $(this).find(':selected').val().trim();
        if (id != 0) {
            $('.districtSavebtns').show();
            $('.DistrictActionbtns').hide();
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
                            var optionText = model[i].Name
                            if (model[i].IsDeleted == false) {
                                $('#districtId').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                            }

                        }

                    }

                },

            });
        }
        else {
            $('.districtSavebtns').show();
            $('.DistrictActionbtns').hide();
            $('#district-id').val("");
            $('#districtName').val("");
            $('#districtId').val(0).prop('selected', true);
        }
    });
    $(document).on("change", "#districtId", function () {

        var id = $(this).find(':selected').val().trim();
        var text = $(this).find(':selected').text().trim();
        if (id != 0) {
            $('.DistrictActionbtns').show();
            $('.districtSavebtns').hide();
            $('#district-id').val(id);
            $('#districtName').val(text);
        }
        else {
            $('.districtSavebtns').show();
            $('.DistrictActionbtns').hide();
            $('#district-id').val("");
            $('#districtName').val("");
        }

    });

    $(document).on("click", "#saveDistrict", function () {
        var stateId = $('#stateNameId option:selected').val();
        var txt = $('#districtName').val();
        if (txt == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("State Name is Required");
        }
        else {
            var model = {};
            model.Name = txt;
            model.StateId = stateId;
            $.ajax({
                type: "post",
                url: '/Admin/CreateDistrict',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.districtdrop').load(" #districtId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("click", "#updateDistrict", function () {


        var model = {};
        var stateId = $('#stateNameId option:selected').val();
        model.Name = $('#districtName').val();
        var id = $('#districtId option:selected').val();
        model.StateId = stateId;
        if (model.Name != "") {
            $.ajax({
                type: "post",
                url: '/Admin/UpdateDistrict',
                dataType: "json",
                data: { model, id },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.districtdrop').load(" #districtId");
                        //$('.companybranchdrop').load(" #companybranchId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }
        else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("State Name is Required");
        }

    });
    $(document).on("click", "#deleteDistrict", function () {
        var id = $('#districtId option:selected').val();
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/DeleteDistrict',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.districtdrop').load(" #districtId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }

    });

    //police station
    $(document).on("change", "#StatePoliceId", function () {
        var id = $(this).find(':selected').val().trim();
        if (id != 0) {
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
                            var optionText = model[i].Name
                            if (model[i].IsDeleted == false) {
                                $('#districtPoliceId').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                            }

                        }

                    }

                },

            });
        }
        else {

            $('#police-id').val("");
            $('#policeStationName').val("");
            $('#districtPoliceId').val(0).prop('selected', true);
            $('#PoliceId').val(0).prop('selected', true);
            $('#policeStationAddress').val("");
        }
    });
    $(document).on("change", "#districtPoliceId", function () {

        var id = $(this).find(':selected').val().trim();
        var text = $(this).find(':selected').text().trim();
        if (id != 0) {
            $('.policeSavebtns').show();
            $('.PoliceStationActionbtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetPoliceStationByState',
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
                            var optionText = model[i].Name
                            if (model[i].IsDeleted == false) {
                                $('#PoliceId').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                            }

                        }

                    }

                },

            });
        }
        else {

            $('#police-id').val("");
            $('#policeStationName').val("");
            $('#districtPoliceId').val(0).prop('selected', true);
            $('#PoliceId').val(0).prop('selected', true);
            $('#policeStationAddress').val("");
        }

    });
    $(document).on("change", "#PoliceId", function () {
        var id = $(this).find(':selected').val().trim();
        var text = $(this).find(':selected').text().trim();
        if (id != 0) {
            $('.PoliceStationActionbtns').show();
            $('.policeSavebtns').hide();
            $.ajax({
                type: "post",
                url: '/Admin/GetPloiceStationById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        $('#policeStationName').val(result.model.name);
                        $('#police-id').val(id);
                        $('#policeStationAddress').val(result.model.address);
                    }

                },

            });



        }
        else {
            $('.policeSavebtns').show();
            $('.PoliceStationActionbtns').hide();
            $('#district-id').val("");
            $('#districtName').val("");
            $('#policeStationAddress').val("");
        }
    });
    $(document).on("click", "#savePoliceStation", function () {

        var stateId = $('#StatePoliceId option:selected').val();
        var districtId = $('#districtPoliceId option:selected').val();
        var txt = $('#policeStationName').val();
        var address = $('#policeStationAddress').val().trim();
        if (txt == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Police Station Name is Required");
        }
        else if (address == "") {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Address is Required");
        }
        else {
            var model = {};
            model.Name = txt;
            model.StateId = stateId;
            model.DistrictId = districtId;
            model.Address = address;
            $.ajax({
                type: "post",
                url: '/Admin/CreatePoliceStation',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.districtPolicedrop').load(" #PoliceId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });
        }
    });
    $(document).on("click", "#updatePoliceStation", function () {


        var model = {};
        var stateId = $('#stateNameId option:selected').val();
        var stateId = $('#StatePoliceId option:selected').val();
        var districtId = $('#districtPoliceId option:selected').val();
        var txt = $('#policeStationName').val();
        var address = $('#policeStationAddress').val().trim();
        var id = $('#PoliceId option:selected').val();
        model.Name = txt;
        model.StateId = stateId;
        model.DistrictId = districtId;
        model.Address = address;

        if (model.Name != "") {
            $.ajax({
                type: "post",
                url: '/Admin/UpdatePoliceStation',
                dataType: "json",
                data: { model, id },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.districtPolicedrop').load(" #PoliceId");
                        //$('.companybranchdrop').load(" #companybranchId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }
        else {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("Police Station is Required");
        }

    });
    $(document).on("click", "#deletePoliceStation", function () {
        var id = $('#PoliceId option:selected').val();
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/DeletePoliceStation',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },
                aysnc: false,
                success: function (result) {

                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        $('.districtPolicedrop').load(" #PoliceId");

                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }

    });

    //Location Render
    $(document).on("change", '.stateselect', function () {

        var id = $(this).find(':selected').val().trim();
        var dis = $(this).next();
        var disId = dis.attr("id");
        $(this).next().empty();
        dis.append(`<option value="0" selected>District</option>`)
        console.log(dis);
        if (id != 0) {
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
                            var optionText = model[i].Name
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
    $(document).on("change", ".districtselect", function () {

        var id = $(this).find(':selected').val().trim();
        var text = $(this).find(':selected').text().trim();
        $(this).next().empty();
        var pid = $(this).next().attr("id");
        $(this).next().append(`<option value="0" selected>Police</option>`)
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/GetPoliceStationByState',
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
                            var optionText = model[i].Name
                            if (model[i].IsDeleted == false) {
                                $(`#${pid}`).append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                            }

                        }

                    }

                },

            });
        }


    });



    //headoffice render
    $(document).on("change", '.headselect', function () {

        var id = $(this).find(':selected').val().trim();
        var dis = $(this).next();
        var disId = dis.attr("id");
        $(this).next().empty();
        dis.append(`<option value="0" selected>Branch</option>`)
        console.log(dis);
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/GetBranchById',
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
                            var optionText = model[i].Name
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
    $(document).on("change", '.branchselect', function () {

        var id = $(this).find(':selected').val().trim();
        var text = $(this).find(':selected').text().trim();
        $(this).next().empty();
        var add = $(this).next();
        // var pid = $(this).next().attr("id");
        //$(this).next().append(`<option value="0" selected>Police</option>`)
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/GetClientById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {
                    if (result.status == true) {

                        //var model = JSON.parse(result.json);
                        console.log(result.model.address);
                        add.val(result.model.address);

                    }

                },

            });
        }
    });

    //branch Template Render

    $(document).on("change", '.branchDistrict', function () {
        var branchDistrict = $(this).find(':selected').text();
        var branchState = $(this).prev().find(':selected').text();
        var headId = $('.headTemp').find(':selected').val().trim();
        var dis = $(this).next();
        var disId = dis.attr("id");
        $(this).next().empty();
        dis.append(`<option value="0" selected>Branch</option>`)
        console.log(dis);
        var model = {};
        model.HeadOfficeId = headId;
        model.State = branchState;
        model.District = branchDistrict;
        if (model != null) {
            $.ajax({
                type: "post",
                url: '/Admin/GetBranch',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { model },

                aysnc: false,
                success: function (result) {
                    if (result.status == true) {

                        var model = JSON.parse(result.json);
                        for (var i = 0; i < model.length; i++) {
                            var ob = model[i].Id;
                            var optionValue = String(ob);
                            var optionText = model[i].Name
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
});