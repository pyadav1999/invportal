using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class HeadOfficeRepository:BaseRepository<HeadOffice>,IHeadOfficeRepository
    {
        public HeadOfficeRepository(IdbContext context):base(context)
        {

        }

        public IEnumerable<HeadOffice> GetAllHeadOffice()
        {
            return DbSet.AsQueryable<HeadOffice>().ToList();
        }

        public IEnumerable<HeadOffice> GetAllHeadOfficeById(string id)
        {
            //return DbSet.AsQueryable((IClientSessionHandle)Builders<HeadOffice>.Filter.Eq("_id", id)).ToList();
                
                var obj = new ObjectId(id);
                List<HeadOffice> result = new List<HeadOffice>();
                result = DbSet.AsQueryable<HeadOffice>().Where(x => x.Id == obj).ToList();
                if (result == null) return Enumerable.Empty<HeadOffice>();
                else return result;
            
           
        }

        public HeadOffice GetById(string id)
        {

            HeadOffice headoffice = new HeadOffice();

            if (id != null)
            {
                var Id = new ObjectId(id);
                headoffice = DbSet.AsQueryable<HeadOffice>().SingleOrDefault(x => x.Id == Id);
            }

            return headoffice;
        }

        public void UpdateHeadoffice(HeadOffice headOffice)
        {
            if (headOffice != null)
            {
                DbSet.ReplaceOne(Builders<HeadOffice>.Filter.Eq("_id", headOffice.Id), headOffice);
            }
        }
    }
}
