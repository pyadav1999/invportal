using AspNetCore.Identity.Mongo;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Models;
using AVEGIC.Repository.Interface;
using AVEGIC.Repository.Repository;
using AVEGIC.Settings;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using Nest;
using System.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddHttpClient();
builder.Services.AddControllersWithViews();
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();
builder.Services.AddScoped(typeof(IdbContext), typeof(dbContext));
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped(typeof(ILoginRepository), typeof(LoginRepository));
builder.Services.AddScoped(typeof(IAgencyRepository), typeof(AgencyRepository));
builder.Services.AddScoped(typeof(IHeadOfficeRepository), typeof(HeadOfficeRepository));
builder.Services.AddScoped(typeof(IBranchRepository), typeof(BranchRepository));
builder.Services.AddScoped(typeof(IYearRepository), typeof(YearRepository));
builder.Services.AddScoped(typeof(ITemplatesRepository), typeof(TemplatesRepository));
builder.Services.AddScoped(typeof(IReportRepository), typeof(ReportRepository));
builder.Services.AddScoped(typeof(IReportTypeRepository), typeof(ReportTypeRepository));
builder.Services.AddScoped(typeof(IDepartmentRepository), typeof(DepartmentRepository));
builder.Services.AddScoped(typeof(IDynamicTemplateRepository), typeof(DynamicTemplateRepository));
builder.Services.AddScoped(typeof(IDynamicTable), typeof(DynamicTableRepository));
builder.Services.AddScoped(typeof(ICalc), typeof(ClacRepository));
builder.Services.AddScoped(typeof(IConclusionSet), typeof(ConclusionSetRepo));
builder.Services.AddScoped(typeof(LocationInterface), typeof(LocationRepository));
builder.Services.AddScoped(typeof(DistrictInterface), typeof(DistrictRepository));
builder.Services.AddScoped(typeof(PoliceStationInterface), typeof(PoliceStationRepository));
builder.Services.AddScoped(typeof(IInformationSheet), typeof(InformationSheetRepository));
builder.Services.AddScoped(typeof(IAdvocateRepository), typeof(AdvocateRepository));
builder.Services.AddScoped(typeof(IUserProfile), typeof(UserProfileRepository));
builder.Services.AddSingleton(typeof(IHttpContextAccessor), typeof(HttpContextAccessor));
builder.Services.AddScoped(typeof(IUserDetails), typeof(UserDetailsRepository));
builder.Services.AddScoped(typeof(IUserLetterHead), typeof(UserLetterHeadRepository));
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddScoped(typeof(AVEGIC.Common.EntityMapper));
builder.Services.AddScoped(typeof(EntityDtoService));
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
Console.WriteLine();
var connectionString = builder.Configuration["AVEDatabase:ConnectionString"];
var dataBaseName = builder.Configuration["AVEDatabase:DatabaseName"];
// Add MongoDB Identity
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddMongoDbStores<ApplicationUser, ApplicationRole, Guid>(connectionString, dataBaseName)
    .AddDefaultTokenProviders();
var build = WebApplication.CreateBuilder(
    new WebApplicationOptions
    {
        EnvironmentName = Microsoft.Extensions.Hosting.Environments.Development
    }
    ) ;

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseWebSockets();
//app.UseWebSocketHandler();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSession();

app.UseAuthorization();
app.UseAuthentication();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
