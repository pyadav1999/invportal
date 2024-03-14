using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.Entity_Models
{
    public class ReportType
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Templates { get; set; }
        public string DynamicTables { get; set; }
        public string ClacTables { get; set; }
        public string Sequence { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
