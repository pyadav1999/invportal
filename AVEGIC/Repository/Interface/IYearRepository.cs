using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IYearRepository:IBaseRepository<Year>
    {
        Year GetById(string id);
        IEnumerable<Year> GetAllYear();
        void UpdateYear(Year year);
    }
}
