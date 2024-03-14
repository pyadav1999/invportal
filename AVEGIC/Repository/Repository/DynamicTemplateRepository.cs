using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;
using Nest;
using System.Dynamic;

namespace AVEGIC.Repository.Repository
{
    public class DynamicTemplateRepository : IDynamicTemplateRepository
    {
        private readonly IConfiguration _configuration;
        //private IMongoDatabase Database { get; set; }
        public MongoClient MongoClient { get; set; }
        public ObjectId ReportId { get; private set; }

        public DynamicTemplateRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void createCollection(string name)
        {
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db= MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            if(name!=null)
            {
                db.CreateCollection(name);
            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
        public IEnumerable<dynamic> GetByAllTempData(string name)
        {
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            return db.GetCollection<dynamic>(name).AsQueryable<dynamic>().ToList();
        }
        public void saveData(string name, dynamic data)
        {
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            db.GetCollection<dynamic>(name).InsertOne(data);
        }

        public void updateData(string name,dynamic data)
        {
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            //db.GetCollection<dynamic>(name).InsertOne(data);
            db.GetCollection<dynamic>(name).ReplaceOne(Builders<dynamic>.Filter.Eq("ReportId", data.ReportId), data);
        }

        public void deleteTempdata(string name,string Id, long userId)
        {
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            var id = new ObjectId(Id);
            var filterBuilder = Builders<dynamic>.Filter;
            var filters = new List<FilterDefinition<dynamic>>();
            filters.Add(filterBuilder.Eq("ReportId", id));
            filters.Add(filterBuilder.Eq("UserId", userId));
            var combinedFilter = filterBuilder.And(filters);
            db.GetCollection<dynamic>(name).DeleteOne(combinedFilter);
        }
        public dynamic GetAllTempDataByReportId(string ID,string name)
        {
            //return DbSet.AsQueryable((IClientSessionHandle)Builders<Agency>.Filter.Eq("RefId", ID)).ToList();
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            var obj = new ObjectId(ID);
            dynamic obj2 = new ExpandoObject();
            var filter = Builders<dynamic>.Filter.Eq("ReportId", obj);
            obj2 = db.GetCollection<dynamic>(name).Find(filter);
            return obj2;
        }

        public void deletecollection(string name)
        {
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            db.DropCollection(name);
        }

        public dynamic FindTempDataByUserIdAndReportId(long userId, string Id, string name)
        {
            //MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            //var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            //var obj = new ObjectId(Id);
            //dynamic obj2 = new ExpandoObject();
            //var filterBuilder = Builders<dynamic>.Filter;
            //var filters = new List<FilterDefinition<dynamic>>();
            //filters.Add(filterBuilder.Eq("ReportId", obj));
            //filters.Add(filterBuilder.Eq("UserId", userId));
            //var combinedFilter = filterBuilder.And(filters);
            //var collection = db.GetCollection<dynamic>(name);
            //obj2 = collection.Find(combinedFilter);
            //return obj2;
            MongoClient MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);
            var db = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
            var obj = new ObjectId(Id);

            var filterBuilder = Builders<dynamic>.Filter;
            var filters = new List<FilterDefinition<dynamic>>();

            filters.Add(filterBuilder.Eq("ReportId", obj));
            filters.Add(filterBuilder.Eq("UserId", userId));

            var combinedFilter = filterBuilder.And(filters);

            var collection = db.GetCollection<dynamic>(name);

            // Execute the query and get the result
            var result = collection.Find(combinedFilter).ToList();

            return result;


        }
    }
}
