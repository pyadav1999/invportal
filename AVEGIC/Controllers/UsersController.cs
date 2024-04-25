using AVEGIC.Common;
using AVEGIC.Dto;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using AVEGIC.Repository.Repository;
using Humanizer;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using Nest;
using SharpCompress.Common;
using System;

namespace AVEGIC.Controllers
{
    public class UsersController : Controller
    {
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
        private readonly EntityDtoService _entityDtoService;
        private readonly IUserLetterHead _userLetterHead;

        public UsersController(ITemplatesRepository templatesRepository, IHeadOfficeRepository headOfficeRepository, IBranchRepository branchRepository, IYearRepository yearRepository, IReportTypeRepository reportTypeRepository, IDepartmentRepository departmentRepository, IDynamicTemplateRepository dynamicTemplateRepository, IDynamicTable dynamicTable, ICalc calc, IConclusionSet conclusionSet, LocationInterface locationInterface, DistrictInterface districtInterface, PoliceStationInterface policeStationInterface, IAdvocateRepository advocateRepository, IUserProfile userProfile, IUserDetails userDetails, EntityDtoService entityDtoService, IUserLetterHead userLetterHead)
        {
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
            _entityDtoService = entityDtoService;
            _userLetterHead = userLetterHead;
        }

        public IActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            UserDetails userDetails = _userDetails.GetByUserId(userProfile.userId);
            if (userDetails == null)
            {
                return RedirectToAction("EditUserDetails", "Users", userProfile);
            }

            return View();
        }

        public IActionResult EditUserDetails()
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserDto userDto = new UserDto();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            UserDetails userDetails = _userDetails.GetByUserId(userProfile.userId);
            if (userProfile != null)
                userDto = EntityMapper.CopyProperties<UserProfile, UserDto>(userProfile, userDto);
            if (userDetails != null)
                userDto = EntityMapper.CopyProperties<UserDetails, UserDto>(userDetails, userDto);
            UserLetterHead userLetterHead = _userLetterHead.GetByUserId(userProfile.userId);

