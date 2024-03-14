using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface ITemplatesRepository:IBaseRepository<Templates>
    {
        Templates GetByName(string name);
        IEnumerable<Templates> GetAllTemplates();
        void delete(string name);
        void update(Templates obj);
    }
}
