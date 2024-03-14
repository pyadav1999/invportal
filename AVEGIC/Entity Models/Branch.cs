using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.Entity_Models
{
    public class Branch
    {
            
        [BsonId]
        public ObjectId Id { get; set; }
        public string HeadOfficeId { get; set; }
        public string Name { get; set; }
        public string State { get;set; }
        public string District { get; set; }
        public string Address { get; set; } 
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
