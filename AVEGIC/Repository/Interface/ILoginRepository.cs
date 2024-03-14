using AVEGIC.Common;
using AVEGIC.Entity_Models;
using AVEGIC.Models;

namespace AVEGIC.Repository.Interface
{
    public interface ILoginRepository:IBaseRepository<UserProfile>
    {
        UserProfile FindUser(string username,string password); 
    }
}
