using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class AdvocateRepository
    : BaseRepository<Advocate>, IAdvocateRepository
    {
        public AdvocateRepository(IdbContext context) : base(context)
        {

        }

        public IEnumerable<Advocate> GetAllAdvocate()
        {
            return DbSet.AsQueryable<Advocate>().ToList();
        }

        public IEnumerable<Advocate> GetAllAdvocateById(string ID)
        {
            //return DbSet.AsQueryable((IClientSessionHandle)Builders<Advocate>.Filter.Eq("RefId", ID)).ToList();
            var obj = new ObjectId(ID);
            List<Advocate> result = new List<Advocate>();
            result = DbSet.AsQueryable<Advocate>().Where(x => x.Id == obj).ToList();
            if (result == null) return Enumerable.Empty<Advocate>();
            else return result;
        }

        public Advocate GetById(string id)
        {
            Advocate Advocate = new Advocate();

            if (id != null)
            {
                var Id = new ObjectId(id);
                Advocate = DbSet.AsQueryable<Advocate>().SingleOrDefault(x => x.Id == Id);
            }

            return Advocate;
        }

        public void UpdateAdvocate(Advocate Advocate)
        {
            if (Advocate != null)
            {
                DbSet.ReplaceOne(Builders<Advocate>.Filter.Eq("_id", Advocate.Id), Advocate);
            }
        }
    }
}
