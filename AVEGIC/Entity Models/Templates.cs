using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.Entity_Models
{
    public class Templates
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("TemplateId")]
        public string TemplateId { get; set; }
        public string TemplateName { get; set; }
        public string TemplateFormat { get; set; }
        public string Border { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
