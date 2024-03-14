using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(IdbContext context) : base(context)
        {

        }

        public IEnumerable<Department> GetAllDepartment()
        {
            return DbSet.AsQueryable<Department>().ToList();
        }

        public Department GetById(string id)
        {
            Department department = new Department();

            if (id != null)
            {
                var Id = new ObjectId(id);
                department = DbSet.AsQueryable<Department>().SingleOrDefault(x => x.Id == Id);
            }

            return department;
        }

        public void UpdateDepartment(Department department)
        {
            if (department != null)
            {
                DbSet.ReplaceOne(Builders<Department>.Filter.Eq("_id", department.Id), department);
            }
        }
    }
}