using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;


namespace AVEGIC.Entity_Models
{
    public class UserProfile
    {
        [BsonId]
        public ObjectId id { get; set; }
        public  long userId { get; set; }
        public string? name { get; set; }
        public string state { get; set; }
        public string district { get; set; }
        public string address { get; set; }
        public string mobileNo { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public long role { get; set; }
        public string? companyName { get; set; }
        public string? headOffice { get; set; }
        public string? branch { get; set; }
        public string? firmName { get; set; }
        public DateTime createdDate { get; set; }
        public bool isDeleted { get; set; }

        public UserProfile() { 
        }
    }
}
