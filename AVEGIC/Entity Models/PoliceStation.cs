using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class PoliceStation
    {
        public ObjectId Id { get; set; }
        public string StateId { get; set; }
        public string DistrictId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
