using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.Entity_Models
{
    public class Department
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
