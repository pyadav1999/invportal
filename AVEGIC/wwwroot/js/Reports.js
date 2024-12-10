﻿$(document).ready(function () {
    var reporterror = [];
    $('#searchDiv').hide();
    //if ($('#agencyId').find(':selected').val() == 0) {
    $('.update-btns').hide();
    $('.savebtn').hide();
    //$('.refId').hide();
    $('.reportType').hide();
    $('.temp').hide();

    // }
    //else {
    //    $('.update-btns').hide();
    //    $('.savebtn').show();
    //    $('.refId').show();
    //    $('.reportType').show();
    //}
    $('.templates').hide();
    $('.SaveTemplateData').hide();
    $(document).on("change", "#agencyId", function () {

        var id = $(this).val();
        var name = $('#agencyId option:selected').text();
        if (id != 0) {
            // $('.update-btns').hide();
            // $('.savebtn').show();
            // $('.refId').show();
            // $('.reportType').show();
            $('#agencyAbb').val(name);
            //$.ajax({
            //    type: "post",
            //    url: '/Admin/GetAgencyById',
            //    //contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: { id },

            //    aysnc: false,
            //    success: function (result) {
            //         
            //        if (result.status == true) {
            //        }

            //    },

            //});
        }
        else {
            // $('.savebtn').hide();
            // $('.refId').hide();
            // $('.reportType').hide();
        }

    });
    $(document).on("change", "#headofficeId", function (event, branchId) {

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


    //reportNextButton
    $(document).on("click", "#reportNext", function () {
        var model = {};
        model.Agency = $('#agencyId option:selected').val();
        model.Ref2 = $('#Ref2').val();
        model.year = $('#yearId option:selected').val();
        var ag = $('#agencyAbb').val();
        var ref2 = $('#Ref2').val();
        var yr = $('#yearId option:selected').text();
        model.RefId = ag + ref2 + yr;
        model.ReportType = $('#reporttypeId option:selected').val();
        if (model.Ref2 == "" || model.year == 0 || model.Agency == 0) {
            alertify.set('notifier', 'position', 'top-right');
            alertify.error("REF.No is Required");
        }
        else {
            $('.update-btns').hide();
            $('.savebtn').show();
            $('.refId').show();
            $('.reportType').show();
            //$('.reportAction').hide();
            $('.temp').show();
            $(this).hide();
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
            ;
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
        ;
        var name = $(this).find(':selected').text();
        renderTemplate(name, 0, 1);
        var key = "temp" + t;
        sequence[key] = name;
        t++;
        $(this).find(':selected').attr("disabled", "disabled");
    });

    async function renderTemplate(name, refId, order) {
        $.ajax({
            type: "post",
            url: '/Reports/RenderTemplate',
            dataType: "json",
            data: { name },
            aysnc: true,
            success: function (result) {
                ;
                if (result.model != null) {
                    var format = JSON.parse(result.model.templateFormat);
                    data = format;
                    TempName = result.model.templateName;
                    var Border = result.model.border;
                    //TempName = TempName.replace(" ", "");
                    result.model.templateName = result.model.templateName.replace(/[^\w\s]/gi, '');
                    result.model.templateName = result.model.templateName.split(" ").join("");
                    $('.temp').append(`
                    <section class="templates order-${order}" id="${result.model.templateName}">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-right"><a class="removeTemplates" href="javascript:void(0)"  name="${result.model.templateName}" style="color:red;text-decoration:none;cursor:pointer">X</a></div>
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

                                //var model = JSON.parse(result.tempModel);
                                if (result.model != null) {
                                    var i = 0;
                                    delete result.model["_id"];
                                    delete result.model["ReportId"];
                                    $.each(result.model, function (index, value) {

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

    $(document).on("change", "#reportTypeHeadofficeId", function () {
        var headOfficeId = $("#reportTypeHeadofficeId option:selected").val().trim();
        var departmentId = $("#reportTypeDepartmentId option:selected").val().trim();
        $.ajax({
            type: "post",
            url: '/Reports/BindReportType',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { headOfficeId, departmentId },

            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    $("#reporttypeId").empty();
                    $(`#reporttypeId`).append(`<option value="0">Select &#9662;</option>`);
                    var model = JSON.parse(result.model);
                    for (var i = 0; i < model.length; i++) {
                        var ob = model[i].Id;
                        var optionValue = String(ob);
                        var optionText = model[i].Name;
                        if (model[i].IsDeleted == false) {
                            $(`#reporttypeId`).append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                        }
                    }
                }
            },

        });
    });

    $(document).on("change", "#reportTypeDepartmentId", function () {
        var headOfficeId = $("#reportTypeHeadofficeId option:selected").val().trim();
        var departmentId = $("#reportTypeDepartmentId option:selected").val().trim();
        $.ajax({
            type: "post",
            url: '/Reports/BindReportType',
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: { headOfficeId, departmentId },

            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    $("#reporttypeId").empty();
                    $(`#reporttypeId`).append(`<option value="0">Select &#9662;</option>`);
                    var model = JSON.parse(result.model);
                    for (var i = 0; i < model.length; i++) {
                        var ob = model[i].Id;
                        var optionValue = String(ob);
                        var optionText = model[i].Name;
                        if (model[i].IsDeleted == false) {
                            $(`#reporttypeId`).append(`<option value="${optionValue}">
                                   ${optionText}
                              </option>`);
                        }
                    }
                }
            },

        });
    });
    var reporttemp = [];
    $(document).on("change", "#reporttypeId", function () {
        console.log("calling");
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

                    if (result.status == true) {
                        //$('#reportType').val(result.model.name);
                        var seq = JSON.parse(result.model.sequence);
                        console.log(seq);
                        var order = 1;
                        for (var key in seq) {
                            if (key[0] == 't') {
                                localStorage.setItem("type", seq[key]);
                                renderTemplate(seq[key], 0, order);
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
                                order++;
                            }
                            if (key[0] == 'd') {
                                localStorage.setItem("type", seq[key]);
                                renderDynamicTable(seq[key], 0, order);
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
                                order++;
                            }

                            if (key[0] == 'c') {
                                renderCalcTable(seq[key], 0, order);
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
                                order++;
                            }
                        }
                        //var type = JSON.parse(result.model.templates);
                        //for (var i = 0; i < type.length; i++) {
                        //     

                        //}
                        //var type2 = JSON.parse(result.model.dynamicTables);
                        //localStorage.setItem("type", type2);
                        //for (var i = 0; i < type2.length; i++) {
                        //     
                        //    renderDynamicTable(type2[i], 0);
                        //    reporttemp.push(type2[i]);
                        //    sequence.push(type2[i]);
                        //    $('#templateId option').each(function () {
                        //         
                        //        var txt = $(this).text();
                        //        if (txt == type2[i]) {
                        //            $(this).prop('disabled', true);
                        //        }
                        //    });
                        //}
                        //var type3 = JSON.parse(result.model.clacTables);
                        //localStorage.setItem("type", type3);
                        //for (var i = 0; i < type3.length; i++) {
                        //     
                        //    renderCalcTable(type3[i], 0);
                        //    reporttemp.push(type3[i]);
                        //    sequence.push(type3[i]);
                        //    $('#templateId option').each(function () {
                        //         
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


                }
            });
        }
        catch (error) {
            alert(error);
        }


    }

    //save report
    $(document).on("click", "#SubmitReportData", function () {
        var count = 0;
        var model = {};
        var tempname = [];
        var dyntbl = [];
        var clctbl = [];
        $(".tempOptions").each(function () {
            // 
            if ($(this).prop('disabled') == true) {
                tempname.push($(this).text());
            }
        });
        $(".dynOptions").each(function () { 
            if ($(this).prop('disabled') == true) {
                dyntbl.push($(this).text());
            }
        });
        $(".calcOptions").each(function () {
            // 
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
                     
                    if (result.status == true) {

                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        sequence = [];
                        t = 0;
                        d = 0;
                        c = 0;
                        $('.templates').show();
                        for (var i = 0; i < tempname.length; i++) {


                            SaveTempData(tempname[i]).done(function (result) {

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

                            saveDynamicTable(dyntbl[i]).done(function (result) {
                                 

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
                                            var cell = format[tblid][i][j];
                                            var dynid = tblname + it + i + j;
                                            if (cell.datatype == '7') {
                                                dynid = "state" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '8') {
                                                dynid = "district" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '9') {
                                                dynid = "police" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '10') {
                                                dynid = "agency" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '11') {
                                                var state = $(`#state${dynid} option:selected`).text().trim();
                                                var district = $(`#district${dynid} option:selected`).text().trim();
                                                var branch = $(`#branch${dynid} option:selected`).text().trim();
                                                var address = $(`#dyn${dynid}`).val().trim();
                                                var val = state + "#" + district + "#" + branch+"#"+ address;
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '14') {
                                                var head = $(`#head${dynid} option:selected`).text();
                                                ob[dynid] = head;
                                            }
                                            else if (cell.datatype == '15') {
                                                var av = $(`#av${dynid} option:selected`).text();
                                                var year = $(`#year${dynid} option:selected`).text();
                                                var ref = $(`#dyn${dynid}`).val();
                                                var val = av + "/" + ref + "/" + year;
                                                ob[dynid] = val;
                                            }
                                            else {
                                                var val = $(`#dyn${dynid}`).val();
                                                ob[dynid] = val;
                                            }


                                        }
                                    }
                                }
                                var dyndata = [];
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
                                var caldata = [];
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
    var globalDynOrder = 1;
    $('.actionDivbtn').on("click", function () {
        $('#searchDiv').show();
    });
    $(document).on("click", "#closeSearchdiv", function () {
        $('#searchDiv').hide();
    });
    $(document).on("click", "#searchReport", function () {
         
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

                    if (result.model != null) {
                         
                        $('.temp').empty();
                        $('#reportNext').hide();
                        $('.refId').show();
                        $('.reportAction').show();
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
                        $(`#departmentId`).val(data.department).prop('selected', true);
                        $(`#advocateId`).val(data.advocate).prop('selected', true);
                        $('#date').val(data.created_Date);
                        var refid = data.refId;
                        var seq = JSON.parse(result.model.sequence);
                        var rt = 0, rd = 0, rc = 0;
                        var order = 1;
                        for (var key in seq) {
                            if (key[0] == 't') {
                                localStorage.setItem("type", seq[key]);
                                renderTemplate(seq[key], refid, order);
                                //reporttemp.push(seq[key]);
                                var key = "temp" + rt;
                                sequence[key] = seq[key];
                                rt++;
                                order++;
                                $('#templateId option').each(function () {

                                    var txt = $(this).text();
                                    if (txt == seq[key]) {
                                        $(this).prop('disabled', true);
                                    }
                                });
                            }
                            if (key[0] == 'd') {
                                 ;
                                localStorage.setItem("type", seq[key]);
                                renderDynamicTable(seq[key], refid, order);
                                //reporttemp.push(seq[key]);
                                var key = "dyn" + rd;
                                sequence[key] = seq[key];
                                rd++;
                                order++;
                                $('#dynamicTableId option').each(function () {
                                    var txt = $(this).text();
                                    if (txt == seq[key]) {
                                        $(this).prop('disabled', true);
                                    }
                                });
                                globalDynOrder = order;
                            }
                            if (key[0] == 'c') {
                                renderCalcTable(seq[key], refid, order);
                                //reporttemp.push(seq[key]);
                                var key = "calc" + rc;
                                sequence[key] = seq[key];
                                rc++;
                                order++;
                                $('#calctblId option').each(function () {

                                    var txt = $(this).text();
                                    if (txt == seq[key]) {
                                        $(this).prop('disabled', true);
                                    }
                                });
                            }
                        }
                        t = rt; d = rd; c = rc;
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
         ;
        var count = 0;
        var model = {};
        var tempname = [];
        var dyntbl = [];
        var clctbl = [];
        $(".tempOptions").each(function () {
            // 
            if ($(this).prop('disabled') == true) {
                tempname.push($(this).text());
            }
        });
        $(".dynOptions").each(function () {
            //  
            if ($(this).prop('disabled') == true) {
                dyntbl.push($(this).text());
            }
        });
        $(".calcOptions").each(function () {
            //  
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
        model.Sequence = JSON.stringify(sequence);
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
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
                        for (var i = 0; i < tempname.length; i++) {
                            SaveTempData(tempname[i]).done(function (result) {

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
                            saveDynamicTable(dyntbl[i]).done(function (result) {

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
                                            var cell = format[tblid][i][j];
                                            if (cell.datatype == '7') {
                                                dynid = "state" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '8') {
                                                dynid = "district" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '9') {
                                                dynid = "police" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '10') {
                                                dynid = "agency" + dynid;
                                                var val = $(`#${dynid} option:selected`).text();
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '11') {
                                                var state = $(`#state${dynid} option:selected`).text().trim();
                                                var district = $(`#district${dynid} option:selected`).text().trim();
                                                var branch = $(`#branch${dynid} option:selected`).text().trim();
                                                var address = $(`#dyn${dynid}`).val().trim();
                                                var val = state + "#" + district + "#" + branch + "#" + address;
                                                ob[dynid] = val;
                                            }
                                            else if (cell.datatype == '14') {
                                                var head = $(`#head${dynid} option:selected`).text();
                                                ob[dynid] = head;
                                            }
                                            else if (cell.datatype == '15') {
                                                var av = $(`#av${dynid} option:selected`).text();
                                                var year = $(`#year${dynid} option:selected`).text();
                                                var ref = $(`#dyn${dynid}`).val();
                                                var val = av + "/" + ref + "/" + year;
                                                ob[dynid] = val;
                                            }
                                            else {
                                                var val = $(`#dyn${dynid}`).val();
                                                ob[dynid] = val;
                                            }

                                        }
                                    }
                                }
                                var dyndata = [];
                                dyndata.push(ob);
                                var RefNo = model.RefId;
                                var jsn = JSON.stringify(dyndata)
                                $.ajax({
                                    type: "post",
                                    url: '/Reports/UpdateDynTblData',
                                    dataType: "json",
                                    data: { name, jsn, RefNo },
                                    aysnc: false,
                                    success: function (result) {

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
                                var caldata = [];
                                caldata.push(ob2);
                                var RefNo = model.RefId;
                                var jsn = JSON.stringify(caldata)
                                $.ajax({
                                    type: "post",
                                    url: '/Reports/UpdateDynTblData',
                                    dataType: "json",
                                    data: { name, jsn, RefNo },
                                    aysnc: false,
                                    success: function (result) {

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
                    ;
                    if (willDelete) {
                        $.ajax({
                            type: "post",
                            url: '/Reports/DeleteReport',
                            dataType: "json",
                            data: { RefId },
                            aysnc: false,
                            success: function (result) {
                                ;
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
            //         ;
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
    function getStates() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllStates',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {



            },

        }).catch(function (timeout) { });
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
    $(document).on("change", "#dynamicTableId", function () {
        var name = $(this).find(':selected').text();

        renderDynamicTable(name, 0, globalDynOrder);

        var key = "dyn" + d;

        sequence[key] = name;
        d++;
        $(this).find(':selected').attr("disabled", "disabled");
    });
    async function renderDynamicTable(name, refId, order) {
         
        const [statel, agencyr, insurerr, headres, yearres, advocateres, departmentres] = await Promise.all([
            getStates(),
            getAgency(),
            getInsurer(),
            getHeadoffice(),
            getYear(),
            getAdvocate(),
            getDepartment()
        ]);
        const statelist = JSON.parse(statel.json);
        const insurerlist = JSON.parse(insurerr.json);
        const headlist = JSON.parse(headres.json);
        const yearlist = JSON.parse(yearres.json);
        const advocatelist = JSON.parse(advocateres.json);
        const departmentlist = JSON.parse(departmentres.json);
        const result = await $.ajax({
            type: "POST",
            url: '/Reports/RenderDynaimcTable',
            dataType: "json",
            data: { name },
            async: true
        });
        if (!result || !result.model) return; // Exit if no data
        TempName = result.model.tableName;
        const format = JSON.parse(result.model.tableFormat);
        const tableName = result.model.tableName.replace(/[^\w\s]/gi, '').split(" ").join("");
        const Border = result.model.border;
        const tableOrder =order;
        const sectionTemplate = `
            <section class="templates d-flex flex-columns" id="${tableName}" style="order:${order}!important;">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header d-flex justify-content-between w-100">
                                    <p class="removeTemplates" name="${tableName}" style="color:red;text-decoration:none;cursor:pointer">X</p>
                                </div>
                                <div class="card-body">
                                    <form name="my-form">
                                        <fieldset class="${tableName}"></fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
        $('.temp').append(sectionTemplate);
        if (tableName.length > 11) {
            var res1 = result.model.tableName.substring(0, 10);
            if (res1.toLowerCase() == "letterhead") {
                $(`.${tableName}`).attr("disabled", "disabled");
            }
        }
        if (tableName.length > 15) {
            var res2 = result.model.tableName.substring(0, 14);
            if (res2.toLowerCase() == "billletterhead") {
                $(`.${tableName}`).attr("disabled", "disabled");
            }
        }
        let tableHtml = '';
        var tbllength = Object.keys(format).length;

        for (var it = 0; it < tbllength; it++) {
            var tblid = "table" + it;
            var table_body = `<table id="" class="table tbl" style="border-collapse:collapse; margin-bottom:0;">`;

            for (var i = 0; i < format[tblid].length; i++) {
                table_body += `<tr>`;

                for (var j = 0; j < format[tblid][i].length; j++) {
                    var dynid = tableName + it + i + j;
                    var cell = format[tblid][i][j];
                    var height = cell.height && cell.height != "null" && cell.height != "undefined" ? cell.height : 2;
                    // Common styles across elements
                    var commonStyles = `
                font-style:${cell.fontstyle};
                text-decoration:${cell.underline};
                font-size:${cell.fontsize}px;
                color:${cell.color};
                background-color:${cell.backgroundcolor};
                font-weight:${cell.fontweight};
                vertical-align:${cell.verticalalign};
                text-align:${cell.textalign};
                font-family:${cell.fontfamily};
                height:${height}em;
                border-color:${cell.cellbordercolor};
                ${cell.cellborder};`;

                    table_body += `<td colspan="${cell.colspan}" rowspan="${cell.rowspan}" width="${cell.width}%" style="${commonStyles} margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};${cell.cellborder};">`;

                    // Handle different data types
                    switch (cell.datatype) {
                        case '0': // Text input
                            table_body += `<input type="text" from="${cell.fromtemp}" to="${cell.totemp}" id="dyn${dynid}" value="${cell.value}" class="form-control copyTempData" ${cell.staticcol} style="${commonStyles}">`;
                            break;

                        case '1': // Textarea
                            table_body += `<textarea from="${cell.fromtemp}" to="${cell.totemp}" id="dyn${dynid}" class="form-control copyTempData" style="${commonStyles}" ${cell.staticcol} rows="1">${cell.value}</textarea>`;
                            break;

                        case '2': // Date input
                            table_body += `<input type="date" from="${cell.fromtemp}" to="${cell.totemp}" id="dyn${dynid}" value="${cell.value}" ${cell.staticcol} class="form-control copyTempData" style="${commonStyles}">`;
                            break;

                        case '3': // Checkbox
                            table_body += `<input type="checkbox" id="dyn${dynid}" ${cell.staticcol} class="form-check" value="${cell.value}" style="${commonStyles}">`;
                            break;

                        case '4': // Number input
                            table_body += `<input type="number" id="dyn${dynid}" ${cell.staticcol} value="${cell.value}" class="form-control copyTempData" style="${commonStyles}">`;
                            break;

                        case '5': // Textarea with Select
                            table_body += `<textarea ${cell.staticcol} type="text" id="dyn${dynid}" list="list2${dynid}" value="${cell.value}" class="form-control" style="${commonStyles}">${cell.value}</textarea>`;
                            table_body += `<select id="list2${dynid}" class="form-control selectTextarea" style="${commonStyles}"><option value="select" selected>Select</option></select>`;
                            break;

                        case '6':// File Upload
                            table_body += `<input ${cell.staticcol} type="file" id="dyn${dynid}" style='${commonStyles}'  value="${cell.value}" class="form-control"> `;
                            table_body += `<a class="btn btn-success" id="fileUpload">Upload</a>`;
                            break;

                        case '7':// State
                            table_body += `<select ${cell.staticcol} id="state${dynid}" class="form-control"  style="${commonStyles}"><option value="0" selected>State</option></select>`;
                            break;

                        case '8':// District
                            table_body += `<div class="d-flex w-100">`;
                            table_body += `<select ${cell.staticcol} id="state${dynid}" class="stateselect form-control" style="${commonStyles}" ><option value="0" selected>State</option></select>`;
                            table_body += `<select id="district${dynid}" class="form-control" style="${commonStyles}"><option value="0" selected>District</option></select>`;
                            table_body += `</div>`;
                            break;

                        case '9':// Police
                            table_body += `<div class="d-flex w-100">`;
                            table_body += `<select ${cell.staticcol} id="state${dynid}" class="stateselect form-control"  style="${commonStyles}"><option value="0" selected>State</option></select>`;
                            table_body += `<select id="district${dynid}" class="districtselect form-control"  style="${commonStyles}"><option value="0" selected>District</option></select>`;
                            table_body += `<select id="police${dynid}"  style="${commonStyles}"  class="form-control"><option value="0" selected>Poilce</option></select>`;
                            table_body += `</div>`;
                            break;

                        case '10':// Agency
                            table_body += `<select ${cell.staticcol} id="agency${dynid}" class="form-control"  style="${commonStyles}"><option value="0" selected>Agency</option></select>`;
                            break;

                        case '11':// Branch
                            table_body += `<select ${cell.staticcol} id="state${dynid}" class="stateselect form-control branchState" style="${commonStyles}"><option value="0" selected>State</option></select>`;
                            table_body += `<select id="district${dynid}" class="form-control branchDistrict"  style="${commonStyles}"><option value="0" selected>District</option></select>`;
                            table_body += `<select ${cell.staticcol} id="branch${dynid}" class="branchselect form-control branchTemp"  style="${commonStyles}"><option value="0" selected>Branch</option></select>`;
                            table_body += `<textarea ${cell.staticcol} class="branch-address form-control" id="dyn${dynid}" style="${commonStyles}"  value="${cell.value}" row="1">${cell.value}</textarea>`;
                            break;

                        case '12':// Currency Field
                            table_body += `<input ${cell.staticcol}  from="${cell.fromtemp}" to="${cell.totemp}" type="text" name="currency-field"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  data-type="currency" placeholder="₹ 1,000,000.00"  id="dyn${dynid}" colNo="${j}" style="${commonStyles}"  value="${cell.value}" class="form-control currencyField copyTempData"> `;
                            break;

                        case '13':// Conclusion Set
                            table_body += `<p>`;
                            for (var kt = 0; kt < conclusionStes.length; kt++) {
                                table_body += `${conclusionStes[kt].Name} <input type="checkbox" name="${conclusionStes[kt].Name}" Id="" class="setChecks">`
                            }
                            table_body += `</p>`;
                            table_body += `<textarea type="text"  from="${cell.fromtemp}" to="${cell.totemp}" id="dyn${dynid}" list="con${dynid}" style="${commonStyles}"  value="${cell.value}" class="form-control">${cell.value}</textarea>
                                           <select id="con${dynid}" class="form-control selectTextarea copyTempData" style="${commonStyles}"></select>`;
                            break;

                        case '14':// HeadOffice
                            table_body += `<div class="d-flex w-100">`;
                            table_body += `<select ${cell.staticcol} id="head${dynid}" class="headselect form-control headTemp"  style="${commonStyles}"><option value="0" selected>Head Office</option></select>`;
                            table_body += `</div>`;
                            break;

                        case '15':// RefId
                            table_body += `<div class="d-flex w-100">`;
                            table_body += `<select id="av${dynid}" class=" form-control"  style="${commonStyles}"><option value="0" selected>Agency</option></select>`;
                            table_body += `<textarea class="form-control" id="dyn${dynid}" style="${commonStyles}" value="${cell.value}" row="1">${cell.value}</textarea>`;
                            table_body += `<select id="year${dynid}" class=" form-control"  style="${commonStyles}"><option value="0" selected>Year</option></select>`;
                            table_body += `</div>`;
                            break;

                        case '16':// Advocate
                            table_body += `<select id="advo${dynid}" class="form-control"  style="${commonStyles}"><option value="0" selected>Advocate</option></select>`;
                            break;

                        case '17':// Department
                            table_body += `<select id="department${dynid}" class="form-control"  style="${commonStyles}"><option value="0" selected>Department</option></select>`;
                            break;

                        case '18':// Year
                            table_body += `<select id="year${dynid}" class=" form-control"  style="${commonStyles}" ><option value="0" selected>Year</option></select>`;
                            break;

                    }

                    table_body += `</td>`;
                }

                table_body += `</tr>`;
            }

            table_body += `</table>`;
            $(`.${tableName}`).append(table_body);
        }

        if (Border == "0") {
            $(`.${tableName}`).css("border", "1px solid");
        }
        else if (Border == "1") {
            $(`.${tableName}`).css("border-right", "1px solid");

        }
        else if (Border == "2") {
            $(`.${tableName}`).css("border-left", "1px solid");

        }
        else if (Border == "3") {
            $(`.${tableName}`).css("border-top", "1px solid");


        }
        else if (Border == "4") {
            $(`.${tableName}`).css("border-bottom", "1px solid");

        }

        // Populate select options based on datatypes
        populateSelectOptions(tableName,format, statelist, headlist, advocatelist, yearlist, departmentlist, agencyr);

        if (refId != "0") {
            await loadTemplateData(name, refId, format, tableName);
        }

    }
    function populateSelectOptions(tableName,format, statelist, headlist, advocatelist, yearlist, departmentlist, agencyr) {
        Object.keys(format).forEach((tblid,it) => {
            format[tblid].forEach((row, i) => {
                row.forEach((cell, j) => {
                    const dynid = `${tableName}${it}${i}${j}`;
                    switch (cell.datatype) {
                        case '5': populateList(cell.options, dynid, 'list2'); break;
                        case '7': case '8': case '9': populateStateList(statelist, dynid); break;
                        case '10': populateAgency(agencyr, dynid); break;
                        case '11': populateStateList(statelist, dynid); break;
                        case '14': populateOptions(headlist, dynid, 'head'); break;
                        case '15': populateAgencyAndYear(agencyr, yearlist, dynid); break;
                        case '16': populateOptions(advocatelist, dynid, 'advo'); break;
                        case '17': populateOptions(departmentlist, dynid, 'department'); break;
                        case '18': populateOptions(yearlist, dynid, 'year'); break;
                    }
                });
            });
        });
    }
    function populateList(list, dynid) {
        $.each(list, function (i, item) {
            $(`#list2${dynid}`).append(`<option value="${item}">${item}</option>`);
        });
    }
    function populateStateList(list, dynid) {
        console.log(dynid);
        list.forEach(item => {
            const opt = `<option value="${item.Id}">${item.Name}</option>`;
            $(`#state${dynid}`).append(opt);
        });
    }

    function populateAgency(agencyr, dynid) {
        const agencyModel = JSON.parse(agencyr.model);
        const opt = `<option value="${agencyModel.userId}">${agencyModel.abbrevation}</option>`;
        $(`#agency${dynid}`).append(opt);
    }

    function populateAgencyAndYear(agencyr, yearlist, dynid) {
        populateAgency(agencyr, dynid);
        yearlist.forEach(item => {
            const opt = `<option value="${item.Id}">${item.year}</option>`;
            $(`#year${dynid}`).append(opt);
        });
    }

    function populateOptions(list, dynid, prefix) {
        list.forEach(item => {
            const opt = `<option value="${item.Id}">${item.Name}</option>`;
            $(`#${prefix}${dynid}`).append(opt);
        });
    }
    async function loadTemplateData(name, refId, format, tableName) {
        try {
            const result = await $.ajax({
                type: "POST",
                url: '/Reports/GetTempDataByReportId',
                dataType: "json",
                data: { name, refId },
                async: true
            });
            if (result && result.model) {
                debugger
                const data = JSON.parse(result.model.Data);
                Object.keys(format).forEach((tblid, it) => {
                    format[tblid].forEach((row, i) => {
                        row.forEach((cell, j) => {
                            debugger
                            var datatype = format[tblid][i][j].datatype;
                            const dynid = `${tableName}${it}${i}${j}`;
                            const dataId = `${tableName}${it}${i}${j}`;
                            const value = data[0][dataId];
                            if (datatype == '5') {
                                $(`#list2${dynid} option`).filter(function () {
                                    return $(this).text() === value;
                                }).prop('selected', true);
                            } else if (datatype == '7' || datatype == '8' || datatype == '9') {
                                $(`#state${dynid} option`).filter(function () {
                                    return $(this).text() === value;
                                }).prop('selected', true);
                            } else if (datatype == '11') {
                                let branchArray = value.split('#');
                                var state = branchArray[0];
                                var district = branchArray[1];
                                var branch = branchArray[2];
                                var address = branchArray[3];
                                $(`#state${dynid} option`).filter(function () {
                                    return $(this).text() === state;
                                }).prop('selected', true).trigger('change');

                                setTimeout(() => {
                                    $(`#district${dynid} option`).filter(function () {
                                        return $(this).text() === district;
                                    }).prop('selected', true).trigger('change');
                                }, 500);

                                setTimeout(() => {
                                    $(`#branch${dynid} option`).filter(function () {
                                        return $(this).text() === branch;
                                    }).prop('selected', true).trigger('change');
                                }, 500);
                                $(`#dyn${dynid}`).val(address);
                            } else if (datatype == '14') {
                                $(`#head${dynid} option`).filter(function () {
                                    return $(this).text() === value;
                                }).prop('selected', true);
                            }
                            else {
                                $(`#dyn${dynid}`).val(value);
                            }
                        });
                    });
                });
            }
        } catch (error) {
            console.error("Error loading template data:", error);
        }
    }
    $(document).on("click", "#fileUpload", function () {
        ;
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

    $(document).on("blur", ".currencyField", function () {
         
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

    $(document).on("click", "#refreshSelect", function () {

        $(this).prev().prev().val("");
    });
    $(document).on("change", ".selectTextarea", function () {
        var x = $(this).val();
        $(this).prev().val(x);
        $(this).val('Select').prop('selected', true);
    });
    $(document).on("click", ".removeTemplates", function () {
        console.log(sequence);
        var name = $(this).attr("name");

        var key;
        $(`#${name}`).remove();
        for (var k in sequence) {
            console.log(k);
            var tblname = sequence[k].replace(/[^\w\s]/gi, '');
            tblname = tblname.split(" ").join("");
            if (tblname == name) {
                key = k;
            }
        }

        if (key[0] == 't') {
            $('#templateId option').each(function () {

                var txt = $(this).text();
                if (txt == sequence[key]) {
                    $(this).prop('disabled', false);
                }
            });
        }
        else if (key[0] == 'd') {
            $('#dynamicTableId option').each(function () {

                var txt = $(this).text();
                if (txt == sequence[key]) {
                    $(this).prop('disabled', false);
                }
            });
        }
        else if (key[0] == 'c') {
            $('#calctblId option').each(function () {

                var txt = $(this).text();
                if (txt == sequence[key]) {
                    $(this).prop('disabled', false);
                }
            });
        }
        console.log(key);
        delete sequence[key];
        console.log(sequence);

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
    var operations = {};
    $(document).on("change", "#calctblId", function () {
        ;
        var name = $(this).find(':selected').text();
        renderCalcTable(name, 0, 1);
        var key = "calc" + c;
        sequence[key] = name;
        c++;
        $(this).find(':selected').attr("disabled", "disabled");
    });
    function renderCalcTable(name, refId, order) {
        operations = {};
        $.ajax({
            type: "post",
            url: '/Reports/RenderCalcTable',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {

                if (result.model != null) {
                    var format = JSON.parse(result.model.calcFormat);
                    console.log(format);
                    EditGlobal.push(format);
                    caltableName = result.model.calcName;
                    var Border = result.model.border;
                    var tblname = result.model.calcName.replace(/[^\w\s]/gi, '');
                    tblname = tblname.split(" ").join("");
                    EditTempName.push(tblname);
                    operations = JSON.parse(result.model.operations);
                    $('.temp').append(`
                    <section class="templates order-${order}" id="${tblname}">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-right"><a class="removeTemplates" href="javascript:void(0)"  name="${tblname}" style="color:red;text-decoration:none;cursor:pointer">X</a></div>
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
                                if (cell.datatype == '0') {
                                    table_body += `<td class=""  id="" colspan="${cell.colspan}" rowspan="${cell.rowspan}" width="${cell.width}%" style="${cell.cellborder}:1px solid; border-color:"${cell.cellbordercolor}";margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<input ${cell.staticcol} from="${cell.fromtemp}" to="${cell.totemp}" type="text" id="calc${calid}" rowNo="${i}" colNo="${j}" style='${commonStyles}' value="${cell.value}" class="form-control"> `;

                                    table_body += '</td>';
                                }
                                if (cell.datatype == '1') {
                                    table_body += `<td class=""  id="" colspan="${cell.colspan}" rowspan="${cell.rowspan}" width="${cell.width}%" style="${cell.cellborder}:1px solid; border-color:"${cell.cellbordercolor}";margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<textarea ${cell.staticcol} class="form-control" id="calc${calid}" colNo="${j}" style='${commonStyles}'  value="${cell.value}" row="1">${cell.value}</textarea>`;
                                    table_body += '</td>';
                                }
                                if (cell.datatype == '2') {
                                    table_body += `<td class="" id="" colspan="${cell.colspan}" rowspan="${cell.rowspan}" width="${cell.width}%" style="${cell.cellborder}:1px solid; border-color:"${cell.cellbordercolor}";margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<input ${cell.staticcol} type="date" id="calc${calid}" colNo="${j}" style='${commonStyles}'  value="${cell.value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (cell.datatype == '3') {
                                    table_body += `<td class="" id="" colspan="${cell.colspan}" rowspan="${cell.rowspan}" width="${cell.width}%" style="${cell.cellborder}:1px solid; border-color:"${cell.cellbordercolor}";margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<input ${cell.staticcol} type="checkbox" id="calc${calid}" colNo="${j}" style='${commonStyles}'  value="${cell.value}" class="form-check"> `;
                                    table_body += '</td>';
                                }
                                if (cell.datatype == '4') {
                                    table_body += `<td class="" id="" colspan="${cell.colspan} rowspan="${cell.rowspan} width="${cell.width}%" style="${cell.cellborder}:1px solid; border-color:"${cell.cellbordercolor}";margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<input ${cell.staticcol} type="number" id="calc${calid}" colNo="${j}" style='${commonStyles}'  value="${cell.value}" class="form-control"> `;
                                    if (row_no == rowcount) {
                                        table_body += `<input ${cell.staticcol} type="checkbox" class="checksum" calNo="${calNo}">`
                                        if (result.model.billType == "0") {
                                            table_body += `  <select ${cell.staticcol} aria-label="Server" class="form-control" id="calcCategory">
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
                                if (cell.datatype == '5') {
                                    table_body += `<td class="" id="" colspan="${cell.colspan}" rowspan="${cell.rowspan}" width="${cell.width}%" style="${cell.cellborder}:1px solid black;margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<textarea ${cell.staticcol} type="text" id="calc${dynid}" list="con${dynid}" style="${commonStyles}"  value="${cell.value}" class="form-control">${cell.value}</textara>
                                               <select ${cell.staticcol} id="con${dynid}" class="form-control selectTextarea" style="${commonStyles}">
                                        </select>`;

                                    table_body += '</td>';
                                }
                                if (cell.datatype == '6') {
                                    table_body += `<td class="" id="" colspan="${cell.colspan} rowspan="${cell.rowspan} width="${cell.width}%" style="${cell.cellborder}:1px solid black;margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<input ${cell.staticcol} type="file" id="calc${calid}" colNo="${j}" style='${commonStyles}'  value="${cell.value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (cell.datatype == '7') {
                                    table_body += `<td class="" id="" colspan="${cell.colspan} rowspan="${cell.rowspan} width="${cell.width}%"  style="${cell.cellborder};border-color:${cell.cellbordercolor};margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<input ${cell.staticcol} type="text" name="currency-field"  pattern="^₹\s?(\d{1,3}(,\d{2,3})*(\.\d{2})?|\d{1,})(,\d{2})?$"  data-type="currency" placeholder="₹ 10,00,000.00"  id="calc${calid}" colNo="${j}" style="${commonStyles}"  value="${cell.value}" class="form-control currencyField"> `;
                                    if (row_no == rowcount) {
                                        table_body += `<input  type="checkbox" calNo="${calNo}" class="checksum">`
                                    }
                                    if (result.model.billType == "0") {
                                        table_body += `  <select ${cell.staticcol} aria-label="Server" class="form-control" id="calcCategory">
                                        <option value="select" disabled selected>Select Category</option>
                                        <option value="0">Verified</option>
                                        <option value="1">Part of Final Bill/ Duplicate</option>
                                        <option value="2">Paid by TPA</option>
                                        <option value="3">Denided to Verify</option>
                                        <option value="4">Shop Closed/ Shifted</option>
                                        <option value="5">Total Bill</option>
                                        </select>`
                                    }
                                    table_body += '</td>';
                                }
                                if (cell.datatype == 8) {
                                    table_body += `<td class="" id="" colspan="${cell.colspan}" rowspan="${cell.rowspan}" width="${cell.width}%"  style="${cell.cellborder};border-color:${cell.cellbordercolor};margin-top:${cell.margintop};margin-bottom:${cell.marginbottom};">`;
                                    table_body += `<p>`
                                    for (var kt = 0; kt < conclusionStes.length; kt++) {
                                        table_body += `${conclusionStes[kt].Name} <input type="checkbox" name="${conclusionStes[kt].Name}" Id="" class="setChecks">  `
                                    }
                                    table_body += `</p>`
                                    table_body += `<textarea ${cell.staticcol} type="text" id="calc${dynid}" list="con${dynid}" style="${commonStyles}"  value="${cell.value}" class="form-control">${cell.value}</textara>
                                               <select ${cell.staticcol} id="con${dynid}" class="form-control selectTextarea" style="${commonStyles}">
                                        </select>`;
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
                        $(`.${tblname}`).css("border", "1px solid");

                    }
                    else if (Border == "1") {
                        $(`.${tblname}`).css("border-right", "1px solid");

                    }
                    else if (Border == "2") {
                        $(`.${tblname}`).css("border-left", "1px solid");

                    }
                    else if (Border == "3") {
                        $(`.${tblname}`).css("border-top", "1px solid");


                    }
                    else if (Border == "4") {
                        $(`.${tblname}`).css("border-bottom", "1px solid");

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
                    if (refId != "0") {
                        $.ajax({
                            type: "post",
                            url: '/Reports/GetTempDataByReportId',
                            dataType: "json",
                            data: { name, refId },
                            aysnc: false,
                            success: function (result) {

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

        var col = $(this).siblings().attr("colno");
        var calNo = $(this).attr("calNo");
        if ($(this).prop('checked')) {
            var totalSum = 0;
            var tbllength = Object.keys(EditGlobal[calNo]).length;
            var sum = 0;
            if (typeof operations["addition"] != "undefined" && operations["addition"].length > 0) {
                for (var k = 0; k < tbllength; k++) {

                    var tblid = "table" + k;
                    for (var i = 0; i < EditGlobal[calNo][tblid].length; i++) {
                        //for (var j = 0; j < EditGlobal[calNo][tblid][i].length; j++) {
                        for (var j = 0; j < operations["addition"].length; j++) {
                            var dynid = "calc" + EditTempName[calNo] + k + i + (operations["addition"][j] - 1);
                            var val = $(`#${dynid}`).val();
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
                    for (var i = 0; i < EditGlobal[calNo][tblid].length; i++) {
                        //for (var j = 0; j < EditGlobal[calNo][tblid][i].length; j++) {

                        var mul = 1;
                        for (var j = 0; j < operations["multiplication"].length; j++) {
                            var dynid = "calc" + EditTempName[calNo] + k + i + (operations["multiplication"][j] - 1);
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
                    for (var i = 0; i < EditGlobal[calNo][tblid].length; i++) {
                        for (var j = 0; j < operations["singleaddition"].length; j++) {

                            var dynid = "calc" + EditTempName[calNo] + k + i + (operations["singleaddition"][j] - 1);
                            var val = $(`#${dynid}`).val();
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
                    for (var i = 0; i < EditGlobal[calNo][tblid].length; i++) {
                        for (var j = 0; j < operations["division"].length; j++) {

                            var dynid = "calc" + EditTempName[calNo] + k + i + (operations["addition"][j] - 1);
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
                    for (var i = 0; i < EditGlobal[calNo][tblid].length; i++) {
                        var perc = 1;
                        var dynid1 = "calc" + EditTempName[calNo] + k + i + (operations["percentage"][0] - 1);
                        var val1 = $(`#${dynid1}`).val();
                        var dynid2 = "calc" + EditTempName[calNo] + k + i + (operations["percentage"][1] - 1);
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


                }
            });
        }
        catch (error) {
            alert(error);
        }
    }
    $(document).on("change", ".setChecks", function () {

        var name = $(this).attr("name");
        var t = $(this);
        var dropid = t.parent().next().next().attr("id");
        var set = [];
        if ($(this).prop("checked") == true) {
            var id;
            $(this).parents().next().val("");
            $(`#${dropid}`).empty();
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
                    ;
                    if (result.model != null) {

                        var s = "";
                        for (var i = 0; i < result.model.conclusionSets.length; i++) {
                            s = s + " " + result.model.conclusionSets[i];
                            set.push(result.model.conclusionSets[i]);
                            //t.parents().next().val(result.model.conclusionSets[i]);

                        }
                        //t.parent().next().remove();
                        //t.parent().parent().append(`<select id="conset" class="form-control"><option>Select<option></select>`);
                        $.each(set, function (i, item) {

                            $(`#${dropid}`).append(`<option value="${item}">${item}
                                        
                                        </option>`);
                        });

                        //console.log(conclusionStes);
                    }
                }
            });


        }
        else {
            $(this).parents().next().val("");
        }

    });


    //Location render
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

    //Copy Temp Data

    $(document).on("focus", ".copyTempData", function () {

        var from = $(this).attr("from");
        var to = $(this).attr("to");
        var agency = $('#agencyId option:selected').val();
        var ag = $('#agencyAbb').val();
        var ref2 = $('#Ref2').val();
        var yr = $('#yearId option:selected').text();
        var refid = ag + ref2 + yr;

        if (from != "" && to != "" && typeof from != "undefined" && typeof to != "undefined" && from != "undefined" && to != "undefined") {
            var fromarray = from.split("#");
            var toarray = to.split("#");
            var name = fromarray[0];
            var frow = fromarray[1];
            var fcol = fromarray[2];

            //if (agency == "" || ref2 == 0 || yr == 0) {
            //    alertify.set('notifier', 'position', 'top-right');
            //    alertify.error("REF.No is Required,Please Enter RefId Above");
            //}
            //else {
            $.ajax({
                type: "post",
                url: '/Reports/RenderDynaimcTable',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { name },

                aysnc: false,
                success: function (result) {
                    if (result.model != null) {

                        var format = JSON.parse(result.model.tableFormat);
                        console.log(format);
                        var _tblname = name;
                        _tblname = _tblname.replace(/[^\w\s]/gi, '');
                        _tblname = _tblname.split(" ").join("");
                        var tbllength = Object.keys(format).length;
                        var frno = 0;
                        var fvalue;
                        for (var it = 0; it < tbllength; it++) {
                            var tblid = "table" + it;
                            //for (var i = 0; i < d.length; i++) {
                            for (var j = 0; j < format[tblid].length; j++) {
                                frno++;
                                for (var k = 0; k < format[tblid][j].length; k++) {

                                    var _id = _tblname + it + j + k;

                                    if (frno == frow && fcol == (k + 1)) {
                                        fvalue = $(`#dyn${_id}`).val();
                                        break;
                                    }

                                }
                            }
                            //}
                        }
                        var fname = name;
                        name = toarray[0];
                        var trow = toarray[1];
                        var tcol = toarray[2];
                        $.ajax({
                            type: "post",
                            url: '/Reports/RenderDynaimcTable',
                            //contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: { name },

                            aysnc: false,
                            success: function (result) {

                                if (result.model != null) {
                                    var format = JSON.parse(result.model.tableFormat);
                                    console.log(format);
                                    //data = format;
                                    var tblname = result.model.tableName.replace(/[^\w\s]/gi, '');
                                    tblname = tblname.split(" ").join("");
                                    var tbllength = Object.keys(format).length;
                                    var trno = 0;

                                    for (var it = 0; it < tbllength; it++) {
                                        var tblid = "table" + it;
                                        //for (var i = 0; i < d.length; i++) {
                                        for (var j = 0; j < format[tblid].length; j++) {
                                            trno++;
                                            for (var k = 0; k < format[tblid][j].length; k++) {

                                                var _id = tblname + it + j + k;
                                                //var _val = d[0][_id];

                                                if (trno == trow && tcol == (k + 1)) {
                                                    $(`#dyn${_id}`).val(fvalue);
                                                    break;
                                                }

                                            }
                                        }
                                        //}
                                    }
                                    alertify.set('notifier', 'position', 'top-right');
                                    alertify.success("Data from template " + fname + " Copied Successfully to template " + name);
                                }
                            },
                        });


                    }
                    else {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.error("Report does not exist for given RefId and Template NAME");
                    }

                },

            });
            // }
        }


    });
});

