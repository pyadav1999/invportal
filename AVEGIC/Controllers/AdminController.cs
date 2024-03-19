using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using AVEGIC.Repository.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using Nest;
using Newtonsoft.Json;

namespace AVEGIC.Controllers
{
    public class AdminController : Controller
    {
        //HII
        private readonly IAgencyRepository _agencyRepository;
        private readonly ITemplatesRepository _templatesRepository;
        private readonly IHeadOfficeRepository _headOfficeRepository;
        private readonly IBranchRepository _branchRepository;
        private readonly IYearRepository _yearRepository;
        private readonly IReportTypeRepository _reportTypeRepository;
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IDynamicTemplateRepository _dynamicTemplateRepository;
        private readonly IDynamicTable _dynamicTable;
        private readonly ICalc _calc;
        private readonly IConclusionSet _conclusionSet;
        private readonly LocationInterface _locationInterface;
        private readonly DistrictInterface _districtInterface;
        private readonly PoliceStationInterface _policeStationInterface;
        private readonly IAdvocateRepository _advocateRepository;
        private readonly IUserProfile _userProfile;
        private readonly IUserDetails _userDetails;

        public AdminController(IAgencyRepository agencyRepository, ITemplatesRepository templatesRepository, IHeadOfficeRepository headOfficeRepository,
            IBranchRepository branchRepository, IYearRepository yearRepository, IReportTypeRepository reportTypeRepository, IDepartmentRepository departmentRepository,
            IDynamicTemplateRepository dynamicTemplateRepository, IDynamicTable dynamicTable, ICalc calc, IConclusionSet conclusionSet, LocationInterface locationInterface, DistrictInterface districtInterface, PoliceStationInterface policeStationInterface, IAdvocateRepository advocateRepository, IUserProfile userProfile,IUserDetails userDetails)  
        {
            _agencyRepository = agencyRepository;
            _templatesRepository = templatesRepository;
            _headOfficeRepository = headOfficeRepository;
            _branchRepository = branchRepository;
            _yearRepository = yearRepository;
            _reportTypeRepository = reportTypeRepository;
            _departmentRepository = departmentRepository;
            _dynamicTemplateRepository = dynamicTemplateRepository;
            _dynamicTable = dynamicTable;
            _calc = calc;
            _conclusionSet = conclusionSet;
            _locationInterface = locationInterface;
            _districtInterface = districtInterface;
            _policeStationInterface = policeStationInterface;
            _advocateRepository = advocateRepository;
            _userProfile = userProfile;
            _userDetails = userDetails;
        }
        public IActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            ViewBag.Role= HttpContext.Session.GetInt32("Role");
            return View();
        }
        //Mater
        public IActionResult Master()
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            ViewBag.Role = HttpContext.Session.GetInt32("Role");
            Reloadmethods();

