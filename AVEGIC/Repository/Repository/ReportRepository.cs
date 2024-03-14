using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class ReportRepository : BaseRepository<Reports>, IReportRepository
    {
        public ReportRepository(IdbContext context):base(context)
        {

        }
        public IEnumerable<Reports> GetAllReport()
        {
            return DbSet.AsQueryable<Reports>().ToList();
        }

        public Reports GetById(string id)
        {
            Reports report = new Reports();

            if (id != null)
            {
                var Id = new ObjectId(id);
                report = DbSet.AsQueryable<Reports>().SingleOrDefault(x => x.Id == Id);
            }

            return report;
        }

        public Reports GetByRefId(string refId)
        {
            Reports report = new Reports();

            if (refId != null)
            {
                report = DbSet.AsQueryable<Reports>().SingleOrDefault(x => x.RefId == refId);
            }

            return report;
        }

        public void UpdateReport(Reports reports)
        {

            if (reports != null)
            {
                DbSet.ReplaceOneAsync(Builders<Reports>.Filter.Eq("_id", reports.Id), reports);
            }
        }
        public void DeleteReport(String Id)
        {
            var id= new ObjectId(Id);
            if(Id != null)
            {
                DbSet.DeleteOne(Builders<Reports>.Filter.Eq("_id", id));
            }
        }

        public IEnumerable<Reports> GetAllReportsByRefId(string RefID)
        {
            //return DbSet.AsQueryable((IClientSessionHandle)Builders<Reports>.Filter.Eq("RefId", RefID)).ToList();
            //var obj = new ObjectId(id);
            List<Reports> result = new List<Reports>();
            result = DbSet.AsQueryable<Reports>().Where(x => x.RefId == RefID).ToList();
            if (result == null) return Enumerable.Empty<Reports>();
            else return result;


        }

        public Reports findByUserIdAndRefId(long userId, string refId)
        {
            Reports report = new Reports();

            if (refId != null)
            {
                report = DbSet.AsQueryable<Reports>().SingleOrDefault(x => x.RefId == refId && x.UserId==userId);
            }

            return report;
        }
    }
}
