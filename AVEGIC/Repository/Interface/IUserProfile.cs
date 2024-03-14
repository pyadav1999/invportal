using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IUserProfile : IBaseRepository<UserProfile>
    {
        UserProfile GetById(string id);
        UserProfile GetByUserId(long id);
        IEnumerable<UserProfile> GetAllUsers();
        IEnumerable<UserProfile> GetAllUsersByRole(long role);
        UserProfile FindByEmail(string email);
        void UpdateUser(UserProfile user);
    }
}
