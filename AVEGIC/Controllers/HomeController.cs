using AVEGIC.Entity_Models;
using AVEGIC.Models;
using AVEGIC.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using System.Diagnostics;

namespace AVEGIC.Controllers
{
    public class HomeController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<HomeController> _logger;
        private readonly ILoginRepository _loginRepository;
        private readonly IUserProfile _userProfileRepository;
        private IHttpContextAccessor _contextAccessor;
        private readonly LocationInterface _locationInterface;
        private readonly IHeadOfficeRepository _headOfficeRepository;
        private readonly IBranchRepository _branchRepository;
        public HomeController(ILogger<HomeController> logger, ILoginRepository loginRepository, IUserProfile userProfileRepository, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IHttpContextAccessor contextAccessor, LocationInterface locationInterface,
            IHeadOfficeRepository headOfficeRepository,IBranchRepository branchRepository)
        {
            _logger = logger;
            _loginRepository = loginRepository;
            _userProfileRepository = userProfileRepository;
            _userManager = userManager;
            _signInManager = signInManager;
            _contextAccessor = contextAccessor;
            _locationInterface = locationInterface;
            _headOfficeRepository = headOfficeRepository;
            _branchRepository = branchRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Signin(LoginModel model, string returnurl)
        {
            string msg = "";
            bool status = false;
            long role =0;
            try
            {
                if (!ModelState.IsValid)
                {
                    ApplicationUser appUser = await _userManager.FindByEmailAsync(model.Username);
                    if (appUser != null)
                    {
                        Microsoft.AspNetCore.Identity.SignInResult result = await _signInManager.PasswordSignInAsync(appUser, model.Password, false, false);
                        if (result.Succeeded)
                        {
                            var objAppuser = _signInManager.UserManager.FindByEmailAsync(model.Username);
                            UserProfile modelUserProfile = _userProfileRepository.FindByEmail(model.Username);
                            if (objAppuser != null)
                            {
                              
                                if (modelUserProfile != null)
                                {
                                    _contextAccessor.HttpContext.Session.SetInt32("LoginedUserId", (int)modelUserProfile.userId);
                                    _contextAccessor.HttpContext.Session.SetString("UserName", modelUserProfile.email);
                                    _contextAccessor.HttpContext.Session.SetString("Email", modelUserProfile.email);
                                    _contextAccessor.HttpContext.Session.SetInt32("Role", (int)modelUserProfile.role);
                                   
                                }
                            }

                            status = true;
                            msg = "Login Successfull";
                            role = modelUserProfile.role;

                        }
                    }
                    else
                    {
                        ModelState.AddModelError(nameof(model.Username), "Login Failed: Invalid Email or Password");
                        status = false;
                        msg = "Login Failed: Invalid Email or Password";
                    }

                }

            }
            catch (Exception ex)
            {
                status = false;
                msg = ex.Message.ToString();

            }


            return Json(new
            {
                Message = msg,
                Status = status,
                Role= role
            });
        }

        public IActionResult Registration()
        {
            ViewBag.State = _locationInterface.GetAllState().OrderBy(x => x.Name).ToList();
            ViewBag.HeadOffice = _headOfficeRepository.GetAllHeadOffice().OrderBy(x => x.Name).ToList();
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp(UserProfile model)
        {
            string msg = "";
            bool status = false;
            try
            {
                if (model.email != null)
                {
                    model.isDeleted = false;
                    model.createdDate = DateTime.Now;
                    List<UserProfile> list = new List<UserProfile>();
                    list = _userProfileRepository.GetAllUsers().ToList();
                    model.userId = list.Count + 1;
                   


                    ApplicationUser appUser = new ApplicationUser
                    {
                        UserName = model.email,
                        Email = model.email,
                        UserId = model.userId
                    };

                    IdentityResult result = await _userManager.CreateAsync(appUser, model.password);
                    model.password = null;
                    _userProfileRepository.Add(model);
                    if (result.Succeeded)
                    {
                        status = true;
                        msg = "User Registered Successfully, Please Login";
                    }
                    else
                    {
                        status = false;
                        foreach (IdentityError error in result.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                            msg =msg + error.Description;
                        }
                           
                        
                        
                    }
                }
                else
                {
                    status = true;
                    msg = "Details Required!";
                }
            }
            catch (Exception ex)
            {
                status = false;
                msg = ex.Message.ToString();
            }
            return Json(new
            {
                Message = msg,
                Status = status
            });
        }

        public IActionResult LogOut()
        {
            _contextAccessor.HttpContext.Session.SetInt32("LoginedUserId", -1);
            _contextAccessor.HttpContext.Session.SetString("UserName", string.Empty);
            _contextAccessor.HttpContext.Session.SetString("Email", string.Empty);
            _contextAccessor.HttpContext.Session.SetInt32("Role", -1);
            _signInManager.SignOutAsync();
            return RedirectToAction("Login", "Home");
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}