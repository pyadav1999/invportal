using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.Entity_Models
{
    public class CalculationTable
    {

        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("TableId")]
        public string CalcId { get; set; }
        public string CalcName { get; set; }
        public string CalcFormat { get; set; }
        public string Border { get; set; }
        public string BillType { get; set; }
        public string Operations { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
