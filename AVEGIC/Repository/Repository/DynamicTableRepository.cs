using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Driver;
using Nest;

namespace AVEGIC.Repository.Repository
{
    public class DynamicTableRepository: BaseRepository<DynamicTable>, IDynamicTable
    {
        public DynamicTableRepository(IdbContext context) : base(context)
        {

        }

        public void delete(string name)
        {
            DbSet.DeleteOne(Builders<DynamicTable>.Filter.Eq("TableName", name));
        }
        public IEnumerable<DynamicTable> GetAllDynamicTable()
        {
            return DbSet.AsQueryable<DynamicTable>().ToList();
        }
        public void update(DynamicTable obj)
        {
            if(obj.Id!=null)
            {
                //var filter = Builders<DynamicTable>.Filter.Eq(s => s.Id, obj.Id);
                //var result = await collection.ReplaceOneAsync(filter, myObject)
                DbSet.ReplaceOne(Builders<DynamicTable>.Filter.Eq("TableName", obj.TableName), obj);
            }
        }
        public DynamicTable GetByName(string name)
        {
            DynamicTable template = new DynamicTable();

            if (name != null)
            {
                template = DbSet.AsQueryable<DynamicTable>().SingleOrDefault(x => x.TableName == name);
            }

            return template;
        }
    }
}
