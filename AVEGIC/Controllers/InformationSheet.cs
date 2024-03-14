using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AVEGIC.Controllers
{
    public class InformationSheet : Controller
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
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IDynamicTable _dynamicTable;
        private readonly ICalc _calc;
        private readonly IConclusionSet _conclusionSet;
        private readonly IUserProfile _userProfile;



        public InformationSheet(IAgencyRepository agencyRepository, ITemplatesRepository templatesRepository, IHeadOfficeRepository headOfficeRepository,
          IBranchRepository branchRepository, IYearRepository yearRepository, IReportRepository reportRepository, IReportTypeRepository reportTypeRepository,
           IDepartmentRepository departmentRepository, IDynamicTemplateRepository dynamicTemplateRepository,
           IDynamicTable dynamicTable, ICalc calc, IConclusionSet conclusionSet, IWebHostEnvironment webHostEnvironment, IUserProfile userProfile)
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
            _dynamicTable = dynamicTable;
            _calc = calc;
            _conclusionSet = conclusionSet;
            _webHostEnvironment = webHostEnvironment;
            _userProfile = userProfile;
        }
        public ActionResult Index()
        {
            if (!User.Identity.IsAuthenticated)
            { return RedirectToAction("LogOut", "Home"); }
            string userName = User.Identity.GetUserName();
            UserProfile userProfile = _userProfile.FindByEmail(userName);
            Reloadmethods(); 
            return View(userProfile);
        }
        public IActionResult Reloadmethods()
        {
            ViewBag.Agency = _agencyRepository.GetAllAgency().ToList();
            ViewBag.HeadOffice = _headOfficeRepository.GetAllHeadOffice().ToList();
            ViewBag.Year = _yearRepository.GetAllYear().ToList();
            ViewBag.Templates = _templatesRepository.GetAllTemplates().ToList();
            ViewBag.ReportType = _reportTypeRepository.GetAllReportType().ToList();
            ViewBag.Department = _departmentRepository.GetAllDepartment().ToList();
            ViewBag.DynamicTable = _dynamicTable.GetAllDynamicTable().ToList();
            ViewBag.Calc = _calc.GetAllCalcTable().ToList();
            ViewBag.Insurer = _branchRepository.GetAllBranch().ToList();
            List<Branch> model = new List<Branch>();
            model = _branchRepository.GetAllBranch().ToList();

            return View("~/Views/InformationSheet/Index.cshtml");
        }

    }
}
