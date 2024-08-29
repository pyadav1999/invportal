using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IReportTypeRepository : IBaseRepository<ReportType>
    {
        ReportType GetById(string id);
        ReportType GetByName(string name);
        IEnumerable<ReportType> GetAllReportType();
        IEnumerable<ReportType> GetReportTypeByFilters(string headOfficeId,string departmentId);
        void UpdateReportType(ReportType reportType);
        void delete(string id);
    }
}
