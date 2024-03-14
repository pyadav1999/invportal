using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.Entity_Models
{
    public class Agency
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string? Name { get; set; } 
        public string Abbreviation { get; set; }    
        public string Profile { get; set; } 
        public string Address_Line1 { get; set; }
        public string Address_Line2 { get; set;}
        public string Mobile { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public string PAN_NO { get; set; }
        public string GST_NO { get; set; }
        public string HeaderColor { get; set; }
        public string HeaderFontSize { get; set; }
        public string HeaderFontFamily { get; set; }
        public string HeaderFontWeight { get; set; }
        public string HeaderBg { get; set; } 
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }

    }
}
