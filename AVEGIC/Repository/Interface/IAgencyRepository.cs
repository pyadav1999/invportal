using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IAgencyRepository:IBaseRepository<Agency>
    {
        Agency GetById(string id);   
        IEnumerable <Agency> GetAllAgency();
        IEnumerable <Agency> GetAllAgencyById(string ID);
        void UpdateAgency(Agency agency);

    }
}
