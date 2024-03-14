using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IAdvocateRepository
    : IBaseRepository<Advocate>
    {
        Advocate GetById(string id);
        IEnumerable<Advocate> GetAllAdvocate();
        IEnumerable<Advocate> GetAllAdvocateById(string ID);
        void UpdateAdvocate(Advocate advocate);

    }
}
