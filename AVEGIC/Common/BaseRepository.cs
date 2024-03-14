using AVEGIC.Context;
using MongoDB.Bson;
using MongoDB.Driver;


namespace AVEGIC.Common
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly IdbContext Context;
        protected IMongoCollection<TEntity> DbSet;
        protected BaseRepository(IdbContext context)
        {
            Context = context;

            DbSet = Context.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public void Add(TEntity obj)
        {
            //Context.AddCommand(() => DbSet.InsertOneAsync(obj));
            DbSet.InsertOne(obj);
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
        public virtual async Task<TEntity> GetById(Guid id)
        {
            var data = await DbSet.FindAsync(Builders<TEntity>.Filter.Eq("_id", id));
            return data.SingleOrDefault();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAll()
        {
            var all = await DbSet.FindAsync(Builders<TEntity>.Filter.Empty);
            return all.ToList();
        }

        

        public virtual void Remove(string id)
        {
            var ob = new ObjectId(id);
            //DbSet.UpdateOne(
            //    Builders<TEntity>.Filter.Eq("_id", ob),
            //    Builders<TEntity>.Update
            //    .Set("IsDeleted", true)
            //    );
            DbSet.DeleteOne(Builders<TEntity>.Filter.Eq("_id", ob));
        }
    }
   
}
