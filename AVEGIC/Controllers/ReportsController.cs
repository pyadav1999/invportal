using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Dynamic;
using System.Web;
using IronPdf;
using Syncfusion.HtmlConverter;
using Syncfusion.Pdf;
using IHostingEnvironment = Microsoft.AspNetCore.Hosting.IHostingEnvironment;
using PdfDocument = Syncfusion.Pdf.PdfDocument;
using System.IO;
//using iTextSharp.text;
//using iTextSharp.text.pdf;
//using iTextSharp.tool.xml;
//using iTextSharp.text.html.simpleparser;
using Syncfusion.Pdf.HtmlToPdf;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Drawing;
using Nest;
using System.Linq.Expressions;
using System.Security.Claims;
using Microsoft.AspNet.Identity;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AVEGIC.Controllers
{
    [Produces("application/json")]
    //[Route("api/[controller]")]
    public class ReportsController : Controller
    {
        private readonly IAgencyRepository _agencyRepository;
        private readonly ITemplatesRepository _templatesRepository;
        private readonly IHeadOfficeRepository _headOfficeRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly IYearRepository _yearRepository;
        private readonly IReportRepository _reportRepository;
        private readonly IReportTypeRepository _reportTypeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IDynamicTemplateRepository _dynamicTemplateRepository;
        private readonly IHostingEnvironment _HostingEnvironment;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IDynamicTable _dynamicTable;
        private readonly ICalc _calc;
        private readonly IConclusionSet _conclusionSet;
        private readonly IUserProfile _userProfile;
        private readonly IUserDetails _userDetails;
        private readonly IUserLetterHead _userLetterHead;


        [BsonId]
        private ObjectId MySuperId { get; set; }
        public ReportsController(IAgencyRepository agencyRepository, ITemplatesRepository templatesRepository, IHeadOfficeRepository headOfficeRepository,
          IBranchRepository branchRepository, IYearRepository yearRepository, IReportRepository reportRepository, IReportTypeRepository reportTypeRepository,
           IDepartmentRepository departmentRepository, IDynamicTemplateRepository dynamicTemplateRepository, IHostingEnvironment hostingEnvironment,
           IDynamicTable dynamicTable, ICalc calc, IConclusionSet conclusionSet, IWebHostEnvironment webHostEnvironment, IUserProfile userProfile, IUserDetails userDetails, IUserLetterHead userLetterHead)
        {
            _agencyRepository = agencyRepository;
            _templatesRepository = templatesRepository;
            _headOfficeRepository = headOfficeRepository;
            _branchRepository = branchRepository;
            _yearRepository = yearRepository;
            _reportRepository = reportRepository;
            _reportTypeRepository = reportTypeRepository;
            _departmentRepository = departmentRepository;
            _dynamicTemplateRepository = dynamicTemplateRepository;
            _HostingEnvironment = hostingEnvironment;
            _dynamicTable = dynamicTable;
            _calc = calc;
            _conclusionSet = conclusionSet;
            _webHostEnvironment = webHostEnvironment;
            _userProfile = userProfile;
            _userDetails = userDetails;
            _userLetterHead = userLetterHead;
        }
        public IActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            UserLetterHead userLetterHead = _userLetterHead.GetByUserId(userProfile.userId);
            List<DynamicTable> dynamicTableList = _dynamicTable.GetAllDynamicTable().ToList();
            List<DynamicTable> dynamicTableView = new List<DynamicTable>();
            string letterheadname = "";
            string billletterheadname = "";
            foreach (DynamicTable dynamicTable in dynamicTableList)
            {
                string templateName = dynamicTable.TableName;
                if (templateName.Length > 11)
                {
                    letterheadname = templateName.Substring(0, 10).ToLower();
                }

                if (templateName.Length > 15)
                {
                    billletterheadname = templateName.Substring(0, 14).ToLower();
                }

                if (dynamicTable != null && letterheadname != "letterhead" && billletterheadname != "billletterhead")
                {
                    dynamicTableView.Add(dynamicTable);
                }

            }
            if (userLetterHead != null)
            {

                if (userLetterHead.letterHeadName != null && userLetterHead.letterHeadName != "")
                {
                    dynamicTableView.Add(new DynamicTable { TableName = userLetterHead.letterHeadName, Id = ObjectId.GenerateNewId() });
                }
                if (userLetterHead.billLetterHeadName != null && userLetterHead.billLetterHeadName != "")
                {
                    dynamicTableView.Add(new DynamicTable { TableName = userLetterHead.billLetterHeadName, Id = ObjectId.GenerateNewId() });
                }
            }

            ViewBag.CustomizedDynamicTable = dynamicTableView;
            //ViewBag.Role = userProfile.role;
            Reloadmethods();
            return View(userProfile);
        }
        [HttpPost]
        public IActionResult CreateReport(Reports model)
        {
            string msg = "";
            bool status = false;
            Reports reports = new Reports();
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (model != null)
                {
                    reports = _reportRepository.GetByRefId(model.RefId);
                    if (reports == null)
                    {
                        var data = JsonConvert.DeserializeObject<dynamic>(model.Sequence);
                        //List<KeyValuePair<string, string>> seq = new List<KeyValuePair<string, string>>();
                        var seq = new Dictionary<string, string>();
                        var i = 0;
                        foreach (var item in data)
                        {
                            string key = "dyn" + i;
                            string value = item.Value;
                            if (key == "dyn2")
                            {
                                seq.Add(key, "RefNumber");
                                i++;
                                key = "dyn" + i;
                            }
                            seq.Add(key, value);
                            i++;

                        }
                        model.Sequence = JsonConvert.SerializeObject(seq);
                        model.IsDeleted = false;
                        model.UserId = userProfile.userId;
                        _reportRepository.Add(model);
                        GenrateRefNumberTemp(model);
                        msg = "Report Created Successfully";
                        status = true;
                    }
                    else
                    {
                        msg = "Report is Already Created";
                        status = false;
                    }

                }
                else
                {
                    msg = "Report is Not Created";
                    status = false;
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult RenderTemplate(string name)
        {
            bool status = false;
            Templates model = new Templates();
            if (name != null)
            {
                name = name.Trim();

                model = _templatesRepository.GetByName(name);
                status = true;
            }
            return Json(new { Model = model, Status = status });
        }
        [HttpPost]
        public IActionResult RenderDynaimcTable(string name)
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            UserLetterHead userLetterHead = _userLetterHead.GetByUserId(userProfile.userId);
            bool status = false;
            DynamicTable model = new DynamicTable();
            if (name != null)
            {
                name = name.Trim();

                if (name == userLetterHead.billLetterHeadName)
                {
                    model.Id = userLetterHead.id;
                    model.TableFormat = userLetterHead.billLetterHeadData;
                    model.TableName = name;
                }
                else if (name == userLetterHead.letterHeadName)
                {
                    model.Id = userLetterHead.id;
                    model.TableFormat = userLetterHead.letterHeadData;
                    model.TableName = name;
                }
                else
                {
                    model = _dynamicTable.GetByName(name);
                }
                status = true;
            }
            return Json(new { Model = model, Status = status });
        }
        [HttpPost]
        public IActionResult RenderCalcTable(string name)
        {
            bool status = false;
            CalculationTable model = new CalculationTable();
            if (name != null)
            {
                name = name.Trim();
                model = _calc.GetByName(name);
                status = true;
            }
            return Json(new { Model = model, Status = status });
        }

        public void GenrateRefNumberTemp(Reports model)
        {
            List<KeyValuePair<string, string>> jsn = new List<KeyValuePair<string, string>>();
            UserDetails userDetails = _userDetails.GetByUserId(model.UserId);
            Year year = _yearRepository.GetById(model.year);
            string RefId = userDetails.abbrevation + "/" + model.Ref2 + "/" + year.year;
            jsn.Add(new KeyValuePair<string, string>("RefNumber000", "RefId"));
            jsn.Add(new KeyValuePair<string, string>("RefNumber001", RefId));
            jsn.Add(new KeyValuePair<string, string>("RefNumber001", "Date"));
            jsn.Add(new KeyValuePair<string, string>("RefNumber001", model.Created_Date.ToString()));
            var jsndata = JsonConvert.SerializeObject(jsn);
            string ref1 = @"""RefNumber000""" + ":" + @"""RefId""";
            string ref2 = "\"RefNumber001\"" + ":" + "\"" + RefId + "\"";
            string ref3 = "\"RefNumber002\"" + ": " + "\"Date\"";
            string ref4 = "\"RefNumber003\"" + ":" + "\"" + model.Created_Date.ToString() + "\"";
            string reffinal = "[{" + ref1 + "," + ref2 + "," + ref3 + "," + ref4 + "}]";
            SaveDynamicTableData("RefNumber", reffinal, model.RefId);
        }
        [HttpPost]
        public IActionResult SaveTempData(string name, string jsn, string RefNo)
        {
            string msg = "";
            bool status = false;
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (jsn != null || RefNo != null)
                {
                    Reports modelReport = new Reports();
                    modelReport = _reportRepository.GetByRefId(RefNo);
                    if (modelReport != null)
                    {
                        dynamic model = JsonConvert.DeserializeObject<dynamic>(jsn);
                        dynamic data = new ExpandoObject();
                        data.ReportId = modelReport.Id;
                        data.UserId = modelReport.UserId;
                        foreach (dynamic item in model)
                        {
                            string a = item.ques;
                            string b = item.ans;
                            ((IDictionary<String, Object>)data)[a] = b;

                        }
                        _dynamicTemplateRepository.saveData(name, data);
                        status = true;
                        msg = "Your Template data is Saved successfully!";
                    }
                    else
                    {
                        status = false;
                        msg = "Your Report is not Created successfully!";
                    }

                }
                else
                {
                    status = false;
                    msg = "Your Report is not Created successfully!";
                }
            }

            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }


            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult SaveDynamicTableData(string name, string jsn, string RefNo)
        {
            string msg = "";
            bool status = false;
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (jsn != null || RefNo != null)
                {
                    Reports modelReport = new Reports();
                    modelReport = _reportRepository.GetByRefId(RefNo);
                    if (modelReport != null)
                    {
                        ///dynamic model = JsonConvert.DeserializeObject<dynamic>(jsn);
                        dynamic data = new ExpandoObject();
                        data.ReportId = modelReport.Id;
                        data.Data = jsn;
                        data.UserId = modelReport.UserId;
                        //foreach (dynamic item in model)
                        //{
                        //    string a = item.ques;
                        //    string b = item.ans;
                        //    ((IDictionary<String, Object>)data)[a] = b;

                        //}
                        _dynamicTemplateRepository.saveData(name, data);
                        status = true;
                        msg = "Your Template data is Saved successfully!";
                    }
                    else
                    {
                        status = false;
                        msg = "Your Report is not Created successfully!";
                    }

                }
                else
                {
                    status = false;
                    msg = "Your Report is not Created successfully!";
                }
            }

            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }


            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult SaveCalcTableData(string name, string jsn, string RefNo)
        {
            string msg = "";
            bool status = false;
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (jsn != null || RefNo != null)
                {
                    Reports modelReport = new Reports();
                    modelReport = _reportRepository.GetByRefId(RefNo);
                    if (modelReport != null)
                    {
                        ///dynamic model = JsonConvert.DeserializeObject<dynamic>(jsn);
                        dynamic data = new ExpandoObject();
                        data.ReportId = modelReport.Id;
                        data.Data = jsn;
                        data.UserId = modelReport.UserId;
                        //foreach (dynamic item in model)
                        //{
                        //    string a = item.ques;
                        //    string b = item.ans;
                        //    ((IDictionary<String, Object>)data)[a] = b;

                        //}
                        _dynamicTemplateRepository.saveData(name, data);
                        status = true;
                        msg = "Your Template data is Saved successfully!";
                    }
                    else
                    {
                        status = false;
                        msg = "Your Report is not Created successfully!";
                    }

                }
                else
                {
                    status = false;
                    msg = "Your Report is not Created successfully!";
                }
            }

            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }


            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetReportByRefId(string RefId)
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            Reports modelReport = new Reports();
            if (RefId != null)
            {
                modelReport = _reportRepository.findByUserIdAndRefId(userProfile.userId, RefId);
            }

            return Json(new { Model = modelReport });
        }
        [HttpPost]
        public IActionResult GetTempDataByReportId(string name, string refid)
        {
            dynamic model = null;
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            if (refid != "0" || refid != null)
            {
                Reports report = new Reports();
                report = _reportRepository.findByUserIdAndRefId(userProfile.userId, refid);
                IEnumerable<dynamic> data2;
                dynamic data;
                if (name != null)
                {
                    data = _dynamicTemplateRepository.FindTempDataByUserIdAndReportId(userProfile.userId, report.Id.ToString(), name);
                    model = data[0];
                }

                //foreach (var items in data)
                //{
                //    if (items.ReportId == report.Id)
                //    {
                //        model = items;
                //    }
                //}

            }
            //string tempModel = JsonConvert.SerializeObject(model);
            return Json(new { Model = model });
        }

        [HttpPost]
        public IActionResult UpdateReport(Reports model)
        {
            string msg = "";
            bool status = false;
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (model != null)
                {
                    Reports report = new Reports();
                    report = _reportRepository.findByUserIdAndRefId(userProfile.userId, model.RefId);
                    if (report != null)
                    {
                        model.Id = report.Id;
                        model.UserId = report.UserId;
                        _reportRepository.UpdateReport(model);
                        msg = "Report Updated Successfully";
                        status = true;
                    }
                    else
                    {
                        model.IsDeleted = false;
                        model.UserId = userProfile.userId;
                        _reportRepository.Add(model);
                        msg = "Report Created Successfully";
                        status = true;
                    }

                }
                else
                {
                    msg = "Report is Not Created";
                    status = false;
                }
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult UpdateTempData(string name, string jsn, string RefNo)
        {
            string msg = "";
            bool status = false;
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (jsn != null || RefNo != null)
                {
                    Reports modelReport = new Reports();
                    modelReport = _reportRepository.findByUserIdAndRefId(userProfile.userId, RefNo);
                    IEnumerable<dynamic> datatemp;
                    datatemp = _dynamicTemplateRepository.FindTempDataByUserIdAndReportId(userProfile.userId, RefNo, name);
                    dynamic model2 = null;
                    foreach (var items in datatemp)
                    {
                        if (items.ReportId == modelReport.Id)
                        {
                            model2 = items;
                        }
                    }
                    if (modelReport != null && model2 == null)
                    {
                        dynamic model = JsonConvert.DeserializeObject<dynamic>(jsn);
                        dynamic data = new ExpandoObject();
                        data.ReportId = modelReport.Id;
                        foreach (dynamic item in model)
                        {
                            string a = item.ques;
                            string b = item.ans;
                            ((IDictionary<String, Object>)data)[a] = b;

                        }
                        _dynamicTemplateRepository.saveData(name, data);
                        status = true;
                        msg = "Your Template data is Saved successfully!";
                    }
                    else if (modelReport != null && model2 != null)
                    {
                        dynamic model = JsonConvert.DeserializeObject<dynamic>(jsn);
                        dynamic data = new ExpandoObject();
                        data.ReportId = modelReport.Id;
                        data.UserId = userProfile.userId;
                        foreach (dynamic item in model)
                        {
                            string a = item.ques;
                            string b = item.ans;
                            ((IDictionary<String, Object>)data)[a] = b;

                        }
                        _dynamicTemplateRepository.updateData(name, data);
                        status = true;
                        msg = "Your Template data is Updated successfully!";
                    }
                    else
                    {
                        status = false;
                        msg = "Your Report is not Created successfully!";
                    }

                }
                else
                {
                    status = false;
                    msg = "Your Report is not Created successfully!";
                }
            }

            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }
            return Json(new { Message = msg, Status = status });

        }
        [HttpPost]
        public IActionResult UpdateDynTblData(string name, string jsn, string RefNo)
        {
            string msg = "";
            bool status = false;
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (jsn != null || RefNo != null)
                {
                    Reports modelReport = new Reports();
                    modelReport = _reportRepository.findByUserIdAndRefId(userProfile.userId, RefNo);
                    IEnumerable<dynamic> datatemp;
                    datatemp = _dynamicTemplateRepository.FindTempDataByUserIdAndReportId(userProfile.userId, modelReport.Id.ToString(), name);
                    dynamic model2 = null;
                    foreach (var items in datatemp)
                    {
                        if (items.ReportId == modelReport.Id)
                        {
                            model2 = items;
                        }
                    }
                    if (modelReport != null && model2 == null)
                    {
                        //dynamic model = JsonConvert.DeserializeObject<dynamic>(jsn);
                        dynamic data = new ExpandoObject();
                        data.ReportId = modelReport.Id;
                        data.Data = jsn;
                        data.UserId = userProfile.userId;
                        //foreach (dynamic item in model)
                        //{
                        //    string a = item.ques;
                        //    string b = item.ans;
                        //    ((IDictionary<String, Object>)data)[a] = b;

                        //}
                        _dynamicTemplateRepository.saveData(name, data);
                        status = true;
                        msg = "Your Template data is Saved successfully!";
                    }
                    else if (modelReport != null && model2 != null)
                    {
                        dynamic data = new ExpandoObject();
                        data.ReportId = modelReport.Id;
                        data.RefId = modelReport.RefId;
                        data.Data = jsn;
                        data.UserId = userProfile.userId;
                        _dynamicTemplateRepository.updateData(name, data);
                        status = true;
                        msg = "Your Template data is Updated successfully!";
                    }
                    else
                    {
                        status = false;
                        msg = "Your Report is not Created successfully!";
                    }

                }
                else
                {
                    status = false;
                    msg = "Your Report is not Created successfully!";
                }
            }

            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }
            return Json(new { Message = msg, Status = status });

        }

        [HttpPost]
        public IActionResult DeleteReport(string RefId)
        {
            string msg = "";
            bool status = false;
            Reports model = new Reports();
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            try
            {
                if (RefId != null)
                {
                    model = _reportRepository.findByUserIdAndRefId(userProfile.userId, RefId);
                    string temp = model.Sequence;
                    dynamic tempname = JsonConvert.DeserializeObject<dynamic>(temp);
                    foreach (dynamic item in tempname)
                    {
                        _dynamicTemplateRepository.deleteTempdata((item.Value).ToString(), (model.Id).ToString(), model.UserId);
                    }
                    _reportRepository.DeleteReport(model.Id.ToString());
                    status = true;
                    msg = "Report Deleted Successfully";
                }
                else
                {
                    status = false;
                    msg = "ReportId is Null";
                }
            }

            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }
            return Json(new { Message = msg, Status = status });
        }
        // [HttpPost]
        public IActionResult PrintReport(string RefId)
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            UserLetterHead userLetterHead = _userLetterHead.GetByUserId(userProfile.userId);
            dynamic model = new ExpandoObject();
            Dictionary<dynamic, dynamic> dec = new Dictionary<dynamic, dynamic>();
            Dictionary<dynamic, dynamic> final = new Dictionary<dynamic, dynamic>();
            List<KeyValuePair<string, string>> sequence = new List<KeyValuePair<string, string>>();
            List<dynamic> tempname = new List<dynamic>();
            if (RefId == null)
            {
                return Json(new { Message = "RefId is NUll" });
                //ClientScript.RegisterStartupScript(this.GetType(), "myalert", "alert('" + myStringVariable + "');", true);
            }
            else
            {
                string Id = RefId.Trim();
                Reports modelreport = new Reports();
                List<Agency> modelagency = new List<Agency>();
                List<Branch> modelbranch = new List<Branch>();
                List<HeadOffice> modelheadOffice = new List<HeadOffice>();
                List<List<dynamic>> modeldynamic = new List<List<dynamic>>();
                List<List<KeyValuePair<string, string>>> templatedata = new List<List<KeyValuePair<string, string>>>();

                List<List<dynamic>> dynamictbl = new List<List<dynamic>>();

                modelreport = _reportRepository.GetByRefId(Id);
                if (modelreport != null)
                {
                    modelagency = _agencyRepository.GetAllAgencyById(modelreport.Agency).ToList();
                    //modelbranch.Add(_branchRepository.GetById(modelreport.Branch));
                    //if (modelreport.Client != "0")
                    //{
                    //    modelheadOffice = _headOfficeRepository.GetAllHeadOfficeById(modelreport.Client).ToList();
                    //}

                    List<Reports> reports = new List<Reports>();
                    var data = JsonConvert.DeserializeObject<dynamic>(modelreport.Sequence);
                    //Sequence = data;
                    foreach (var item in data)
                    {
                        List<dynamic> ques = new List<dynamic>();
                        List<dynamic> tblques = new List<dynamic>();
                        List<KeyValuePair<string, string>> tempdata = new List<KeyValuePair<string, string>>();
                        string key = item.Name;
                        string value = item.Value;
                        sequence.Add(new KeyValuePair<string, string>(Convert.ToString(key), Convert.ToString(item.Value)));
                        if (key[0] == 't')
                        {
                            IEnumerable<dynamic> temp;
                            Templates dgn = new Templates();
                            dynamic obj = new ExpandoObject();
                            //dynamic tempdta = new ExpandoObject();
                            temp = _dynamicTemplateRepository.GetByAllTempData(Convert.ToString(item.Value));
                            //temp = _dynamicTemplateRepository.GetAllTempDataByReportId(modelreport.Id.ToString(), Convert.ToString(item.Value));
                            dgn = _templatesRepository.GetByName(Convert.ToString(item.Value));
                            var format = JsonConvert.DeserializeObject<dynamic>(dgn.TemplateFormat);

                            foreach (var items in temp)
                            {
                                if (items.ReportId == modelreport.Id)
                                {
                                    //items.TblName = item.Value;
                                    foreach (var item2 in items)
                                    {
                                        if (item2.Key != "ReportId" && item2.Key != "_id")
                                            //tempdata.Add(item2.Key);
                                            tempdata.Add(new KeyValuePair<string, string>(Convert.ToString(item2.Key), Convert.ToString(item2.Value)));
                                    }

                                    //tempname.Add(template);
                                }
                            }

                            foreach (var items in format)
                            {
                                ques.Add(items);

                            }
                            //foreach(var design in format)
                            //{
                            //    obj.
                            //}

                        }
                        if (key[0] == 'd')
                        {
                            IEnumerable<dynamic> temp;
                            DynamicTable dgn = new DynamicTable();
                            dynamic obj = new ExpandoObject();
                            //dynamic tempdta = new ExpandoObject();
                            temp = _dynamicTemplateRepository.GetByAllTempData(Convert.ToString(item.Value));
                            //temp = _dynamicTemplateRepository.GetAllTempDataByReportId(modelreport.Id.ToString(), Convert.ToString(item.Value));
                            dgn = _dynamicTable.GetByName(Convert.ToString(item.Value));
                            var format = JsonConvert.DeserializeObject<dynamic>(dgn.TableFormat);
                            if (value.Length >= 10 && value.Substring(0, 10).ToLower() == "letterhead") format = JsonConvert.DeserializeObject<dynamic>(userLetterHead.letterHeadData);
                            else if (value.Length >= 10 && value.Substring(0, 14).ToLower() == "billletterhead") format = JsonConvert.DeserializeObject<dynamic>(userLetterHead.billLetterHeadData);

                            foreach (var items in temp)
                            {
                                if (items.ReportId == modelreport.Id)
                                {
                                    dynamic obj2 = new ExpandoObject();
                                    obj2 = JsonConvert.DeserializeObject<dynamic>(items.Data);
                                    foreach (var ob in obj2)
                                    {
                                        foreach (var ob2 in ob)
                                        {

                                            tempdata.Add(new KeyValuePair<string, string>(Convert.ToString(ob2.Name), Convert.ToString(ob2.Value)));
                                        }
                                        //tempdata.Add(item2.Key);

                                    }

                                    //tempname.Add(template);
                                }
                            }
                            foreach (var items in format)
                            {
                                ques.Add(items);
                            }
                            //var res = sequence.Where(x => x.Key== key);
                            int indexSeq = 0;
                            foreach (var items in sequence)
                            {
                                if (items.Key == key)
                                {
                                    indexSeq = sequence.IndexOf(items);
                                    break;

                                }
                            }
                            if (sequence[indexSeq].Key == key)
                            {
                                KeyValuePair<string, string> newValue = new KeyValuePair<string, string>(sequence[indexSeq].Key, dgn.Display);
                                sequence[indexSeq] = newValue;

                            }
                            //sequence.Add(new KeyValuePair<string, string>(Convert.ToString(key), Convert.ToString(dgn.Display)));

                        }
                        if (key[0] == 'c')
                        {
                            IEnumerable<dynamic> temp;
                            CalculationTable dgn = new CalculationTable();
                            dynamic obj = new ExpandoObject();
                            //dynamic tempdta = new ExpandoObject();
                            temp = _dynamicTemplateRepository.GetByAllTempData(Convert.ToString(item.Value));
                            //temp = _dynamicTemplateRepository.GetAllTempDataByReportId(modelreport.Id.ToString(), Convert.ToString(item.Value));
                            dgn = _calc.GetByName(Convert.ToString(item.Value));
                            var format = JsonConvert.DeserializeObject<dynamic>(dgn.CalcFormat);
                            foreach (var items in temp)
                            {
                                if (items.ReportId == modelreport.Id)
                                {
                                    dynamic obj2 = new ExpandoObject();
                                    obj2 = JsonConvert.DeserializeObject<dynamic>(items.Data);
                                    foreach (var ob in obj2)
                                    {
                                        foreach (var ob2 in ob)
                                        {

                                            tempdata.Add(new KeyValuePair<string, string>(Convert.ToString(ob2.Name), Convert.ToString(ob2.Value)));
                                        }
                                        //tempdata.Add(item2.Key);

                                    }

                                    //tempname.Add(template);
                                }
                            }
                            foreach (var items in format)
                            {
                                ques.Add(items);
                            }
                        }

                        modeldynamic.Add(ques);
                        //dynamictbl.Add(tblques);
                        templatedata.Add(tempdata);

                    }

                    dec.Add(modeldynamic, templatedata);
                    final.Add(sequence, dec);
                    reports = _reportRepository.GetAllReportsByRefId(modelreport.RefId).ToList();
                    // modeldynamic = _dynamicTemplateRepository.GetAllTempDataByReportId(modelreport.Id.ToString(), "DETAILS OF CASE").ToList();
                    model.agency = modelagency;
                    //model.branch = modelbranch;
                    //model.headOffice = modelheadOffice;
                    model.report = reports;
                    model.modeldynamic = final;
                    model.tempname = tempname;
                    model.sequence = data;
                    //model.dynamictable =final;
                    //return RedirectToAction("PrintReport", "Reports",model);
                }
                else
                {
                    return Json(new { Message = "Report is not exist with this RefId" });
                }
            }
            return View(model);
        }

        //[Obsolete]
        [HttpPost]
        //[ValidateInput(false)]
        //public FileResult PdfConvert(string GridHtml)
        //{
        //    //IRONPDF
        //    //var Renderer = new IronPdf.ChromePdfRenderer();
        //    //Renderer.RenderingOptions.MarginTop = 20;  //millimeters
        //    //Renderer.RenderingOptions.MarginBottom = 20;
        //    //Renderer.RenderingOptions.CssMediaType = PdfPrintOptions.PdfCssMediaType.Print;
        //    //Renderer.RenderingOptions.TextHeader = new TextHeaderFooter()
        //    //{
        //    //    DrawDividerLine = true,
        //    //    FontSize = 16
        //    //};
        //    //Renderer.RenderingOptions.TextFooter = new TextHeaderFooter()
        //    //{
        //    //    DrawDividerLine = true,
        //    //    FontSize = 14
        //    //};
        //    //using var PDF = Renderer.RenderUrlAsPdf("https://localhost:7252/Reports/PrintReport/?RefId=AV0052019-2020");
        //    //var OutputPath = "C:/Users/acer/source/repos/AVEGIC/AVEGIC/wwwroot/I.pdf";
        //    //PDF.WatermarkAllPages("<h2 style='color:red'>SAMPLE</h2>");
        //    //PDF.SaveAs(OutputPath);
        //    //PDF.Print(true);
        //    // This neat trick opens our PDF file so we can see the result
        //    //System.Diagnostics.Process.Start(OutputPath);

        //    //SyncFusionPdf
        //    //HtmlToPdfConverter htmlConverter = new HtmlToPdfConverter(HtmlRenderingEngine.WebKit);
        //    ////Create a new instance for webkit converter settings.
        //    //WebKitConverterSettings settings = new WebKitConverterSettings();
        //    ////Set WebKit path
        //    //settings.WebKitPath = @"/QtBinaries/";
        //    ////Enable toc.
        //    //settings.EnableToc = true;
        //    ////Create a new instance for HTML to PDF toc.
        //    //HtmlToPdfToc toc = new HtmlToPdfToc();
        //    ////Set title.
        //    //toc.Title = "HTML to PDF";
        //    ////Set title alignment.
        //    //toc.TitleAlignment = PdfTextAlignment.Center;
        //    ////Create new HTML to PDF Toc Style.
        //    //HtmlToPdfTocStyle style = new HtmlToPdfTocStyle();
        //    ////Set background color.
        //    //style.BackgroundColor = new PdfSolidBrush(Color.LightCyan);
        //    ////Set font.
        //    //style.Font = new PdfStandardFont(PdfFontFamily.Helvetica, 12);
        //    ////Set fore color.
        //    //style.ForeColor = new PdfSolidBrush(Color.Red);
        //    ////Set paddings.
        //    //style.Padding = new PdfPaddings(5, 5, 5, 5);
        //    ////Set toc style.
        //    //toc.TitleStyle = style;
        //    ////Set toc to webkit settings.
        //    //settings.Toc = toc;
        //    ////Assign WebKit settings to HTML converter
        //    //htmlConverter.ConverterSettings = settings;
        //    ////Convert URL to PDF
        //    //PdfDocument document = htmlConverter.Convert("https://en.wikipedia.org/wiki/.NET_Framework");
        //    ////Save and close the PDF document 
        //    //MemoryStream ms = new MemoryStream();
        //    //document.Save(ms);
        //    //document.Close(true);
        //    //ms.Position = 0;
        //    //FileStreamResult fileStreamResult = new FileStreamResult(ms, "application/pdf");
        //    //fileStreamResult.FileDownloadName = "report.pdf";
        //    //return fileStreamResult;

        //    //ITEXTSHARP
        //    //using (MemoryStream stream = new System.IO.MemoryStream())
        //    //{
        //    //    StringReader sr = new StringReader(GridHtml);
        //    //    Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 100f, 0f);
        //    //    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, stream);
        //    //    pdfDoc.Open();
        //    //    XMLWorkerHelper.GetInstance().ParseXHtml(writer, pdfDoc, sr);
        //    //    pdfDoc.Close();
        //    //    return File(stream.ToArray(), "application/pdf", "Grid.pdf");
        //    //}
        //    //PdfPCell cell = new PdfPCell();
        //    //cell.BackgroundColor = new iTextSharp.text.BaseColor(51, 102, 102);
        //    //StringReader sr = new StringReader(GridHtml);
        //    //Document pdfDoc = new Document(PageSize.A4, 40f, 20f, 20f, 20f);
        //    //HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
        //    //using (MemoryStream memoryStream = new MemoryStream())
        //    //{
        //    //    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
        //    //    pdfDoc.Open();

        //    //    htmlparser.Parse(sr);
        //    //    pdfDoc.Close();

        //    //    byte[] bytes = memoryStream.ToArray();
        //    //    memoryStream.Close();
        //    //    return File(memoryStream.ToArray(), "application/pdf", "Grid.pdf");
        //    //}
        //}

        [HttpPost]
        public IActionResult CopyTempData(string name, string refid)
        {
            dynamic model = null;
            List<dynamic> ob = new List<dynamic>();
            bool status = false;
            if (refid != "0" || refid != null)
            {
                Reports report = new Reports();
                report = _reportRepository.GetByRefId(refid);
                IEnumerable<dynamic> data;
                data = _dynamicTemplateRepository.GetByAllTempData(name);
                if (report != null && data != null)
                {
                    foreach (var items in data)
                    {
                        if (items.ReportId == report.Id)
                        {
                            model = items;
                        }
                    }
                    DynamicTable model2 = new DynamicTable();
                    if (name != null)
                    {

                        model2 = _dynamicTable.GetByName(name);

                    }
                    ob.Add(model);
                    ob.Add(model2);
                    status = true;
                }
                else
                {
                    status = false;
                }

            }
            //string tempModel = JsonConvert.SerializeObject(model);
            return Json(new { Model = ob, Status = status });
        }
        public IActionResult GetAllConclusionSets()
        {
            var status = false;
            var msg = "";
            List<ConclusionSet> model = new List<ConclusionSet>();
            model = _conclusionSet.GetAllSets().OrderBy(x => x.Name).ToList();

            return Json(new { Status = status, Message = msg, Model = model });
        }
        public IActionResult GetConclusionSetByName(string name)
        {
            bool status = false;
            string msg = "";
            ConclusionSet model = new ConclusionSet();
            if (name != null)
            {
                model = _conclusionSet.GetSetByName(name);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }

        [HttpPost]
        public async Task<ActionResult> uploadimg()
        {
            string msg = "";
            bool status = false;
            try
            {

                var file = Request.Form.Files;
                foreach (IFormFile source in file)
                {
                    string filename = source.FileName;
                    string imagepath = GetActualPath(filename);
                    if (System.IO.File.Exists(imagepath))
                    {
                        System.IO.File.Delete(imagepath);
                    }
                    using (FileStream stream = System.IO.File.Create(imagepath))
                    {
                        await source.CopyToAsync(stream);
                    }
                }
                msg = "File Uploaded Successfully";
                status = true;
            }
            catch (Exception ex)
            {
                msg = ex.Message;
                status = true;
            }
            return Json(new { Status = status, Message = msg });

        }
        public string GetActualPath(string filename)
        {
            return Path.Combine(_webHostEnvironment.WebRootPath + "\\ImagesUpload\\", filename);
        }
        public IActionResult Reloadmethods()
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            ViewBag.Agency = _userDetails.GetByUserId(userProfile.userId);
            ViewBag.HeadOffice = _headOfficeRepository.GetAllHeadOffice().OrderBy(x => x.Name).ToList();
            ViewBag.Year = _yearRepository.GetAllYear().OrderBy(x => x.year).ToList();
            ViewBag.Templates = _templatesRepository.GetAllTemplates().OrderBy(x => x.TemplateName).ToList();
            ViewBag.ReportType = _reportTypeRepository.GetAllReportType().OrderBy(x => x.Name).ToList();
            ViewBag.Department = _departmentRepository.GetAllDepartment().OrderBy(x => x.Name).ToList();
            ViewBag.DynamicTable = _dynamicTable.GetAllDynamicTable().OrderBy(x => x.TableName).ToList();
            ViewBag.Calc = _calc.GetAllCalcTable().OrderBy(x => x.CalcName).ToList();
            ViewBag.Advocate = _userProfile.GetAllUsersByRole(2).OrderBy(x => x.name).ToList();
            List<Branch> model = new List<Branch>();
            model = _branchRepository.GetAllBranch().OrderBy(x => x.Name).ToList();

            return View("~/Views/Admin/Master.cshtml");
        }
    }
}
