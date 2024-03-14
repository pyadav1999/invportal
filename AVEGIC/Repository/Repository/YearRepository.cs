using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class YearRepository:BaseRepository<Year>,IYearRepository
    {
        public YearRepository(IdbContext context):base(context)
        {

        }

        public IEnumerable<Year> GetAllYear()
        {
            return DbSet.AsQueryable<Year>().ToList();
        }

        public Year GetById(string id)
        {
            Year year = new Year();

            if (id != null)
            {
                var Id = new ObjectId(id);
                year = DbSet.AsQueryable<Year>().SingleOrDefault(x => x.Id == Id);
            }

            return year;
        }

        public void UpdateYear(Year year)
        {
            if (year != null)
            {
                DbSet.ReplaceOne(Builders<Year>.Filter.Eq("_id", year.Id), year);
            }
        }
    }
}
