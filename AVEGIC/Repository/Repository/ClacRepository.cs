using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class ClacRepository : BaseRepository<CalculationTable>,ICalc
    {
        public ClacRepository(IdbContext context) : base(context)
        {

        }

        public void delete(string name)
        {
            DbSet.DeleteOne(Builders<CalculationTable>.Filter.Eq("CalcName", name));
        }
        public void update(CalculationTable obj)
        {
            if (obj.Id != null)
            {
                //var filter = Builders<DynamicTable>.Filter.Eq(s => s.Id, obj.Id);
                //var result = await collection.ReplaceOneAsync(filter, myObject)
                DbSet.ReplaceOne(Builders<CalculationTable>.Filter.Eq("CalcName", obj.CalcName), obj);
            }
        }
        public IEnumerable<CalculationTable> GetAllCalcTable()
        {
            return DbSet.AsQueryable<CalculationTable>().ToList();
        }

        public CalculationTable GetByName(string name)
        {
            CalculationTable template = new CalculationTable();

            if (name != null)
            {
                template = DbSet.AsQueryable<CalculationTable>().SingleOrDefault(x => x.CalcName == name);
            }

            return template;
        }

    }
}
