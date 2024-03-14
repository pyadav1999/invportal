using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class InformationSheetRepository : BaseRepository<InformationSheet>, IInformationSheet
    {
        public InformationSheetRepository(IdbContext context) : base(context)
        {

        }
        public IEnumerable<InformationSheet> GetAllInformationSheet()
        {
            return DbSet.AsQueryable<InformationSheet>().ToList();
        }

        public InformationSheet GetById(string id)
        {
            InformationSheet model = new InformationSheet();

            if (id != null)
            {
                var Id = new ObjectId(id);
                model = DbSet.AsQueryable<InformationSheet>().SingleOrDefault(x => x.Id == Id);
            }

            return model;
        }

        public InformationSheet GetByISId(string ISId)
        {
            InformationSheet model = new InformationSheet();

            if (ISId != null)
            {
                model = DbSet.AsQueryable<InformationSheet>().SingleOrDefault(x => x.ISId == ISId);
            }

            return model;
        }

        public void UpdateReport(InformationSheet InformationSheet)
        {

            if (InformationSheet != null)
            {
                DbSet.ReplaceOne(Builders<InformationSheet>.Filter.Eq("_id", InformationSheet.Id), InformationSheet);
            }
        }
        public void DeleteReport(String Id)
        {
            var id = new ObjectId(Id);
            if (Id != null)
            {
                DbSet.DeleteOne(Builders<InformationSheet>.Filter.Eq("_id", id));
            }
        }

        public IEnumerable<InformationSheet> GetAllISByISId(string ISID)
        {
            //return DbSet.AsQueryable((IClientSessionHandle)Builders<InformationSheet>.Filter.Eq("RefId", RefID)).ToList();
            //var obj = new ObjectId(id);
            List<InformationSheet> result = new List<InformationSheet>();
            result = DbSet.AsQueryable<InformationSheet>().Where(x => x.ISId == ISID).ToList();
            if (result == null) return Enumerable.Empty<InformationSheet>();
            else return result;


        }

        
    }
}
