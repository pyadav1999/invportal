$(document).ready(function () {
    var reporterror = [];
    $('#searchDiv').hide();
    if ($('#agencyId').find(':selected').val() == 0) {
        $('.update-btns').hide();
        $('.savebtn').hide();
        $('.refId').hide();
        $('.reportType').hide();
    }
    else {
        $('.update-btns').hide();
        $('.savebtn').show();
        $('.refId').show();
        $('.reportType').show();
    }
    $('.templates').hide();
    $('.SaveTemplateData').hide();
    $(document).on("change", "#agencyId", function () {
        debugger
        var id = $(this).val();
        var name = $('#agencyId option:selected').text();
        if (id != 0) {
            $('.update-btns').hide();
            $('.savebtn').show();
            $('.refId').show();
            $('.reportType').show();
            $('#agencyAbb').val(name);
            //$.ajax({
            //    type: "post",
            //    url: '/Admin/GetAgencyById',
            //    //contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: { id },

            //    aysnc: false,
            //    success: function (result) {
            //        debugger
            //        if (result.status == true) {
            //        }

            //    },

            //});
        }
        else {
            $('.savebtn').hide();
            $('.refId').hide();
            $('.reportType').hide();
        }

    });
    $(document).on("change", "#headofficeId", function (event, branchId) {
        debugger
        console.log(event);
        console.log(branchId);
        var id = $(this).val();
        $('#clientSelected').siblings().remove();
        if (id != 0) {
            $.ajax({
                type: "post",
                url: '/Admin/GetBranchById',
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {
                    debugger
                    if (result.status == true) {
                        var model = JSON.parse(result.json);
                        for (var i = 0; i < model.length; i++) {
                            var ob = model[i].Id;
                            var optionValue = String(ob);
                            var optionText = model[i].Name
                            if (model[i].IsDeleted == false) {
                                $('#branchId').append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                            }

                        }
                        if (branchId) {
                            $(`#branchId`).val(branchId).prop('selected', true);
                        }
                    }
                }

            });

        }
        else {
            $('#clientSelected').siblings().remove();
        }

    });

    var conclusionStes = [];
    $.ajax({
        type: "post",
        url: '/Reports/GetAllConclusionSets',
        dataType: "json",
        data: {},
        aysnc: false,
        success: function (result) {
            debugger;
            if (result.model != null) {
                for (var i = 0; i < result.model.length; i++) {
                    var set = {};
                    set.Name = result.model[i].name;
                    set.Id = result.model[i].id;
                    conclusionStes.push(set);
                }
                console.log(conclusionStes);
            }
        }
    });

    var data = [];
    var TempName;
    var sequence = {};
    var t = 0;
    var c = 0;
    var d = 0;
    $(document).on("change", "#templateId", function () {
        debugger;
        var name = $(this).find(':selected').text();
        renderTemplate(name);
        var key = "temp" + t;
        sequence[key] = name;
        t++;
        $(this).find(':selected').attr("disabled", "disabled");
    });

    function renderTemplate(name, refId) {
        $.ajax({
            type: "post",
            url: '/Reports/RenderTemplate',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {
                debugger;
                if (result.model != null) {
                    var format = JSON.parse(result.model.templateFormat);
                    data = format;
                    TempName = result.model.templateName;
                    var Border = result.model.border;
                    //TempName = TempName.replace(" ", "");
                    result.model.templateName = result.model.templateName.replace(/[^\w\s]/gi, '');
                    result.model.templateName = result.model.templateName.split(" ").join("");
                    $('.temp').append(`
                    <section class="templates" id="${result.model.templateName}">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">${TempName}</div>
                    <div class="card-body">
                        <form name="my-form" class="${result.model.templateName} tempForm">
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
                `);
                    var ID = 1;
                    for (var i = 0; i < format.length; i++) {
                        var ques = format[i].ques;
                        var quesId = format[i].ques.split(" ").join("");
                        var qId = "ques";
                        quesId = quesId.replace(/[^\w\s]/gi, '');
                        if (format[i].qdatatype == 0) {
                            if (format[i].datatype == 0 || format[i].datatype == 1) {
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" type="text"  value="${ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <input type="text" class="form-control txtanswer" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               </div>`);

                            }
                            if (format[i].datatype == 4 || format[i].datatype == 5) {
                                $(`.${result.model.templateName}`).append(
                                    `<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <select  class="form-control selectques  ${result.model.templateName + ID}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                </select>
               </div>`);
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
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <input type="date" class="form-control txtanswer" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               </div>`);

                            }
                            if (format[i].datatype == 6) {
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <input type="checkbox" class="form-check-input txtanswer check" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               </div>`);

                            }
                            if (format[i].datatype == 2) {
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <input class="form-control txtquestions" type="text" value="${format[i].ques}" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                <span class="input-group-text"></span>
                <textarea type="text" class="form-control txtanswer" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" rows="1" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>${format[i].answer}</textarea>
               </div>`);

                            }
                        }
                        else if (format[i].qdatatype == 1) {
                            if (format[i].datatype == 0 || format[i].datatype == 1) {
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName} ${qId + i}" id="" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <input type="text" class="form-control txtanswer" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               </div>`);

                            }
                            if (format[i].datatype == 4 || format[i].datatype == 5) {
                                $(`.${result.model.templateName}`).append(
                                    `<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName} ${qId + i}" id="" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <select  class="form-control selectques  ${result.model.templateName + ID}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                </select>
               </div>`);
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
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName} ${qId + i}" id="" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <input type="date" class="form-control txtanswer" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               </div>`);

                            }
                            if (format[i].datatype == 6) {
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName} ${qId + i}" id="" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <input type="checkbox" class="form-check-input txtanswer check" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
               </div>`);

                            }
                            if (format[i].datatype == 2) {
                                $(`.${result.model.templateName}`).append(`<div class="input-group mb-3 fields">
                <select  class="form-control selectques  ${result.model.templateName} ${qId + i}" id="" placeholder="" aria-label="Server" style='color:${format[i].qcolor};background-color:${format[i].qbgcolor};font-weight:${format[i].qfontWeight};vertical-align:${format[i].qverticle};text-align:${format[i].qhorizontal};font-family:${format[i].qfontStyle}'>
                </select>
                <span class="input-group-text"></span>
                <textarea type="text" class="form-control txtanswer" value="${format[i].answer}" id="${result.model.templateName + quesId + i}" placeholder="Answer" rows="1" aria-label="Server" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>${format[i].answer}</textarea>
               </div>`);

                            }

                            for (var j = 0; j < format[i].Qchoices.length; j++) {
                                var optionValue = format[i].Qchoices[j].optionval;
                                var optionText = format[i].Qchoices[j].optiontxt;
                                $(`.${qId + i}`).append(`<option value="${optionValue}" style='color:${format[i].acolor};background-color:${format[i].abgcolor};font-weight:${format[i].afontWeight};vertical-align:${format[i].averticle};text-align:${format[i].ahorizontal};font-family:${format[i].afontStyle}'>
                                   ${optionText}
                              </option>`);
                            }
                        }


                    }
                    if (Border == "0") {
                        $(`.tempForm`).css("border", "1px solid black");
                        //$(`.tbl:th`).css("border", "1px solid black");
                        //$(`.tbl:td`).css("border", "1px solid black");
                    }
                    else if (Border == "1") {
                        $(`.tempForm`).css("border-right", "1px solid black");
                        //$(`.tbl:th`).css("border-right", "1px solid black");
                        //$(`.tbl:td`).css("border-right", "1px solid black");
                    }
                    else if (Border == "2") {
                        $(`.tempForm`).css("border-left", "1px solid black");
                        //$(`.tbl:th`).css("border-left", "1px solid black");
                        //$(`.tbl:td`).css("border-left", "1px solid black");
                    }
                    else if (Border == "3") {
                        $(`.tempForm`).css("border-top", "1px solid black");
                        //$(`.tbl:th`).css("border-top", "1px solid black");
                        //$(`.tbl:td`).css("border-top", "1px solid black");

                    }
                    else if (Border == "4") {
                        $(`.tempForm`).css("border-bottom", "1px solid black");
                        //$(`.tbl:th`).css("border-bottom", "1px solid black");
                        //$(`.tbl:td`).css("border-bottom", "1px solid black");
                    }
                    var name = TempName;
                    if (refId != "0") {
                        $.ajax({
                            type: "post",
                            url: '/Reports/GetTempDataByReportId',
                            dataType: "json",
                            data: { name, refId },
                            aysnc: false,
                            success: function (result) {
                                debugger
                                //var model = JSON.parse(result.tempModel);
                                if (result.model != null) {
                                    var i = 0;
                                    delete result.model["_id"];
                                    delete result.model["ReportId"];
                                    $.each(result.model, function (index, value) {
                                        debugger
                                        var tname = name.split(" ").join("");
                                        tname = tname.replace(/[^\w\s]/gi, '');
                                        var quesid = index.split(" ").join("");
                                        quesid = quesid.replace(/[^\w\s]/gi, '');
                                        $(`#${tname + quesid + i}`).val(value);
                                        i++;
                                    });
                                }

                            }
                        });
                    }

                }

            },

        });
    }
    //reporttype render
    var reporttemp = [];
    $(document).on("change", "#reporttypeId", function () {
        debugger
        var id = $(this).val();
        for (var i = 0; i < reporttemp.length; i++) {
            var name = reporttemp[i];
            $('.temp').find(`#${name}`).remove();
        }
        reporttemp = [];
        if (id != 0) {

            $.ajax({
                type: "post",
                url: '/Admin/GetReportTypeById',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { id },

                aysnc: false,
                success: function (result) {
                    debugger
                    if (result.status == true) {
                        //$('#reportType').val(result.model.name);
                        var seq = JSON.parse(result.model.sequence);
                        for (var key in seq) {
                            if (key[0] == 't') {
                                localStorage.setItem("type", seq[key]);
                                renderTemplate(seq[key], 0);
                                reporttemp.push(seq[key]);
                                var key = "temp" + t;
                                sequence[key] = seq[key];
                                t++;
                                $('#templateId option').each(function () {

                                    var txt = $(this).text();
                                    if (txt == seq[key]) {
                                        $(this).prop('disabled', true);
                                    }
                                });
                            }
                            if (key[0] == 'd') {
                                localStorage.setItem("type", seq[key]);
                                renderDynamicTable(seq[key], 0);
                                reporttemp.push(seq[key]);
                                var key = "dyn" + d;
                                sequence[key] = seq[key];
                                d++;
                                $('#dynamicTableId option').each(function () {

                                    var txt = $(this).text();
                                    if (txt == seq[key]) {
                                        $(this).prop('disabled', true);
                                    }
                                });
                            }
                            if (key[0] == 'c') {
                                renderCalcTable(seq[key], 0);
                                reporttemp.push(seq[key]);
                                var key = "calc" + c;
                                sequence[key] = seq[key];
                                c++;
                                $('#calctblId option').each(function () {

                                    var txt = $(this).text();
                                    if (txt == seq[key]) {
                                        $(this).prop('disabled', true);
                                    }
                                });
                            }
                        }
                        //var type = JSON.parse(result.model.templates);
                        //for (var i = 0; i < type.length; i++) {
                        //    debugger

                        //}
                        //var type2 = JSON.parse(result.model.dynamicTables);
                        //localStorage.setItem("type", type2);
                        //for (var i = 0; i < type2.length; i++) {
                        //    debugger
                        //    renderDynamicTable(type2[i], 0);
                        //    reporttemp.push(type2[i]);
                        //    sequence.push(type2[i]);
                        //    $('#templateId option').each(function () {
                        //        debugger
                        //        var txt = $(this).text();
                        //        if (txt == type2[i]) {
                        //            $(this).prop('disabled', true);
                        //        }
                        //    });
                        //}
                        //var type3 = JSON.parse(result.model.clacTables);
                        //localStorage.setItem("type", type3);
                        //for (var i = 0; i < type3.length; i++) {
                        //    debugger
                        //    renderCalcTable(type3[i], 0);
                        //    reporttemp.push(type3[i]);
                        //    sequence.push(type3[i]);
                        //    $('#templateId option').each(function () {
                        //        debugger
                        //        var txt = $(this).text();
                        //        if (txt == type3[i]) {
                        //            $(this).prop('disabled', true);
                        //        }
                        //    });
                        //}
                    }

                },

            });
        }
        else {

        }

    });


    function SaveTempData(name) {
        var data = [];

        try {
            return $.ajax({
                type: "post",
                url: '/Reports/RenderTemplate',
                dataType: "json",
                data: { name },
                aysnc: false,
                success: function (result) {
                    debugger

                }
            });
        }
        catch (error) {
            alert(error);
        }


    }

    //save report
    $(document).on("click", "#SubmitReportData", function () {
        debugger;
        var count = 0;
        var model = {};
        var tempname = [];
        var dyntbl = [];
        var clctbl = [];
        $(".tempOptions").each(function () {
            debugger
            if ($(this).prop('disabled') == true) {
                tempname.push($(this).text());
            }
        });
        $(".dynOptions").each(function () {
            debugger
            if ($(this).prop('disabled') == true) {
                dyntbl.push($(this).text());
            }
        });
        $(".calcOptions").each(function () {
            debugger
            if ($(this).prop('disabled') == true) {
                clctbl.push($(this).text());
            }
        });
        model.Agency = $('#agencyId option:selected').val();
        model.Ref2 = $('#Ref2').val();
        model.year = $('#yearId option:selected').val();
        var ag = $('#agencyAbb').val();
        var ref2 = $('#Ref2').val();
        var yr = $('#yearId option:selected').text();
        model.RefId = ag + ref2 + yr;
        model.ReportType = $('#reporttypeId option:selected').val();
        model.Client = $('#headofficeId option:selected').val();
        model.Branch = $('#branchId option:selected').val();
        model.Department = $('#departmentId option:selected').val();
        model.Advocate = $('#advocateId option:selected').val();
        model.Created_Date = $('#date').val();
        model.Templates = JSON.stringify(tempname);
        model.DynamicTable = JSON.stringify(dyntbl);
        model.Sequence = JSON.stringify(sequence);
        model.CalculationTable = JSON.stringify(clctbl);
        if (model.Ref2 == "" || model.year == 0 || model.Agency == 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("REF.No is Required");
        }
        else {
            $.ajax({
                type: "post",
                url: '/Reports/CreateReport',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    debugger
                    if (result.status == true) {
                        debugger
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        sequence = [];
                        t = 0;
                        d = 0;
                        c = 0;
                        $('.templates').show();
                        for (var i = 0; i < tempname.length; i++) {
                            debugger

                            SaveTempData(tempname[i]).done(function (result) {
                                debugger
                                var tempdata = [];
                                var name = result.model.templateName;
                                result.model.templateName = result.model.templateName.split(" ").join("");
                                var tname = result.model.templateName;
                                tname = tname.replace(/[^\w\s]/gi, '');
                                var data = JSON.parse(result.model.templateFormat);
                                if (data != null) {
                                    for (var i = 0; i < data.length; i++) {
                                        var quesid = data[i].ques.split(" ").join("");
                                        queiId = quesid.replace(/[^\w\s]/gi, '');
                                        //${ result.model.templateName + format[i].ques + i }
                                        if (data[i].datatype == 4 || data[i].datatype == 5) {
                                            var ob = {};
                                            ob.ques = data[i].ques;
                                            var ans1 = $(`#${tname + quesid + i} option:selected`).val();
                                            if (ans1 == "") reporterror.push(data[i].ques);
                                            //ob[data[i].ques] = ans1.trim();
                                            ob.ans = ans1.trim();
                                            tempdata.push(ob);
                                        }
                                        else if (data[i].datatype == 6) {
                                            var ob = {};
                                            ob.ques = data[i].ques;
                                            if ($(`#${tname + quesid + i} `).prop('checked') == true) {
                                                //ob[data[i].ques] = true;
                                                ob.ans = true;
                                            }
                                            else {
                                                ob.ans = false;
                                                reporterror.push(data[i].ques);
                                            }

                                            tempdata.push(ob);
                                        }
                                        else {
                                            var ob = {};
                                            ob.ques = data[i].ques;
                                            //ob[data[i].ques] = $(`#${data[i].ques} `).val();
                                            ob.ans = $(`#${tname + quesid + i} `).val();
                                            if (ob.ans == "") reporterror.push(data[i].ques);
                                            tempdata.push(ob);
                                        }
                                    }
                                    var RefNo = model.RefId;
                                    var jsn = JSON.stringify(tempdata);
                                    $.ajax({
                                        type: "post",
                                        url: '/Reports/SaveTempData',
                                        dataType: "json",
                                        data: { name, jsn, RefNo },
                                        aysnc: false,
                                        success: function (result) {
                                            debugger
                                            if (result.status == true) {
                                                alertify.set('notifier', 'position', 'top-right');
                                                alertify.success(result.message);
                                                tempdata = [];
                                            }
                                            else {
                                                alertify.set('notifier', 'position', 'top-right');
                                                alertify.error(result.message);
                                                tempdata = [];
                                            }
                                        }
                                    });
                                    console.log(tempdata);
                                }
                            });

                        }
                        for (var i = 0; i < dyntbl.length; i++) {
                            var dyndata = []
                            saveDynamicTable(dyntbl[i]).done(function (result) {
                                debugger
                                var format = JSON.parse(result.model.tableFormat);
                                //console.log(format);
                                //data = format;
                                //tabelName = result.model.tableName;
                                var name = result.model.tableName;
                                var tblname = result.model.tableName.replace(/[^\w\s]/gi, '');
                                tblname = result.model.tableName.split(" ").join("");
                                var tbllength = Object.keys(format).length;
                                var ob = {};
                                for (var it = 0; it < tbllength; it++) {
                                    var tblid = "table" + it;
                                    for (var i = 0; i < format[tblid].length; i++) {

                                        for (var j = 0; j < format[tblid][i].length; j++) {

                                            var dynid = tblname + it + i + j;
                                            var val = $(`#dyn${dynid}`).val();
                                            ob[dynid] = val;

                                        }
                                    }
                                }

                                dyndata.push(ob);
                                var RefNo = model.RefId;
                                var jsn = JSON.stringify(dyndata)
                                $.ajax({
                                    type: "post",
                                    url: '/Reports/SaveDynamicTableData',
                                    dataType: "json",
                                    data: { name, jsn, RefNo },
                                    aysnc: false,
                                    success: function (result) {
                                        debugger
                                        if (result.status == true) {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.success(result.message);
                                            dyndata = [];
                                            ob = {};
                                        }
                                        else {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.error(result.message);
                                            dyndata = [];
                                            ob = {};
                                        }
                                    }
                                });
                            });


                        }
                        for (var i = 0; i < clctbl.length; i++) {
                            debugger
                            var caldata = []
                            saveCalcTable(clctbl[i]).done(function (result) {
                                var format = JSON.parse(result.model.calcFormat);
                                console.log(format);
                                //data = format;
                                //caltableName = result.model.calcName;
                                var name = result.model.calcName;
                                var tblname = result.model.calcName.replace(/[^\w\s]/gi, '');
                                tblname = result.model.calcName.split(" ").join("");
                                var ob2 = {};
                                for (var i = 0; i < format.length; i++) {

                                    for (var j = 0; j < format[i].length; j++) {

                                        var dynid = tblname + i + j;
                                        var val = $(`#cal${dynid}`).val();
                                        ob2[dynid] = val;

                                    }
                                }
                                caldata.push(ob2);
                                var RefNo = model.RefId;
                                var jsn = JSON.stringify(caldata)
                                $.ajax({
                                    type: "post",
                                    url: '/Reports/SaveCalcTableData',
                                    dataType: "json",
                                    data: { name, jsn, RefNo },
                                    aysnc: false,
                                    success: function (result) {
                                        debugger
                                        if (result.status == true) {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.success(result.message);
                                            caldata = [];
                                            ob2 = {};
                                        }
                                        else {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.error(result.message);
                                            caldata = [];
                                            ob2 = {};
                                        }
                                    }
                                });
                            });
                        }
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }

                },

            });

        }




    });

    //search report
    var stemps = [];
    $('.actionDivbtn').on("click", function () {
        $('#searchDiv').show();
    });
    $(document).on("click", "#closeSearchdiv", function () {
        $('#searchDiv').hide();
    });
    $(document).on("click", "#searchReport", function () {
        debugger
        var agency = $('#searchagency option:selected').text();
        var ref2 = $('#SearchRef2').val();
        var year = $('#Searchyear option:selected').text();
        var RefId = agency + ref2 + year;
        if (agency == 0 || ref2 == "" || year == 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("REF.No is Required");
        }
        else {
            for (var i = 0; i < stemps.length; i++) {
                var name = stemps[i].split(" ").join("");
                name = name.replace(/[^\w\s]/gi, '');
                $('.temp').find(`#${name}`).remove();
            }
            stemps = [];
            $.ajax({
                type: "post",
                url: '/Reports/GetReportByRefId',
                dataType: "json",
                data: { RefId },
                aysnc: false,
                success: function (result) {
                    debugger
                    if (result.model != null) {
                        $('.refId').show();
                        $('.reportType').show();
                        var data = result.model;
                        $(`#agencyId`).val(data.agency).prop('selected', true);
                        var agab = $('#agencyId option:selected').text();
                        $('#agencyAbb').val(agab);
                        $('#Ref2').val(data.ref2);
                        $(`#yearId`).val(data.year).prop('selected', true);
                        $(`#reporttypeId`).val(data.reportType).prop('selected', true);
                        $(`#headofficeId`).val(data.client).prop('selected', true);
                        $('#headofficeId').trigger("change", [data.branch]).delay(5000);
                        //var branch = data.branch;
                        //$.when($('#headofficeId').trigger("change")).then(function (branch) {
                        //    debugger
                        //    $(`#branchId`).val(branch).prop('selected', true);
                        //});
                        // $(`#branchId`).val(data.branch).prop('selected', true);
                        $(`#departmentId`).val(data.department).prop('selected', true);
                        $(`#advocateId`).val(data.advocate).prop('selected', true);
                        $('#date').val(data.created_Date);
                        var temps = JSON.parse(data.templates);
                        var refid = data.refId;
                        for (var i = 0; i < temps.length; i++) {

                            var name = temps[i];
                            stemps[i] = name;
                            $('#templateId option').each(function () {
                                debugger
                                var txt = $(this).text();
                                if (txt == temps[i]) {
                                    $(this).prop('disabled', true);
                                }
                            });
                            renderTemplate(temps[i], refid);

                        }
                        var dyntbl = JSON.parse(data.dynamicTable);
                        for (var i = 0; i < dyntbl.length; i++) {

                            var name = dyntbl[i];
                            stemps[i] = name;
                            $('#dynamicTableId option').each(function () {
                                debugger
                                var txt = $(this).text();
                                if (txt == dyntbl[i]) {
                                    $(this).prop('disabled', true);
                                }
                            });
                            renderDynamicTable(dyntbl[i], refid);

                        }
                        var calctbl = JSON.parse(data.calculationTable);
                        for (var i = 0; i < calctbl.length; i++) {

                            var name = calctbl[i];
                            stemps[i] = name;
                            $('#calctblId option').each(function () {
                                debugger
                                var txt = $(this).text();
                                if (txt == calctbl[i]) {
                                    $(this).prop('disabled', true);
                                }
                            });
                            renderCalcTable(calctbl[i], refid);

                        }
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("Report with this Ref.NO does not exist!");
                    }
                }
            });
        }
    });

    //update report
    $(document).on("click", "#UpdateReportData", function () {
        debugger;
        var count = 0;
        var model = {};
        var tempname = [];
        var dyntbl = [];
        var clctbl = [];
        $(".tempOptions").each(function () {
            debugger
            if ($(this).prop('disabled') == true) {
                tempname.push($(this).text());
            }
        });
        $(".dynOptions").each(function () {
            debugger
            if ($(this).prop('disabled') == true) {
                dyntbl.push($(this).text());
            }
        });
        $(".calcOptions").each(function () {
            debugger
            if ($(this).prop('disabled') == true) {
                clctbl.push($(this).text());
            }
        });
        model.Agency = $('#agencyId option:selected').val();
        model.Ref2 = $('#Ref2').val();
        model.year = $('#yearId option:selected').val();
        var ag = $('#agencyAbb').val();
        var ref2 = $('#Ref2').val();
        var yr = $('#yearId option:selected').text();
        model.RefId = ag + ref2 + yr;
        model.ReportType = $('#reporttypeId option:selected').val();
        model.Client = $('#headofficeId option:selected').val();
        model.Branch = $('#branchId option:selected').val();
        model.Department = $('#departmentId option:selected').val();
        model.Advocate = $('#advocateId option:selected').val();
        model.Created_Date = $('#date').val();
        model.Templates = JSON.stringify(tempname);
        model.DynamicTable = JSON.stringify(dyntbl);
        model.CalculationTable = JSON.stringify(clctbl);
        if (model.Ref2 == "" || model.year == 0 || model.Agency == 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("REF.No is Required");
        }
        else {
            $.ajax({
                type: "post",
                url: '/Reports/UpdateReport',
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    debugger
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        for (var i = 0; i < tempname.length; i++) {
                            debugger

                            SaveTempData(tempname[i]).done(function (result) {
                                debugger
                                var tempdata = [];
                                var name = result.model.templateName;
                                result.model.templateName = result.model.templateName.split(" ").join("");
                                var tname = result.model.templateName;
                                tname = tname.replace(/[^\w\s]/gi, '');
                                var data = JSON.parse(result.model.templateFormat);
                                if (data != null) {
                                    for (var i = 0; i < data.length; i++) {
                                        var quesid = data[i].ques.split(" ").join("");
                                        quesid = quesid.replace(/[^\w\s]/gi, '');
                                        //${ result.model.templateName + format[i].ques + i }
                                        if (data[i].datatype == 4 || data[i].datatype == 5) {
                                            var ob = {};
                                            ob.ques = data[i].ques;
                                            var ans1 = $(`#${tname + quesid + i} option:selected`).val();
                                            if (ans1 == "") reporterror.push(data[i].ques);
                                            //ob[data[i].ques] = ans1.trim();
                                            ob.ans = ans1;
                                            tempdata.push(ob);
                                        }
                                        else if (data[i].datatype == 6) {
                                            var ob = {};
                                            ob.ques = data[i].ques;
                                            if ($(`#${tname + quesid + i} `).prop('checked') == true) {
                                                //ob[data[i].ques] = true;
                                                ob.ans = true;
                                            }
                                            else {
                                                ob.ans = false;
                                                reporterror.push(data[i].ques);
                                            }

                                            tempdata.push(ob);
                                        }
                                        else {
                                            var ob = {};
                                            ob.ques = data[i].ques;
                                            //ob[data[i].ques] = $(`#${data[i].ques} `).val();
                                            ob.ans = $(`#${tname + quesid + i} `).val();
                                            if (ob.ans == "") reporterror.push(data[i].ques);
                                            tempdata.push(ob);
                                        }
                                    }
                                    var RefNo = model.RefId;
                                    var jsn = JSON.stringify(tempdata);
                                    $.ajax({
                                        type: "post",
                                        url: '/Reports/UpdateTempData',
                                        dataType: "json",
                                        data: { name, jsn, RefNo },
                                        aysnc: false,
                                        success: function (result) {
                                            debugger
                                            if (result.status == true) {
                                                alertify.set('notifier', 'position', 'top-right');
                                                alertify.success(result.message);
                                                tempdata = [];
                                            }
                                            else {
                                                alertify.set('notifier', 'position', 'top-right');
                                                alertify.error(result.message);
                                                tempdata = [];
                                            }
                                        }
                                    });
                                    console.log(tempdata);
                                }
                            });

                        }
                        for (var i = 0; i < dyntbl.length; i++) {
                            var dyndata = []
                            saveDynamicTable(dyntbl[i]).done(function (result) {
                                debugger
                                var format = JSON.parse(result.model.tableFormat);
                                //console.log(format);
                                //data = format;
                                //tabelName = result.model.tableName;
                                var name = result.model.tableName;
                                var tblname = result.model.tableName.replace(/[^\w\s]/gi, '');
                                tblname = result.model.tableName.split(" ").join("");
                                var tbllength = Object.keys(format).length;
                                var ob = {};
                                for (var it = 0; it < tbllength; it++) {
                                    var tblid = "table" + it;
                                    for (var i = 0; i < format[tblid].length; i++) {

                                        for (var j = 0; j < format[tblid][i].length; j++) {

                                            var dynid = tblname + it + i + j;
                                            var val = $(`#dyn${dynid}`).val();
                                            ob[dynid] = val;

                                        }
                                    }
                                }
                                dyndata.push(ob);
                                var RefNo = model.RefId;
                                var jsn = JSON.stringify(dyndata)
                                $.ajax({
                                    type: "post",
                                    url: '/Reports/SaveDynamicTableData',
                                    dataType: "json",
                                    data: { name, jsn, RefNo },
                                    aysnc: false,
                                    success: function (result) {
                                        debugger
                                        if (result.status == true) {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.success(result.message);
                                            dyndata = [];
                                            ob = {};
                                        }
                                        else {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.error(result.message);
                                            dyndata = [];
                                            ob = {};
                                        }
                                    }
                                });
                            });


                        }
                        for (var i = 0; i < clctbl.length; i++) {
                            debugger
                            var caldata = []
                            saveCalcTable(clctbl[i]).done(function (result) {
                                var format = JSON.parse(result.model.calcFormat);
                                console.log(format);
                                //data = format;
                                //caltableName = result.model.calcName;
                                var name = result.model.calcName;
                                var tblname = result.model.calcName.replace(/[^\w\s]/gi, '');
                                tblname = result.model.calcName.split(" ").join("");
                                var ob2 = {};
                                for (var i = 0; i < format.length; i++) {

                                    for (var j = 0; j < format[i].length; j++) {

                                        var dynid = tblname + i + j;
                                        var val = $(`#cal${dynid}`).val();
                                        ob2[dynid] = val;

                                    }
                                }
                                caldata.push(ob2);
                                var RefNo = model.RefId;
                                var jsn = JSON.stringify(caldata)
                                $.ajax({
                                    type: "post",
                                    url: '/Reports/SaveCalcTableData',
                                    dataType: "json",
                                    data: { name, jsn, RefNo },
                                    aysnc: false,
                                    success: function (result) {
                                        debugger
                                        if (result.status == true) {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.success(result.message);
                                            caldata = [];
                                            ob2 = {};
                                        }
                                        else {
                                            alertify.set('notifier', 'position', 'top-right');
                                            alertify.error(result.message);
                                            caldata = [];
                                            ob2 = {};
                                        }
                                    }
                                });
                            });
                        }
                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error(result.message);
                    }
                }
            });
        }
    });

    //delete report
    $(document).on("click", "#deleteReport", function () {
        debugger
        var agency = $('#searchagency option:selected').text();
        var ref2 = $('#SearchRef2').val();
        var year = $('#Searchyear option:selected').text();
        var RefId = agency + ref2 + year;
        if (agency == 0 || ref2 == "" || year == 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("REF.No is Required");
        }
        else {
            swal({
                title: "Are you sure?",
                text: "Once Delete the Report,All Your Data will be deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    debugger;
                    if (willDelete) {
                        $.ajax({
                            type: "post",
                            url: '/Reports/DeleteReport',
                            dataType: "json",
                            data: { RefId },
                            aysnc: false,
                            success: function (result) {
                                debugger;
                                if (result.status == true) {

                                    swal(result.message, {
                                        icon: "success",
                                    });
                                }
                                else {
                                    swal(result.message, {
                                        icon: "error",
                                    });
                                }
                            },

                        });
                    } else {
                        swal("Report is not Deleted, Your Data is Safe", {
                            icon: "success",
                        });
                    }
                });
        }

    });
    //print report
    $(document).on("click", "#printreport", function () {
        debugger
        var agency = $('#searchagency option:selected').text();
        var ref2 = $('#SearchRef2').val();
        var year = $('#Searchyear option:selected').text();
        var Id = agency + ref2 + year;
        if (agency == 0 || ref2 == "" || year == 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("REF.No is Required");
        }
        else {
            //var url ='/Reports/PrintReport';
            var RefId = Id;
            //var url = '@Url.Action("PrintReport", "Reports", new { RefId = "__id__" })';&amount=${id_amount}
            window.location = "Reports/PrintReport/" + `?RefId=${RefId}`;

            //$.post('/Reports/PrintReport/' + RefId, function (result) {
            //    // Do something with the result like for example inject it into
            //    // some placeholder and update the DOM.
            //    // This obviously assumes that your controller action returns
            //    // a partial view otherwise you will break your markup
            //});
            /*  window.location = "Reports/PrintReport/" + RefId;*/
            //$.ajax({
            //    type: "post",
            //    url: '/Reports/PrintReport',
            //    dataType: "json",
            //    data: { RefId },
            //    aysnc: false,
            //    success: function (result) {
            //        debugger;
            //        if (result.status == true) {

            //            swal(result.message, {
            //                icon: "success",
            //            });
            //        }
            //        else {
            //            swal(result.message, {
            //                icon: "error",
            //            });
            //        }
            //    },

            //});
        }
    });

    //dynamic Table 
    var tableName;
    $(document).on("change", "#dynamicTableId", function () {
        debugger;
        var name = $(this).find(':selected').text();
        renderDynamicTable(name);
        var key = "dyn" + d;
        sequence[key] = name;
        d++;
        $(this).find(':selected').attr("disabled", "disabled");
    });
    function renderDynamicTable(name, refId) {
        $.ajax({
            type: "post",
            url: '/Reports/RenderDynaimcTable',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {
                debugger
                if (result.model != null) {
                    var format = JSON.parse(result.model.tableFormat);
                    console.log(format);
                    //data = format;
                    tabelName = result.model.tableName;
                    var Border = result.model.border;
                    var tblname = result.model.tableName.replace(/[^\w\s]/gi, '');
                    tblname = tblname.split(" ").join("");
                    $('.temp').append(`
                    <section class="templates" id="${tblname}">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">${tblname}</div>
                    <div class="card-body">
                        <form name="my-form" class="${tblname}">
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
                `);
                    var tbllength = Object.keys(format).length;
                    for (var it = 0; it < tbllength; it++) {
                        var tblid = "table" + it;
                        var table_body = `<table id="" class="table tbl">`;
                        for (var i = 0; i < format[tblid].length; i++) {
                            table_body += `<tr>`;
                            for (var j = 0; j < format[tblid][i].length; j++) {
                                var dynid = tblname + it + i + j;
                                if (format[tblid][i][j].datatype == '0') {
                                    table_body += `<td class=""  colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%">`;
                                    if (format[tblid][i][j].cSet == true) {
                                        table_body += `<p>`
                                        for (var kt = 0; kt < conclusionStes.length; kt++) {
                                            table_body += `${conclusionStes[kt].Name} <input type="checkbox" name="${conclusionStes[kt].Name}" Id="" class="setChecks">  `
                                        }
                                        table_body += `</p>`
                                    }
                                    table_body += `<input type="text" id="dyn${dynid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '1') {
                                    table_body += `<td class="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%">`;
                                    if (format[tblid][i][j].cSet == true) {
                                        table_body += `<p>`
                                        for (var kt = 0; kt < conclusionStes.length; kt++) {
                                            table_body += `${conclusionStes[kt].Name} <input type="checkbox" name="${conclusionStes[kt].Name}" Id="" class="setChecks">   `
                                        }
                                        table_body += `</p>`
                                    }
                                    table_body += `<textarea class="form-control" id="dyn${dynid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '2') {
                                    table_body += `<td class=""  colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%">`;
                                    table_body += `<input type="date" id="dyn${dynid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '3') {
                                    table_body += `<td class=""  colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%">`;
                                    table_body += `<input type="checkbox" id="dyn${dynid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily}'  value="${format[tblid][i][j].value}" class="form-check"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '4') {
                                    table_body += `<td class="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%">`;
                                    table_body += `<input type="number" id="dyn${dynid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '5') {
                                    table_body += `<td class=""  colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%">`;
                                    table_body += `<input type="text" id="dyn${dynid}" list="list2${dynid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control">
                                               <datalist id="list2${dynid}">
                                        </datalist>`;

                                    //for (var it = 0; it < format[i][j].options.length; it++) {
                                    //    debugger
                                    //    //var dt = $(`#list${dynid}`);
                                    //    //$(`#list${dynid}`).append(`<option value="${format[i][j].options[it]}"></option>`)
                                    //    $(`#list2${dynid}`).append(`<option value="${format[i][j].options[it]}"></option>`);
                                    //    console.log(`list2${dynid}`);
                                    //}
                                    //$.each(format[i][j].options, function (i, item) {
                                    //    debugger
                                    //    $(`#list2${dynid}`).append(`<option value="${item}">${item}</option>`);
                                    //});
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '6') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%">`;
                                    table_body += `<input type="file" id="dyn${dynid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += `<a class="btn btn-success" id="fileUpload">Upload</a>`;
                                    table_body += '</td>';
                                }
                            }
                            table_body += '</tr>';
                        }
                        table_body += '</table>';
                        $(`.${tblname}`).append(table_body);


                    }
                    if (Border == "0") {
                        //$(`.${tblname}`).css("border", "1px solid black");
                        $(`.tbl tr`).css("border", "1px solid black");
                        $(`.tbl td`).css("border", "1px solid black");
                    }
                    else if (Border == "1") {
                        // $(`.${tblname}`).css("border-right", "1px solid black");
                        $(`.tbl tr`).css("border-right", "1px solid black");
                        $(`.tbl td`).css("border-right", "1px solid black");
                    }
                    else if (Border == "2") {
                        // $(`.${tblname}`).css("border-left", "1px solid black");
                        $(`.tbl tr`).css("border-left", "1px solid black");
                        $(`.tbl td`).css("border-left", "1px solid black");
                    }
                    else if (Border == "3") {
                        //$(`.${tblname}`).css("border-top", "1px solid black");
                        $(`.tbl tr`).css("border-top", "1px solid black");
                        $(`.tbl td`).css("border-top", "1px solid black");

                    }
                    else if (Border == "4") {
                        //$(`.${tblname}`).css("border-bottom", "1px solid black");
                        $(`.tbl tr`).css("border-bottom", "1px solid black");
                        $(`.tbl td`).css("border-bottom", "1px solid black");
                    }
                    for (var it = 0; it < tbllength; it++) {
                        var tblid = "table" + it;
                        for (var i = 0; i < format[tblid].length; i++) {
                            for (var j = 0; j < format[tblid][i].length; j++) {
                                debugger
                                var dynid = tblname + it + i + j;
                                if (format[tblid][i][j].datatype == '5') {
                                    $.each(format[tblid][i][j].options, function (i, item) {
                                        debugger
                                        $(`#list2${dynid}`).append(`<option value="${item}"></option>`);
                                    });
                                }
                            }
                        }
                    }

                    //var name = TempName;
                    if (refId != "0") {
                        $.ajax({
                            type: "post",
                            url: '/Reports/GetTempDataByReportId',
                            dataType: "json",
                            data: { name, refId },
                            aysnc: false,
                            success: function (result) {
                                debugger
                                //var model = JSON.parse(result.tempModel);
                                if (result.model != null) {
                                    var i = 0;
                                    delete result.model["_id"];
                                    delete result.model["ReportId"];
                                    var d = JSON.parse(result.model["Data"]);
                                    var _tblname = name;
                                    _tblname = _tblname.replace(/[^\w\s]/gi, '');
                                    _tblname = _tblname.split(" ").join("");
                                    //var tbllength = Object.keys(d).length;
                                    for (var it = 0; it < tbllength; it++) {
                                        var tblid = "table" + it;
                                        //for (var i = 0; i < d.length; i++) {
                                        for (var j = 0; j < format[tblid].length; j++) {
                                            for (var k = 0; k < format[tblid][i].length; k++) {
                                                var _id = _tblname + it + j + k;
                                                var _val = d[0][_id];
                                                $(`#dyn${_id}`).val(_val);
                                            }
                                        }
                                        //}
                                    }

                                    console.log(d);
                                }

                            }
                        });
                    }
                }
            }
        });
    }
    $(document).on("click", "#fileUpload", function () {
        debugger;
        var file1 = $(this).prev();
        var file = file1[0].files[0];

        var datafile = new FormData();

        console.log(file);
        datafile.append("File", file);
        $.ajax({
            url: '/Reports/uploadimg',
            type: "post",
            data: datafile,
            processData: false,
            contentType: false,
            success: function (result) {
                debugger

                if (result.status) {
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
    function saveDynamicTable(name) {
        var data = [];

        try {
            return $.ajax({
                type: "post",
                url: '/Reports/RenderDynaimcTable',
                dataType: "json",
                data: { name },
                aysnc: false,
                success: function (result) {
                    debugger

                }
            });
        }
        catch (error) {
            alert(error);
        }
    }


    //calculation table
    var caltableName;
    EditGlobal = [];
    var EditTempName = [];
    var calNo = 0;
    $(document).on("change", "#calctblId", function () {
        debugger;
        var name = $(this).find(':selected').text();
        renderCalcTable(name);
        var key = "calc" + c;
        sequence[key] = name;
        c++;
        $(this).find(':selected').attr("disabled", "disabled");
    });
    function renderCalcTable(name, refId) {
        $.ajax({
            type: "post",
            url: '/Reports/RenderCalcTable',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {
                debugger
                if (result.model != null) {
                    var format = JSON.parse(result.model.calcFormat);
                    console.log(format);
                    EditGlobal.push(format);
                    caltableName = result.model.calcName;
                    var Border = result.model.border;
                    var tblname = result.model.calcName.replace(/[^\w\s]/gi, '');
                    tblname = tblname.split(" ").join("");
                    EditTempName.push(tblname);
                    $('.temp').append(`
                    <section class="templates" id="${tblname}">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">${tblname}</div>
                    <div class="card-body">
                        
                        <br>
                        <form name="my-form" class="${tblname}">
                        <br>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
                `);
                    var no_rows = format.length;
                    var no_cols = [];
                    var tbllength = Object.keys(format).length;
                    var tblNo = (tbllength - 1)
                    var row_no = "" + tblNo + (format["table" + tblNo].length - 1);
                    for (var it = 0; it < tbllength; it++) {
                        var tblid = "table" + it;
                        var table_body = `<table id="" class="table tbl" style="border-collapse:collapse; margin-bottom:0;">`;
                        for (var i = 0; i < format[tblid].length; i++) {
                            table_body += `<tr>`;
                            var rowcount = "" + it + i;
                            for (var j = 0; j < format[tblid][i].length; j++) {
                                no_cols.push(format[tblid][i].length);
                                var calid = tblname + it + i + j;
                                if (format[tblid][i][j].datatype == '0') {
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder}:1px solid black;">`;
                                    table_body += `<input type="text" id="calc${calid}" rowNo="${i}" colNo="${j}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' value="${format[tblid][i][j].value}" class="form-control"> `;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '1') {
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder}:1px solid black;">`;
                                    table_body += `<textarea class="form-control" id="calc${calid}" colNo="${j}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '2') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder}:1px solid black;">`;
                                    table_body += `<input type="date" id="calc${calid}" colNo="${j}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '3') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder}:1px solid black;">`;
                                    table_body += `<input type="checkbox" id="calc${calid}" colNo="${j}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-check"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '4') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder}:1px solid black;">`;
                                    table_body += `<input type="number" id="calc${calid}" colNo="${j}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    if (row_no == rowcount) {
                                        table_body += `<input type="checkbox" class="checksum" calNo="${calNo}">`
                                        if (result.model.billType == "0") {
                                            table_body += `  <select aria-label="Server" class="form-control" id="calcCategory">
                                        <option value="select" disabled selected>Select Category</option>
                                        <option value="0">Verified</option>
                                        <option value="1">Part of Final Bill/ Duplicate</option>
                                        <option value="2">Paid by TPA</option>
                                        <option value="3">Denided to Verify</option>
                                        <option value="4">Shop Closed/ Shifted</option>
                                        <option value="5">Total Bill</option>
                                        </select>`
                                        }

                                    }
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '5') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder}:1px solid black;">`;
                                    table_body += `<input type="text" id="calc${calid}" colNo="${j}" list="list2${calid}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control">
                                                   <button type="button" class="btn btn-info" id="editCalcbtndrp">+</button>
                                               <datalist id="list2${calid}">
                                        </datalist>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '6') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder}:1px solid black;">`;
                                    table_body += `<input type="file" id="calc${calid}" colNo="${j}" style='color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                            }
                            table_body += '</tr>';
                        }
                        table_body += '</table>';
                        $(`.${tblname}`).append(table_body);
                    }
                    calNo++;

                    if (Border == "0") {
                        // $(`.${tblname}`).css("border", "1px solid black");
                        $(`.tbl tr`).css("border", "1px solid black");
                        $(`.tbl td`).css("border", "1px solid black");
                    }
                    else if (Border == "1") {
                        //$(`.${tblname}`).css("border-right", "1px solid black");
                        $(`.tbl tr`).css("border-right", "1px solid black");
                        $(`.tbl td`).css("border-right", "1px solid black");
                    }
                    else if (Border == "2") {
                        //$(`.${tblname}`).css("border-left", "1px solid black");
                        $(`.tbl tr`).css("border-left", "1px solid black");
                        $(`.tbl td`).css("border-left", "1px solid black");
                    }
                    else if (Border == "3") {
                        //$(`.${tblname}`).css("border-top", "1px solid black");
                        $(`.tbl tr`).css("border-top", "1px solid black");
                        $(`.tbl td`).css("border-top", "1px solid black");

                    }
                    else if (Border == "4") {
                        //$(`.${tblname}`).css("border-bottom", "1px solid black");
                        $(`.tbl tr`).css("border-bottom", "1px solid black");
                        $(`.tbl td`).css("border-bottom", "1px solid black");
                    }

                    if (refId != "0") {
                        $.ajax({
                            type: "post",
                            url: '/Reports/GetTempDataByReportId',
                            dataType: "json",
                            data: { name, refId },
                            aysnc: false,
                            success: function (result) {
                                debugger
                                //var model = JSON.parse(result.tempModel);
                                if (result.model != null) {
                                    var i = 0;
                                    delete result.model["_id"];
                                    delete result.model["ReportId"];
                                    var d = JSON.parse(result.model["Data"]);
                                    var _tblname = name;
                                    _tblname = _tblname.replace(/[^\w\s]/gi, '');
                                    _tblname = _tblname.split(" ").join("");
                                    for (var i = 0; i < d.length; i++) {
                                        for (var j = 0; j < format.length; j++) {
                                            for (var k = 0; k < format[i].length; k++) {
                                                var _id = _tblname + j + k;
                                                var _val = d[i][_id];
                                                $(`#cal${_id}`).val(_val);
                                            }
                                        }
                                    }
                                    console.log(d);
                                }

                            }
                        });
                    }
                }
            }
        });
        //console.log(EditGlobal);
    }

    $(document).on("change", ".checksum", function () {
        debugger
        var col = $(this).siblings().attr("colno");
        var calNo = $(this).attr("calNo");
        if ($(this).prop('checked')) {
            var tbllength = Object.keys(EditGlobal[calNo]).length;
            var sum = 0;
            for (var k = 0; k < tbllength; k++) {
                debugger
                var tblid = "table" + k;
                for (var i = 0; i < EditGlobal[calNo][tblid].length; i++) {
                    //for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = "calc" + EditTempName[calNo] + k + i + col;

                    var val = $(`#${dynid}`).val();
                    if (val != "")
                        sum = sum + parseInt(val);


                    //}
                }
            }
            $(this).prev().val(sum);
        }
        else {
            $(this).prev().val("");
        }

    });
    function saveCalcTable(name) {
        var data = [];

        try {
            return $.ajax({
                type: "post",
                url: '/Reports/RenderCalcTable',
                dataType: "json",
                data: { name },
                aysnc: false,
                success: function (result) {
                    debugger

                }
            });
        }
        catch (error) {
            alert(error);
        }
    }
    $(document).on("change", ".setChecks", function () {
        debugger
        var name = $(this).attr("name");
        var t = $(this);
        if ($(this).prop("checked") == true) {
            var id;
            $(this).parents().next().val("");
            $(this).siblings().prop('checked', false);
            for (var i = 0; i < conclusionStes.length; i++) {
                if (name == conclusionStes[i].Name) {
                    id = conclusionStes[i].Id;
                }
            }
            $.ajax({
                type: "post",
                url: '/Reports/GetConclusionSetByName',
                dataType: "json",
                data: { name },
                aysnc: false,
                success: function (result) {
                    debugger;
                    if (result.model != null) {

                        var s = "";
                        for (var i = 0; i < result.model.conclusionSets.length; i++) {
                            s = s + " " + result.model.conclusionSets[i];
                            //t.parents().next().val(result.model.conclusionSets[i]);

                        }
                        t.parents().next().val(s);

                        //console.log(conclusionStes);
                    }
                }
            });


        }
        else {
            $(this).parents().next().val("");
        }

    });
});

//conclusionsets
