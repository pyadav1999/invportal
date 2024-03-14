using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class AgencyRepository:BaseRepository<Agency>,IAgencyRepository
    {
        public AgencyRepository(IdbContext context) : base(context)
        {

        }

        public IEnumerable<Agency> GetAllAgency()
        {
            return DbSet.AsQueryable<Agency>().ToList();
        }

        public IEnumerable<Agency> GetAllAgencyById(string ID)
        {
            //return DbSet.AsQueryable((IClientSessionHandle)Builders<Agency>.Filter.Eq("RefId", ID)).ToList();
            var obj= new ObjectId(ID);
            List<Agency> result = new List<Agency>();
            result = DbSet.AsQueryable<Agency>().Where(x => x.Id==obj).ToList();
            if (result == null) return Enumerable.Empty<Agency>();
            else return result;
        }

        public Agency GetById(string id)
        {
            Agency agency = new Agency();
           
            if (id != null)
            {
                var Id = new ObjectId(id);
                agency = DbSet.AsQueryable<Agency>().SingleOrDefault(x => x.Id ==Id) ;
            }

            return agency;
        }

        public void UpdateAgency(Agency agency)
        {
            if(agency!=null)
            {
                DbSet.ReplaceOne(Builders<Agency>.Filter.Eq("_id",agency.Id),agency);
            }
        }
    }
}
