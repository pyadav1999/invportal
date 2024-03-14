using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class State
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public DateTime Created_Date { get; set; }
        public bool IsDeleted { get; set; }
    }
}
