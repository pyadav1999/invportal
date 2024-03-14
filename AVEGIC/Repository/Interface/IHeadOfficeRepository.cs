using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IHeadOfficeRepository:IBaseRepository<HeadOffice>
    {
        HeadOffice GetById(string id);
        IEnumerable<HeadOffice> GetAllHeadOffice();
        IEnumerable<HeadOffice> GetAllHeadOfficeById(string id);
        void UpdateHeadoffice(HeadOffice headOffice);
        
    }
}
