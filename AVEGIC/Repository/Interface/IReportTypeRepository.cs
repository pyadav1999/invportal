using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IReportTypeRepository : IBaseRepository<ReportType>
    {
        ReportType GetById(string id);
        IEnumerable<ReportType> GetAllReportType();
        void UpdateReportType(ReportType reportType);
        void delete(string id);
    }
}
