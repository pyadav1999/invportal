using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IReportRepository:IBaseRepository<Reports>
    {
        Reports GetById(string id);
        IEnumerable<Reports> GetAllReport();
        IEnumerable<Reports> GetAllReportsByRefId(string RefID);
        Reports GetByRefId(string refId);

        Reports findByUserIdAndRefId(long userId, string refId);
        void UpdateReport(Reports reports);
        void DeleteReport(string Id);

    }
}
