using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace AVEGIC.Models
{
    public class LoginModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        
        [BsonElement("UserName")]
        public string Username { get; set; }
        [BsonElement("Password")]
        public string Password { get; set; }

    }
}
