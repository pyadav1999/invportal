using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IUserLetterHead : IBaseRepository<UserLetterHead>
    {
        UserLetterHead GetById(string id);
        UserLetterHead GetByUserId(long id);
        void UpdateLetterHead(UserLetterHead userLetterHead);
    }
}
