using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IDynamicTable : IBaseRepository<DynamicTable>
    {
        DynamicTable GetByName(string name);
        void update(DynamicTable table);
        IEnumerable<DynamicTable> GetAllDynamicTable();
        void delete(string name);
    }
}
