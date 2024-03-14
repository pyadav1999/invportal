using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.Entity_Models
{
    public class Reports
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public long UserId { get; set; }
        public string Agency { get; set; }
        public string Ref2 { get; set; }
        public string year { get; set; }
        public string RefId { get; set; }
        public string ReportType { get; set; }
        public string Client { get; set; }
        public string Branch { get; set; }
        public string Department { get; set; }
        public string Advocate { get; set; }
        public string Templates { get; set; }
        public string DynamicTable { get; set; }
        public string CalculationTable { get; set; }
        public string Sequence { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