            Reloadmethods();
            List<DynamicTable> tableList = _dynamicTable.GetAllDynamicTable().OrderBy(x => x.TableName).ToList();
            List<DynamicTable> letterHeadList = new List<DynamicTable>();
            List<DynamicTable> billLetterHeadList = new List<DynamicTable>();
            DynamicTable dynamicTable = new DynamicTable();
            string letterheadname = "";
            string billletterheadname = "";
            foreach (var template in tableList)
            {
                string templateName = template.TableName;
                if (templateName.Length > 11 && templateName.Substring(0, 10).ToLower()== "letterhead")
                {
                    letterHeadList.Add(template);
                }

                if (templateName.Length > 15 && templateName.Substring(0, 14).ToLower()== "billletterhead")
                {
                    billLetterHeadList.Add(template);
                }
            }
            if (userLetterHead != null)
            {
                if (userLetterHead.letterHeadName != null && userLetterHead.letterHeadName != "")
                {
                    dynamicTable =new DynamicTable();
                    dynamicTable.TableName = userLetterHead.letterHeadName;
                    dynamicTable.TableFormat = userLetterHead.letterHeadData;
                    letterHeadList.Clear();
                    letterHeadList.Add(dynamicTable);
                }
                if (userLetterHead.billLetterHeadName != null && userLetterHead.billLetterHeadName != "")
                {
                    dynamicTable = new DynamicTable();
                    dynamicTable.TableName = userLetterHead.billLetterHeadName;
                    dynamicTable.TableFormat = userLetterHead.billLetterHeadData;
                    billLetterHeadList.Clear();
                    billLetterHeadList.Add(dynamicTable);
                }
            }
            ViewBag.letterHeadNames = letterHeadList;
            ViewBag.billLetterHeadNames = billLetterHeadList;
            return View(userDto);
        }

        [HttpPost]
        public IActionResult UpdateUserDetails(UserDto model)
        {
            bool status = false;
            string msg = "";
            try
            {

                if (!User.Identity.IsAuthenticated)
                { return RedirectToAction("LogOut", "Home"); }
                string userName = User.Identity.GetUserName();
                UserProfile user = _userProfile.FindByEmail(userName);



                if (model != null)
                {

                    UserDetails userDetails = new UserDetails();
                    UserDetails userDetails2 = _userDetails.GetByUserId(user.userId);
                    UserProfile userProfile = new UserProfile();
                    if (model != null)
                    {
                        userProfile = EntityMapper.CopyProperties<UserDto, UserProfile>(model, userProfile);
                        userDetails = EntityMapper.CopyProperties<UserDto, UserDetails>(model, userDetails);
                    }

                    userProfile.id = user.id;
                    userProfile.userId = user.userId;
                    userDetails.userId = user.userId;
                    userDetails.createdDate = DateTime.Now;
                    _userProfile.UpdateUser(userProfile);
                    if (userDetails2 == null)
                    {
                        _userDetails.Add(userDetails);
                    }
                    else
                    {
                        userDetails.id = userDetails2.id;
                        _userDetails.UpdateUserDetails(userDetails);
                    }
                    status = true;
                    msg = "Successfully Updated Details";

                }
                else
                {
                    status = false;
                    msg = "Details not Updated";
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
        public IActionResult SaveAgencyLetter(UserLetterHeadDto model, long dataId)
        {
            bool status = false;
            string msg = "";
            try
            {

                if (!User.Identity.IsAuthenticated)
                { return RedirectToAction("LogOut", "Home"); }
                string userName = User.Identity.GetUserName();
                UserProfile userProfile = _userProfile.FindByEmail(userName);



                if (model != null)
                {
                    UserLetterHead userLetterHead = _userLetterHead.GetByUserId(userProfile.userId);
                    if (userLetterHead == null)
                    {
                        UserLetterHead userLetterHead2 = new UserLetterHead();
                        model.isDeleted = false; ;
                        model.createdDate = DateTime.Now;
                        model.userId = userProfile.userId;
                        userLetterHead2 = EntityMapper.CopyProperties<UserLetterHeadDto, UserLetterHead>(model, userLetterHead2);
                        _userLetterHead.Add(userLetterHead2);
                        if (dataId == 1)
                            msg = "Successfully Added Letter Head";
                        else msg = "Successfully Added Bill Letter Head";
                    }
                    else
                    {
                        if (dataId == 1)
                        {
                            userLetterHead.letterHeadData = model.letterHeadData;
                            userLetterHead.letterHeadName = model.letterHeadName;
                            msg = "Successfully Updated Letter Head";
                        }
                        else if (dataId == 2)
                        {
                            userLetterHead.billLetterHeadData = model.billLetterHeadData;
                            userLetterHead.billLetterHeadName = model.billLetterHeadName;
                            msg = "Successfully Updated Bill Letter Head";
                        }
                        _userLetterHead.UpdateLetterHead(userLetterHead);
                    }
                    status = true;


                }
                else
                {
                    status = false;
                    msg = "Details not Updated";
                }
            }
            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }
            return Json(new { Message = msg, Status = status });
        }
        public IActionResult Reloadmethods()
        {
            ViewBag.HeadOffice = _headOfficeRepository.GetAllHeadOffice().OrderBy(x => x.Name).ToList();
            ViewBag.Year = _yearRepository.GetAllYear().OrderBy(x => x.year).ToList();
            ViewBag.Templates = _templatesRepository.GetAllTemplates().OrderBy(x => x.TemplateName).ToList();
            ViewBag.ReportType = _reportTypeRepository.GetAllReportType().OrderBy(x => x.Name).ToList();
            ViewBag.Department = _departmentRepository.GetAllDepartment().OrderBy(x => x.Name).ToList();
            ViewBag.DynamicTable = _dynamicTable.GetAllDynamicTable().OrderBy(x => x.TableName).ToList();
            ViewBag.Clac = _calc.GetAllCalcTable().OrderBy(x => x.CalcName).ToList();
            ViewBag.ConclusionSet = _conclusionSet.GetAllSets().OrderBy(x => x.Name).ToList();
            ViewBag.State = _locationInterface.GetAllState().OrderBy(x => x.Name).ToList();
            ViewBag.Advocate = _advocateRepository.GetAllAdvocate().OrderBy(x => x.Name).ToList();
            return View("~/Views/Admin/Master.cshtml");
        }

        [HttpPost]
        public IActionResult RenderDynaimcTable(string name)
        {
            bool status = false;
            DynamicTable model = new DynamicTable();
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            UserLetterHead userLetterHead = _userLetterHead.GetByUserId(userProfile.userId);
            if (name != null)
            {
                name = name.Trim();
                if (userLetterHead != null)
                {
                    if ((userLetterHead.letterHeadName != null && userLetterHead.letterHeadName != "" && userLetterHead.letterHeadData != null)
                          || (userLetterHead.billLetterHeadName != null && userLetterHead.billLetterHeadName != "" && userLetterHead.billLetterHeadData != null))
                    {
                        if (name == userLetterHead.letterHeadName)
                        {
                            model.TableFormat = userLetterHead.letterHeadData;
                            model.TableName = userLetterHead.letterHeadName;
                        }
                        else
                        {
                            model.TableFormat = userLetterHead.billLetterHeadData;
                            model.TableName = userLetterHead.billLetterHeadName;
                        }

                    }
                    else
                    {
                        model = _dynamicTable.GetByName(name);
                    }
                }

                else
                {
                    model = _dynamicTable.GetByName(name);
                }

                status = true;
            }
            return Json(new { Model = model, Status = status });
        }
    }
}