            return View();

        }

        [HttpPost]

        public IActionResult CreateAgency(Agency model)
        {
            string msg = "";
            bool status = false;
            try
            {
                if (model != null)
                {
                    model.Created_Date = DateTime.Now;
                    model.IsDeleted = false;
                    _agencyRepository.Add(model);
                    Reloadmethods();
                    msg = "Agency is Created Successfully";
                    status = true;
                    //Console.WriteLine(msg);
                }
                else
                {
                    msg = "Agency is Not Created Due to insufficient data";
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
        public IActionResult UpdateAgency(Agency model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _agencyRepository.UpdateAgency(model);
                Reloadmethods();
                msg = "Agency is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "Agency is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult DeleteAgency(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _agencyRepository.Remove(id.ToString());
                Reloadmethods();
                msg = "Agency is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "Agency is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetAgencyById(string id)
        {
            bool status = false;
            string msg = "";
            Agency model = new Agency();
            if (id != null)
            {
                model = _agencyRepository.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult GetAllAgency()
        {
            bool status = false;
            string jsn = "";
            UserDetails model = new UserDetails();
            try
            {
                if (!User.Identity.IsAuthenticated)
                { return RedirectToAction("LogOut", "Home"); }
                string userName = User.Identity.GetUserName();
                UserProfile userProfile = _userProfile.FindByEmail(userName);
                model = _userDetails.GetByUserId(userProfile.userId);
                //model = _agencyRepository.GetAllAgency().OrderBy(x => x.Name).ToList();
                //jsn = JsonConvert.SerializeObject(model);
                status = true;

            }
            catch (Exception ex)
            {
                status = false;
                throw ex;
            }
            return Json(new { Status = status, Model = model });
        }
        [HttpPost]
        public IActionResult CreateHeadOffice(HeadOffice model)
        {
            bool status = false;
            string msg = "";
            if (model != null)
            {
                model.Created_Date = DateTime.Now;
                model.IsDeleted = false;
                _headOfficeRepository.Add(model);
                Reloadmethods();
                msg = "HeadOffice is Created Successfully";
                status = true;
            }
            else
            {
                status = false;
                msg = "HeadOffice is Not Created";

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult DeleteHeadOffice(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _headOfficeRepository.Remove(id.ToString());
                Reloadmethods();
                msg = "HeadOffice is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "HeadOffice is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult UpdateHeadOffice(HeadOffice model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _headOfficeRepository.UpdateHeadoffice(model);
                Reloadmethods();
                msg = "Agency is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "Agency is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetHeadOfficeById(string id)
        {
            bool status = false;
            string msg = "";
            HeadOffice model = new HeadOffice();
            if (id != null)
            {
                model = _headOfficeRepository.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult GetAllHeadOffice()
        {
            bool status = false;
            string jsn = "";
            List<HeadOffice> model = new List<HeadOffice>();
            try
            {

                model = _headOfficeRepository.GetAllHeadOffice().OrderBy(x => x.Name).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;

            }
            catch (Exception ex)
            {
                status = false;
                throw ex;
            }
            return Json(new { Status = status, Json = jsn });
        }

        [HttpPost]
        public IActionResult GetBranchById(string id)
        {
            bool status = false;
            string msg = "";
            string jsn = "";
            List<Branch> model = new List<Branch>();
            if (id != null)
            {
                model = _branchRepository.GetAllBranchByHeadId(id).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Json = jsn });
        }
        [HttpPost]
        public IActionResult GetBranch(Branch model)
        {
            bool status = false;
            string msg = "";
            string jsn = "";
            List<Branch> model2 = new List<Branch>();
            if (model != null)
            {
                model2 = _branchRepository.GetBranch(model).ToList();
                jsn = JsonConvert.SerializeObject(model2);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Json = jsn });
        }

        [HttpPost]
        public IActionResult GetClientById(string id)
        {
            bool status = false;
            string msg = "";
            Branch model = new Branch();
            if (id != null)
            {
                model = _branchRepository.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult CreateBranch(Branch model)
        {
            bool status = false;
            string msg = "";
            if (model != null)
            {
                model.Created_Date = DateTime.Now;
                model.IsDeleted = false;
                _branchRepository.Add(model);
                msg = "HeadOffice is Created Successfully";
                status = true;
            }
            else
            {
                status = false;
                msg = "HeadOffice is Not Created";

            }
            return Json(new { Status = status, Message = msg, Model = model });

        }

        [HttpPost]
        public IActionResult UpdateBranch(Branch model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _branchRepository.UpdateBranch(model);
                GetClientById(id);
                msg = "Branch is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "Branch is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult DeleteBranch(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _branchRepository.Remove(id.ToString());
                GetClientById(id);
                msg = "Branch is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "Branch is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetAllInsurer()
        {
            bool status = false;
            string jsn = "";
            List<Branch> model = new List<Branch>();
            try
            {

                model = _branchRepository.GetAllBranch().OrderBy(x=>x.Name).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;

            }
            catch (Exception ex)
            {
                status = false;
                throw ex;
            }
            return Json(new { Status = status, Json = jsn });
        }

        [HttpPost]
        public IActionResult CreateYear(Year model)
        {
            bool status = false;
            string msg = "";
            if (model != null)
            {
                model.Created_Date = DateTime.Now;
                model.IsDeleted = false;
                _yearRepository.Add(model);
                Reloadmethods();
                msg = "Year is Created Successfully";
                status = true;
            }
            else
            {
                status = false;
                msg = "Year is Not Created";

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult DeleteYear(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _yearRepository.Remove(id.ToString());
                Reloadmethods();
                msg = "Year is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "Year is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult UpdateYear(Year model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _yearRepository.UpdateYear(model);
                Reloadmethods();
                msg = "Year is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "Year is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }

        [HttpPost]
        public IActionResult GetAllYear()
        {
            bool status = false;
            string jsn = "";
            List<Year> model = new List<Year>();
            try
            {

                model = _yearRepository.GetAllYear().OrderBy(x=>x.year).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;

            }
            catch (Exception ex)
            {
                status = false;
                throw ex;
            }
            return Json(new { Status = status, Json = jsn });
        }
        [HttpPost]
        public IActionResult GetYearById(string id)
        {
            bool status = false;
            string msg = "";
            Year model = new Year();
            if (id != null)
            {
                model = _yearRepository.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }

        [HttpPost]
        public IActionResult CreateAdvocate(Advocate model)
        {
            string msg = "";
            bool status = false;
            try
            {
                if (model != null)
                {
                    model.Created_Date = DateTime.Now;
                    model.IsDeleted = false;
                    _advocateRepository.Add(model);
                    Reloadmethods();
                    msg = "Advocate is Created Successfully";
                    status = true;
                }
                else
                {
                    msg = "Advocate is Not Created Due to insufficient data";
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
        public IActionResult UpdateAdvocate(Advocate model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _advocateRepository.UpdateAdvocate(model);
                Reloadmethods();
                msg = "Advocate is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "Advocate is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult DeleteAdvocate(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _advocateRepository.Remove(id.ToString());
                Reloadmethods();
                msg = "Advocate is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "Advocate is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetAdvocateById(string id)
        {
            bool status = false;
            string msg = "";
            Advocate model = new Advocate();
            if (id != null)
            {
                model = _advocateRepository.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult GetAllAdvocate()
        {
            bool status = false;
            string jsn = "";
            List<UserProfile> model = new List<UserProfile>();
            try
            {

                model = _userProfile.GetAllUsersByRole(2).OrderBy(x => x.name).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;

            }
            catch (Exception ex)
            {
                status = false;
                throw ex;
            }
            return Json(new { Status = status, Json = jsn });
        }


        [HttpPost]
        public IActionResult TemplateNameCheck(string name)
        {
            Templates model = new Templates();
            bool status = false;
            string msg = "";
            if (name != null)
            {
                model = _templatesRepository.GetByName(name);
                if (model == null)
                {
                    status = true;
                    msg = "Name is Availabel";
                }
                else
                {
                    status = false;
                    msg = "Name is Already Taken";
                }
            }
            else
            {

                status = false;
                msg = "Provide Name Of Template";
            }

            return Json(new { Status = status, Message = msg });
        }

        [HttpPost]
        public IActionResult CreateTemplate(string name, string format, string border)
        {
            bool status = false;
            string msg = "";
            if (name != null)
            {
                Templates model = new Templates();
                name = name.Trim();
                model.TemplateName = name;
                model.TemplateId = name + DateTime.Now;
                model.IsDeleted = false;
                model.Created_Date = DateTime.Now;
                model.TemplateFormat = format;
                model.Border = border;
                _templatesRepository.Add(model);
                _dynamicTemplateRepository.createCollection(name);
                status = true;
                msg = "Template Created Successfully";
            }
            else
            {
                status = true;
                msg = "Template is Not Created ";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult UpdateTemplate(Templates obj)
        {
            bool status = false;
            string msg = "";
            if (obj.Id != null)
            {
                Templates model = new Templates();
                model = _templatesRepository.GetByName(obj.TemplateName);
                if (model != null)
                {
                    obj.Id = model.Id;
                    _templatesRepository.update(obj);
                    //_dynamicTemplateRepository.createCollection(name);
                    status = true;
                    msg = "Template Updated Successfully";
                }

            }
            else
            {
                status = false;
                msg = "Template is Not Exist";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult DeleteTemplate(string name)
        {
            bool status = false;
            string msg = "";
            if (name != null)
            {
                Templates model = new Templates();
                model = _templatesRepository.GetByName(name);
                if (model != null)
                {
                    _templatesRepository.delete(name);
                    _dynamicTemplateRepository.deletecollection(name);
                    status = true;
                    msg = "Template Deleted Successfully";
                }
                else
                {
                    status = false;
                    msg = "Template Not Exist!";
                }

            }
            else
            {
                status = false;
                msg = "Template is Not Deleted ";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult DynamicTableNameCheck(string name)
        {
            DynamicTable model = new DynamicTable();
            bool status = false;
            string msg = "";
            if (name != null)
            {
                model = _dynamicTable.GetByName(name);
                if (model == null)
                {
                    status = true;
                    msg = "Name is Availabel";
                }
                else
                {
                    status = false;
                    msg = "Name is Already Taken";
                }
            }
            else
            {

                status = false;
                msg = "Provide Name Of Template";
            }

            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult CreateDynamicTable(DynamicTable model)
        {
            bool status = false;
            string msg = "";
            if (model.TableName != null)
            {
                model.TableName = model.TableName.Trim();
                model.TableId = model.TableName + DateTime.Now;
                model.IsDeleted = false;
                model.Created_Date = DateTime.Now;
                _dynamicTable.Add(model);
                _dynamicTemplateRepository.createCollection(model.TableName);
                status = true;
                msg = "Template Created Successfully";
            }
            else
            {
                status = true;
                msg = "Template is Not Created ";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult UpdateDynamicTemplate(DynamicTable obj)
        {
            bool status = false;
            string msg = "";
            if (obj.TableName != null)
            {
                DynamicTable model = new DynamicTable();
                model = _dynamicTable.GetByName(obj.TableName);
                if (model != null)
                {
                    obj.Id = model.Id;
                    _dynamicTable.update(obj);
                    //_dynamicTemplateRepository.createCollection(name);
                    status = true;
                    msg = "Template Updated Successfully";
                }

            }
            else
            {
                status = false;
                msg = "Template is Not Exist";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]

        [HttpPost]
        public IActionResult RenderDynaimcTable(string name)
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            bool status = false;
            DynamicTable model = new DynamicTable();
            if (name != null)
            {
                name = name.Trim();
                model = _dynamicTable.GetByName(name);
                status = true;
            }
            return Json(new { Model = model, Status = status });
        }

        public IActionResult DeleteDynTemplate(string name)
        {
            bool status = false;
            string msg = "";
            if (name != null)
            {
                DynamicTable model = new DynamicTable();
                model = _dynamicTable.GetByName(name);
                if (model != null)
                {
                    _dynamicTable.delete(name);
                    _dynamicTemplateRepository.deletecollection(name);
                    status = true;
                    msg = "Template Deleted Successfully";
                }
                else
                {
                    status = false;
                    msg = "Template Not Exist!";
                }

            }
            else
            {
                status = false;
                msg = "Template is Not Deleted ";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult CalcNameCheck(string name)
        {
            CalculationTable model = new CalculationTable();
            bool status = false;
            string msg = "";
            if (name != null)
            {
                model = _calc.GetByName(name);
                if (model == null)
                {
                    status = true;
                    msg = "Name is Availabel";
                }
                else
                {
                    status = false;
                    msg = "Name is Already Taken";
                }
            }
            else
            {

                status = false;
                msg = "Provide Name Of Template";
            }

            return Json(new { Status = status, Message = msg });
        }

        [HttpPost]
        public IActionResult CreateCalcTable(CalculationTable model)
        {
            bool status = false;
            string msg = "";
            if (model.CalcName != null)
            {
                model.CalcName = model.CalcName.Trim();
                model.CalcId = model.CalcName + DateTime.Now;
                model.IsDeleted = false;
                model.Created_Date = DateTime.Now;
                _calc.Add(model);
                _dynamicTemplateRepository.createCollection(model.CalcName);
                status = true;
                msg = "Template Created Successfully";
            }
            else
            {
                status = true;
                msg = "Template is Not Created ";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult UpdateCalcTemplate(CalculationTable obj)
        {
            bool status = false;
            string msg = "";
            if (obj.CalcName != null)
            {
                CalculationTable model = new CalculationTable();
                model = _calc.GetByName(obj.CalcName);
                if (model != null)
                {
                    obj.Id = model.Id;
                    _calc.update(obj);
                    //_dynamicTemplateRepository.createCollection(name);
                    status = true;
                    msg = "Template Updated Successfully";
                }

            }
            else
            {
                status = false;
                msg = "Template is Not Exist";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult DeleteCalcTemplate(string name)
        {
            bool status = false;
            string msg = "";
            if (name != null)
            {
                CalculationTable model = new CalculationTable();
                model = _calc.GetByName(name);
                if (model != null)
                {
                    _calc.delete(name);
                    _dynamicTemplateRepository.deletecollection(name);
                    status = true;
                    msg = "Template Deleted Successfully";
                }
                else
                {
                    status = false;
                    msg = "Template Not Exist!";
                }

            }
            else
            {
                status = false;
                msg = "Template is Not Deleted ";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult GetReportTypeById(string id)
        {
            bool status = false;
            string msg = "";
            ReportType model = new ReportType();
            if (id != null)
            {
                model = _reportTypeRepository.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult CreateReportType(ReportType model)
        {
            bool status = false;
            string msg = "";
            if (model != null)
            {
                model.Created_Date = DateTime.Now;
                model.IsDeleted = false;
                _reportTypeRepository.Add(model);
                Reloadmethods();
                msg = "Report Type is Created Successfully";
                status = true;
            }
            else
            {
                status = false;
                msg = "Report Type is Not Created";

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult UpdateReportType(ReportType model, string id)
        {
            bool status = false;
            string msg = "";
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                //model.Created_Date = DateTime.Now;
                //model.IsDeleted = false;
                _reportTypeRepository.UpdateReportType(model);
                Reloadmethods();
                msg = "Report Type is Updated Successfully";
                status = true;
            }
            else
            {
                status = false;
                msg = "Report Type is Not Updated";

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult DeleteReportType(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _reportTypeRepository.delete(id.ToString());
                Reloadmethods();
                msg = "Report Type is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "Report Type is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult CreateDepartment(Department model)
        {
            bool status = false;
            string msg = "";
            if (model != null)
            {
                model.Created_Date = DateTime.Now;
                model.IsDeleted = false;
                _departmentRepository.Add(model);
                Reloadmethods();
                msg = "Department is Created Successfully";
                status = true;
            }
            else
            {
                status = false;
                msg = "Department is Not Created";

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult DeleteDepartment(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _departmentRepository.Remove(id.ToString());
                Reloadmethods();
                msg = "Department is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "Department is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult UpdateDepartment(Department model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _departmentRepository.UpdateDepartment(model);
                Reloadmethods();
                msg = "Department is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "Department is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetDepartmentById(string id)
        {
            bool status = false;
            string msg = "";
            Department model = new Department();
            if (id != null)
            {
                model = _departmentRepository.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
        [HttpPost]
        public IActionResult GetAllDepartment()
        {
            bool status = false;
            string jsn = "";
            List<Department> model = new List<Department>();
            try
            {

                model = _departmentRepository.GetAllDepartment().OrderBy(x => x.Name).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;

            }
            catch (Exception ex)
            {
                status = false;
                throw ex;
            }
            return Json(new { Status = status, Json = jsn });
        }


        [HttpPost]
        public IActionResult RenderTemplate(string name)
        {
            bool status = false;
            Templates model = new Templates();
            if (name != null)
            {

                model = _templatesRepository.GetByName(name);
                status = true;
            }
            return Json(new { Model = model, Status = status });
        }
        [HttpPost]
        public IActionResult CreateConclusionSet(ConclusionSet model)
        {
            bool status = false;
            string msg = "";
            if (model != null)
            {
                model.IsDeleted = false;
                model.Created_Date = DateTime.Now;
                _conclusionSet.Add(model);
                status = true;
                msg = "ConclusionSet Created Successfully";
            }
            else
            {
                status = false;
                msg = "Can not create Null Set!";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult UpdateConclusionSet(ConclusionSet model, string id)
        {
            bool status = false;
            string msg = "";
            if (model.Name != null)
            {
                ConclusionSet model2 = new ConclusionSet();
                var Id = new ObjectId(id);
                model2 = _conclusionSet.GetById(id);
                if (model2 != null)
                {
                    model.Id = model2.Id;
                    _conclusionSet.UpdateSet(model);
                    status = true;
                    msg = "ConclusionSet Updated Successfully";
                }
                else
                {
                    status = false;
                    msg = "ConclusionSet does not exist!";
                }
            }
            else
            {
                status = false;
                msg = "Can not Update Null Set!";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult DeleteConclusionSet(ConclusionSet model, string id)
        {
            bool status = false;
            string msg = "";
            if (model.Name != null)
            {
                ConclusionSet model2 = new ConclusionSet();

                model2 = _conclusionSet.GetById(id);
                if (model2 != null)
                {
                    model.Id = model2.Id;
                    _conclusionSet.DeleteSet(model.Id);
                    status = true;
                    msg = "ConclusionSet Deleted Successfully";
                }
                else
                {
                    status = false;
                    msg = "ConclusionSet does not exist!";
                }
            }
            else
            {
                status = false;
                msg = "Can not Delete Null Set!";
            }
            return Json(new { Status = status, Message = msg });
        }
        [HttpPost]
        public IActionResult GetConclusionSetById(string id)
        {
            bool status = false;
            string msg = "";
            ConclusionSet model = new ConclusionSet();
            if (id != null)
            {
                model = _conclusionSet.GetById(id.ToString());
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }

        public IActionResult Reloadmethods()
        {
            ViewBag.Agency = _agencyRepository.GetAllAgency().OrderBy(x => x.Name).ToList();
            ViewBag.HeadOffice = _headOfficeRepository.GetAllHeadOffice().OrderBy(x => x.Name).ToList();
            ViewBag.Year = _yearRepository.GetAllYear().OrderBy(x=>x.year).ToList();
            ViewBag.Templates = _templatesRepository.GetAllTemplates().OrderBy(x=>x.TemplateName).ToList();
            ViewBag.ReportType = _reportTypeRepository.GetAllReportType().OrderBy(x => x.Name).ToList();
            ViewBag.Department = _departmentRepository.GetAllDepartment().OrderBy(x => x.Name).ToList();
            ViewBag.DynamicTable = _dynamicTable.GetAllDynamicTable().OrderBy(x=>x.TableName).ToList();
            ViewBag.Clac = _calc.GetAllCalcTable().OrderBy(x=>x.CalcName).ToList();
            ViewBag.ConclusionSet = _conclusionSet.GetAllSets().OrderBy(x => x.Name).ToList();
            ViewBag.State = _locationInterface.GetAllState().OrderBy(x => x.Name).ToList();
            ViewBag.Advocate=_advocateRepository.GetAllAdvocate().OrderBy(x => x.Name).ToList();
            return View("~/Views/Admin/Master.cshtml");
        }


        [HttpPost]
        public IActionResult GetAllStates()
        {
            bool status = false;
            string jsn = "";
            List<State> model = new List<State>();
            try
            {

                model = _locationInterface.GetAllState().OrderBy(x => x.Name).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;

            }
            catch (Exception ex)
            {
                status = false;
                throw ex;
            }
            return Json(new { Status = status, Json = jsn });
        }
        [HttpPost]
        public IActionResult CreateState(State model)
        {
            string msg = "";
            bool status = false;
            try
            {
                if (model.Name != "")
                {
                    model.IsDeleted = false;
                    model.Created_Date = DateTime.Now;
                    _locationInterface.Add(model);
                    status = true;
                    msg = "State Created Successfully";
                    Reloadmethods();
                }
                else
                {
                    msg = "Please Enter State Name";
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
        public IActionResult DeleteState(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _locationInterface.Remove(id);
                Reloadmethods();
                msg = "State is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "State is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult UpdateState(State model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _locationInterface.UpdateState(model);
                Reloadmethods();
                msg = "State is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "State is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetStateById(string id)
        {
            bool status = false;
            string msg = "";
            State model = new State();
            if (id != null)
            {
                model = _locationInterface.GetById(id);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }


        [HttpPost]
        public IActionResult GetDistrictByState(string id)
        {
            bool status = false;
            string msg = "";
            string jsn = "";
            List<District> model = new List<District>();
            if (id != "")
            {

                model = _districtInterface.GetAllDistrictByStateId(id).OrderBy(x => x.Name).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Json = jsn });
        }
        [HttpPost]
        public IActionResult CreateDistrict(District model)
        {
            string msg = "";
            bool status = false;
            try
            {
                if (model.Name != "")
                {
                    model.IsDeleted = false;
                    model.Created_Date = DateTime.Now;
                    _districtInterface.Add(model);
                    status = true;
                    msg = "District Created Successfully";
                    Reloadmethods();
                }
                else
                {
                    msg = "Please Enter State Name";
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
        public IActionResult DeleteDistrict(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _districtInterface.Remove(id);
                Reloadmethods();
                msg = "District is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "District is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult UpdateDistrict(District model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _districtInterface.UpdateDistrict(model);
                Reloadmethods();
                msg = "District is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "District is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]


        public IActionResult GetPoliceStationByState(string id)
        {
            bool status = false;
            string msg = "";
            string jsn = "";
            List<PoliceStation> model = new List<PoliceStation>();
            if (id != "")
            {

                model = _policeStationInterface.GetAllPoliceStationByDistrictId(id).OrderBy(x=>x.Name).ToList();
                jsn = JsonConvert.SerializeObject(model);
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Json = jsn });
        }
        [HttpPost]
        public IActionResult CreatePoliceStation(PoliceStation model)
        {
            string msg = "";
            bool status = false;
            try
            {
                if (model.Name != "")
                {
                    model.IsDeleted = false;
                    model.Created_Date = DateTime.Now;
                    _policeStationInterface.Add(model);
                    status = true;
                    msg = "Police Station Created Successfully";
                    Reloadmethods();
                }
                else
                {
                    msg = "Please Enter Ploice Station Name";
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
        public IActionResult DeletePoliceStation(string id)
        {
            string msg = "";
            bool status = false;
            if (id != null)
            {
                _policeStationInterface.Remove(id);
                Reloadmethods();
                msg = "Police Station is Deleted Successfully";
                status = true;
            }
            else
            {
                msg = "Police Station is Not Deleted";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult UpdatePoliceStation(PoliceStation model, string id)
        {
            string msg = "";
            bool status = false;
            if (model != null)
            {
                var Id = new ObjectId(id);
                model.Id = Id;
                _policeStationInterface.UpdatePoliceStation(model);
                Reloadmethods();
                msg = "Police Station is Updated Successfully";
                status = true;
            }
            else
            {
                msg = "Police Station is Not Updated";
                status = false;
            }
            return Json(new { Message = msg, Status = status });
        }
        [HttpPost]
        public IActionResult GetPloiceStationById(string id)
        {
            bool status = false;
            string msg = "";
            PoliceStation model = new PoliceStation();
            if (id != null)
            {
                model = _policeStationInterface.GetById(id);
                //PoliceStation result=model.
                status = true;
            }
            else
            {
                status = false;

            }
            return Json(new { Status = status, Message = msg, Model = model });
        }
    }
}
