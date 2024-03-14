using AspNetCore.Identity.MongoDbCore.Models;
using AVEGIC.Entity_Models;
using Microsoft.Win32;
using MongoDbGenericRepository.Attributes;

namespace AVEGIC.Models
{
    [CollectionName("Users")]
    public class ApplicationUser : MongoIdentityUser<Guid>
    {
       public long UserId { get; set; }
    }
}
