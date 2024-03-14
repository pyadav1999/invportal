using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class DynamicTable
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("TableId")]
        public string TableId { get; set; }
        public string TableName { get; set; }
        public string TableFormat { get; set; }
        public string Border { get; set; }
        public string Display { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
