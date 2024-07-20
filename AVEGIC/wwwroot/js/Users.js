$(document).ready(function () {

    //Save Basic Details
    $(document).on("click", "#saveBasicDetailsBtn", function () {
        var model = {};
        model.name = $("#name").val();
        model.state = $("#investigator_StateId option:selected").val();
        model.district = $("#investigator_districtPoliceId option:selected").val();
        model.address = $("#address").val();
        model.mobileNo = $("#mobile").val(); 
        model.email = $("#email").val();
        model.companyName = $("#company_name").val(); 
        model.panNo = $("#letterHead_pan").val();
        model.gstNo = $("#gstNo").val();
        model.bankName = $("#bankName").val();
        model.ifscCode = $("#ifscCode").val();
        model.accountNo = $("#accountNumber").val();
        model.abbrevation = $('#abbrevation').val();

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
                url: '/Users/UpdateUserDetails',
                //contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: { model },
                aysnc: false,
                success: function (result) {
                    debugger
                    if (result.status == true) {
                        alertify.set('notifier', 'position', 'top-right');
                        alertify.success(result.message);
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






    //LetterHead and Bill Letter Head
    function getStates() {
        return $.ajax({
            type: "post",
            url: '/Admin/GetAllStates',
            dataType: "json",
            data: {},
            aysnc: false,
            success: function (result) {
                debugger


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
                debugger


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
                debugger


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
                debugger


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
                debugger


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
                debugger


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
                debugger


            },

        }).catch(function (timeout) { });
    }
    var stl = 0;
    EditGlobal = [];
    dynmodel = {};
    var EditTempName;
    $(document).on("change", ".dynamicTable", async function () {
        debugger
        var renderClass = $(this).attr("classId");
        $(`.${renderClass}`).empty();
        dynmodel = {};
        var name = $(this).find(':selected').text();
        var statel = await getStates();
        var statelist = JSON.parse(statel.json);

        var agencyr = await getAgency();
        var agencylist = JSON.parse(agencyr.model);

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
            url: '/Users/RenderDynaimcTable',
            dataType: "json",
            data: { name },
            aysnc: false,
            success: function (result) {
                debugger
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
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="text" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '1') {
                                    table_body += `<td class=""  id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea class="form-control" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em !important;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '2') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="date" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '3') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="checkbox" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-check"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '4') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="number" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '5') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea type="text" id="dyn${dynid}" list="list2${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control">${format[tblid][i][j].value}</textarea>
                                                   <a type="" href="javascript:void(0);" style="color:blue;curson:pointer;" class="" id="editbtndrp">+</a>
                                                   <a type="" href="javascript:void(0);" style="color:red;curson:pointer;" class="" id="deloption">x</a>
                                               <select id="list2${dynid}" class="form-control selectTextarea" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                               <option value="select" selected>Select</option>
                                               </select>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '6') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="file" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '7') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="state${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>State</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '8') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
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

                                    table_body += `<td class="" id="$" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
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

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="agency${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>Agency</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '11') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="insurer${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>Insurer</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '12') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<input type="text" name="currency-field"  pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"  data-type="currency" placeholder="₹ 1,000,000.00"  id="dyn${dynid}" colNo="${j}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control currencyField"> `;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '13') {
                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan}" rowspan="${format[tblid][i][j].rowspan}" width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<textarea type="text" id="dyn${dynid}" list="con${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  value="${format[tblid][i][j].value}" class="form-control"></textarea>
                                               <select id="con${dynid}" class="form-control selectTextarea" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                        </select>`;
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '14') {

                                    table_body += `<td class="" id="$" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<div class="d-flex w-100">`
                                    table_body += `<select id="head${dynid}" class="headselect form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'>
                                       <option value="0" selected>Head Office</option>
                                       </select>`;

                                    table_body += `<select id="branch${dynid}" class="branchselect form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>Branch</option>
                                       </select>`;
                                    table_body += `<textarea class="branch-address form-control" id="dyn${dynid}" style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em !important;'  value="${format[tblid][i][j].value}" row="1">${format[tblid][i][j].value}</textarea>`;
                                    table_body += `</div>`
                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '15') {

                                    table_body += `<td class="" id="$" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
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

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="advo${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>Advocate</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '17') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="department${dynid}" class="form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;'  >
                                        <option value="0" selected>Department</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                                if (format[tblid][i][j].datatype == '18') {

                                    table_body += `<td class="" id="" colspan="${format[tblid][i][j].colspan} rowspan="${format[tblid][i][j].rowspan} width="${format[tblid][i][j].width}%" style="${format[tblid][i][j].cellborder};border-color:${format[tblid][i][j].cellbordercolor};margin-top:${format[tblid][i][j].margintop};margin-bottom:${format[tblid][i][j].marginbottom};">`;
                                    table_body += `<select id="year${dynid}" class=" form-control"  style='font-style:${format[tblid][i][j].fontstyle};text-decoration:${format[tblid][i][j].underline};font-size:${format[tblid][i][j].fontsize}px;color:${format[tblid][i][j].color};background-color:${format[tblid][i][j].backgroundcolor};font-weight:${format[tblid][i][j].fontweight};vertical-align:${format[tblid][i][j].verticalalign};text-align:${format[tblid][i][j].textalign};font-family:${format[tblid][i][j].fontfamily};height:${format[tblid][i][j].height}em;' >
                                       <option value="0" selected>Year</option>
                                       </select>`;

                                    table_body += '</td>';
                                }
                            }
                            table_body += '</tr>';
                        }
                        table_body += '</table>';
                        $(`.${renderClass}`).append(table_body);


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
                                debugger
                                var dynid = tblname + it + i + j;
                                if (format[tblid][i][j].datatype == '5') {
                                    $.each(format[tblid][i][j].options, function (i, item) {
                                        debugger
                                        $(`#list2${dynid}`).append(`<option value="${item}">${item}
                                        
                                        </option>`);
                                    });

                                }
                                if (format[tblid][i][j].datatype == 7) {
                                    $.each(statelist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#state${dynid}`).append(`<option value="${optval}">${name}</option>`);
                                        console.log(`#state${dynid} 7`);
                                    });
                                }
                                if (format[tblid][i][j].datatype == 8) {
                                    $.each(statelist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#state${dynid}`).append(`<option value="${optval}">${name}</option>`);
                                    });
                                    console.log(`#state${dynid} 8`);
                                }
                                if (format[tblid][i][j].datatype == 9) {
                                    $.each(statelist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#state${dynid}`).append(`<option value="${optval}">${name}</option>`);
                                        console.log(`#state${dynid} 9`);
                                    });
                                }
                                if (format[tblid][i][j].datatype == 10) {
                                    $.each(agencylist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#agency${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 11) {
                                    $.each(insurerlist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#insurer${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 14) {
                                    $.each(headlist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#head${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 15) {

                                    $.each(agencylist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Abbreviation;
                                        $(`#av${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                    $.each(yearlist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.year;
                                        $(`#year${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 16) {
                                    $.each(advocatelist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.name;
                                        $(`#advo${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 17) {
                                    $.each(departmentlist, function (index, element) {
                                        debugger
                                        var id = element.Id;
                                        var optval = String(id)
                                        var name = element.Name;
                                        $(`#department${dynid}`).append(`<option value="${optval}">${name}</option>`);

                                    });
                                }
                                if (format[tblid][i][j].datatype == 18) {

                                    $.each(yearlist, function (index, element) {
                                        debugger
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
    //Edit letter head

    var edv = 0;
    var val = 0;
    var edval = 0;
    var editClick = false;
    $(document).on("click", ".editDynTemplate", function () {
        debugger
        var temparray = [];
        temparray = EditGlobal;
        var divId = $(this).attr("divId");
        $(`#${divId}`).empty();
        var tempname = EditTempName;
        var tbllength = Object.keys(temparray).length;
        for (var k = 0; k < tbllength; k++) {
            debugger
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
                    var cellbordercolor = "cellbordercolor" + k + i + j;
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
<div class="row">
<div class="col-6">
<select id="${colorId}" class="form-select">
                                            <option value="select"  selected>Border Color</option>
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
                                `

                    table_body += '</td>';


                    //edval++;
                }
                table_body += `</tr>`;
            }
            table_body += `</table>`;
            $(`#${divId}`).append(table_body);
        }

        for (var k = 0; k < tbllength; k++) {
            debugger
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
                    var cellbordercolor = "cellbordercolor" + k + i + j;
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
                    if (EditGlobal[tblid][i][j].cellbordercolor != "undefine" && EditGlobal[tblid][i][j].cellbordercolor != null && EditGlobal[tblid][i][j].cellbordercolor != "")
                        $(`#${cellbordercolor}`).val(EditGlobal[tblid][i][j].cellbordercolor);
                    //edval++;
                }

            }

        }
        editClick = true;
    });
    $(document).on("click", ".saveAgencyHead", function () {
        debugger
        var name = EditTempName;
        var edittbllength = Object.keys(EditGlobal).length;
        //var tbllength = Object.keys(EditGlobal).length;
        for (var k = 0; k < edittbllength; k++) {
            debugger
            var tblid = "table" + k;
            for (var i = 0; i < EditGlobal[tblid].length; i++) {
                for (var j = 0; j < EditGlobal[tblid][i].length; j++) {
                    var dynid = EditTempName + k + i + j;
                    if (EditGlobal[tblid][i][j].datatype != 5 && EditGlobal[tblid][i][j].datatype != 6 && EditGlobal[tblid][i][j].datatype != 7 && EditGlobal[tblid][i][j].datatype != 8) {
                        var vl = $(`#dyn${dynid}`).val();
                        if (typeof vl != "undefine")
                            EditGlobal[tblid][i][j]. value= vl;
                    }
                    if (editClick) {
                        var colorId = "color" + k + i + j;
                        var bgcolorId = "bgcolor" + k + i + j;
                        var fontWeight = "weight" + k + i + j;
                        var verticalId = "verticle" + k + i + j;
                        var horizontalId = "horizontal" + k + i + j;
                        var fontFamily = "family" + k + i + j;
                        var height = "height" + k + i + j;
                        var size = "size" + k + i + j;
                        var cellborder = "cellborder" + k + i + j;
                        var cellbordercolor = "cellbordercolor" + k + i + j;
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
                        if ($(`#${cellbordercolor}`).val() != "undefine")
                            EditGlobal[tblid][i][j].cellbordercolor = $(`#${cellbordercolor}`).val();
                    }

                    //edval++;
                }
            }
        }

        var dataId = $(this).attr("data-Id");
        var format = JSON.stringify(EditGlobal);
        var model = {};
        if (dataId == 1) {
            model.letterHeadName = EditTempName;
            model.letterHeadData = format;
        }
        else if (dataId == 2) {
            model.billLetterHeadName = EditTempName;
            model.billLetterHeadData = format;
        }
        

        $.ajax({
            type: "post",
            url: '/Users/SaveAgencyLetter',
            dataType: "json",
            data: { model, dataId },
            aysnc: false,
            success: function (result) {
                if (result.status == true) {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.success(result.message);
                    //editClick = false;
                }
                else {
                    alertify.set('notifier', 'position', 'top-right');
                    alertify.error(result.message);
                    //editClick = false;
                }
            }
        });
    });


    $(document).on("change", '#investigator_StateId', function () {
        debugger
        var id = $(this).find(':selected').val().trim();
        var disId = $(this).attr("disId");
        var dis = $(this).attr("classId");
        $(`#${disId}`).empty();
        $(`#${disId}`).append(`<option value="0" selected>District</option>`)
        //console.log(dis);
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
                        debugger
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