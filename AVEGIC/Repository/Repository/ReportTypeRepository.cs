using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class ReportTypeRepository : BaseRepository<ReportType>, IReportTypeRepository
    {
        public ReportTypeRepository(IdbContext context) : base(context)
        {

        }

        public IEnumerable<ReportType> GetAllReportType()
        {
            return DbSet.AsQueryable<ReportType>().ToList();
        }

        public ReportType GetById(string id)
        {
            ReportType report = new ReportType();

            if (id != null)
            {
                var Id = new ObjectId(id);
                report = DbSet.AsQueryable<ReportType>().SingleOrDefault(x => x.Id == Id);
            }

            return report;
        }
        public ReportType GetByName(string name)
        {
            ReportType report = new ReportType();

            if (name != null)
            {
                //var Id = new ObjectId(id);
                report = DbSet.AsQueryable<ReportType>().SingleOrDefault(x => x.Name == name);
            }

            return report;
        }

        public void UpdateReportType(ReportType reportType)
        {
            if (reportType != null)
            {
                DbSet.ReplaceOne(Builders<ReportType>.Filter.Eq("_id", reportType.Id), reportType);
            }
        }
        public void delete(string id)
        {
            var Id=new ObjectId(id);
            if (Id != null)
            {
                DbSet.DeleteOne(Builders<ReportType>.Filter.Eq("_id", Id));
            }
        }

        public IEnumerable<ReportType>  GetReportTypeByFilters(string headOfficeId, string departmentId) {
            List<ReportType> result = new List<ReportType>();
            var filterBuilder = Builders<ReportType>.Filter;
            var filters = new List<FilterDefinition<ReportType>>();
            filters.Add(filterBuilder.Eq("HeadOfficeId", headOfficeId));
            filters.Add(filterBuilder.Eq("DepartmentId", departmentId));
            var combinedFilter = filterBuilder.Or(filters);
            result = DbSet.Find(combinedFilter).ToList();
            if (result == null) return Enumerable.Empty<ReportType>();
            else return result;
        }

    }
}
