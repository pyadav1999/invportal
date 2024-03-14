using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class Advocate
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string? Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string Policestation { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
