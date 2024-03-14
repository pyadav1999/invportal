using AutoMapper;
using AVEGIC.Entity_Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AVEGIC.View_Models
{
    public class AgencyViewModel
    {
        //public AgencyViewModel()
        //{

            
        //}
        [BsonId]
        public ObjectId Id { get; set; }
        public string AgencyId { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }
        public string Profile { get; set; }
        public string Address_Line1 { get; set; }
        public string Address_Line2 { get; set; }
        public string Mobile { get; set; }
        public string Website { get; set; }
        public string Email { get; set; }
        public string PAN_NO { get; set; }
        public string GST_NO { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
