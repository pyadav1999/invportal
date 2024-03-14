using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class InformationSheet
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Agency { get; set; }
        public string Insurer { get; set; }
        public string SheetNo { get; set; }
        public string Year { get; set; }
        public string ISId { get; set; }
        public string ReportType { get; set; }
        public string Templates { get; set; }
        public string DynamicTable { get; set; }
        public string CalculationTable { get; set; }
        public string Sequence { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
