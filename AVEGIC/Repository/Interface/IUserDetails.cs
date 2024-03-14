using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IUserDetails : IBaseRepository<UserDetails>
    {
        UserDetails GetById(string id);
        UserDetails GetByUserId(long id);
        IEnumerable<UserDetails> GetAllUsersByProfile(long profile);
        void UpdateUserDetails(UserDetails user);

    }
}
