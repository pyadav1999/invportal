using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IInformationSheet:IBaseRepository<InformationSheet>
    {
        InformationSheet GetById(string id);
        IEnumerable<InformationSheet> GetAllInformationSheet();
        IEnumerable<InformationSheet> GetAllISByISId(string ISID);
        InformationSheet GetByISId(string ISId);
        void UpdateReport(InformationSheet informationSheet);
        void DeleteReport(string Id);
    }
}
