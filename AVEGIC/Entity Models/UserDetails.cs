using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class UserDetails
    {
        [BsonId]
        public ObjectId id { get; set; }
        public long userId { get; set; }
        public long profile { get; set; }
        public string abbrevation { get; set; }
        public string panNo { get; set; }
        public string gstNo { get; set; }
        public string bankName { get; set; }
        public string ifscCode { get; set; }
        public long accountNo { get; set; }
        public DateTime createdDate { get; set; }
        public bool isDeleted { get; set; }
    }
}
