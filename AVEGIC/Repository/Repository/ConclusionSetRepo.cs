using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using Nest;

namespace AVEGIC.Repository.Repository
{
    public class ConclusionSetRepo : BaseRepository<ConclusionSet>, IConclusionSet
    {
        public ConclusionSetRepo(IdbContext context) : base(context)
        {

        }

        public void DeleteSet(ObjectId id)
        {
            DbSet.DeleteOne(Builders<ConclusionSet>.Filter.Eq("_id",id));
        }

   
        public IEnumerable<ConclusionSet> GetAllSets()
        {
            return DbSet.AsQueryable<ConclusionSet>().ToList();
        }

        public IEnumerable<ConclusionSet> GetAllSetById(string ID)
        {
            //return DbSet.AsQueryable((IClientSessionHandle)Builders<ConclusionSet >.Filter.Eq("RefId", ID)).ToList();
            var obj = new ObjectId(ID);
            List<ConclusionSet > result = new List<ConclusionSet >();
            result = DbSet.AsQueryable<ConclusionSet >().Where(x => x.Id == obj).ToList();
            if (result == null) return Enumerable.Empty<ConclusionSet > ();
            else return result;
        }

        public ConclusionSet  GetById(string id)
        {
            ConclusionSet  ConclusionSet  = new ConclusionSet ();

            if (id != null)
            {
                var Id = new ObjectId(id);
                ConclusionSet  = DbSet.AsQueryable<ConclusionSet >().SingleOrDefault(x => x.Id == Id);
            }

            return ConclusionSet ;
        }

        public ConclusionSet  GetSetByName(string name)
        {
            ConclusionSet  ConclusionSet  = new ConclusionSet ();

            if (name != null)
            {
                //var Id = new ObjectId(name);
                ConclusionSet  = DbSet.AsQueryable<ConclusionSet >().SingleOrDefault(x => x.Name == name);
            }

            return ConclusionSet ;
        }

        public void UpdateSet(ConclusionSet  ConclusionSet )
        {
            if (ConclusionSet  != null)
            {
                DbSet.ReplaceOne(Builders<ConclusionSet >.Filter.Eq("_id", ConclusionSet .Id), ConclusionSet );
            }
        }

       

       
    }
}
