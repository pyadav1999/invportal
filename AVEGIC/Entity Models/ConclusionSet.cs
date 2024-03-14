using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace AVEGIC.Entity_Models
{
    public class ConclusionSet
    {
            [BsonId]
            public ObjectId Id { get; set; }
            public string Name { get; set; }
            public string[] ConclusionSets{ get; set; }
            public DateTime Created_Date { get; set; }
            public bool IsDeleted { get; set; }

        }
    }

