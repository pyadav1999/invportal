using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;
using Nest;

namespace AVEGIC.Repository.Repository
{
    public class TemplatesRepository : BaseRepository<Templates>, ITemplatesRepository
    {
        public TemplatesRepository(IdbContext context):base(context)
        {

        }

        public void delete(string name)
        {
            DbSet.DeleteOne(Builders<Templates>.Filter.Eq("TemplateName", name));
        }

        public IEnumerable<Templates> GetAllTemplates()
        {

            return DbSet.AsQueryable<Templates>().ToList();
        }
        public void update(Templates obj)
        {
            if (obj.Id != null)
            {
                //var filter = Builders<DynamicTable>.Filter.Eq(s => s.Id, obj.Id);
                //var result = await collection.ReplaceOneAsync(filter, myObject)
                DbSet.ReplaceOne(Builders<Templates>.Filter.Eq("TemplateName", obj.TemplateName), obj);
            }
        }
        public Templates GetByName(string name)
        {
            Templates template = new Templates();

            if (name != null)
            {
                template = DbSet.AsQueryable<Templates>().SingleOrDefault(x => x.TemplateName == name);
            }

            return template;
        }
    }
}
