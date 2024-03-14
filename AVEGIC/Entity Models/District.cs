using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class District
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string StateId { get; set; }
        public string Name { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
