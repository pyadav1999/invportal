using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IDepartmentRepository : IBaseRepository<Department>
    {
        Department GetById(string id);
        IEnumerable<Department> GetAllDepartment();
        void UpdateDepartment(Department department);
    }
}
