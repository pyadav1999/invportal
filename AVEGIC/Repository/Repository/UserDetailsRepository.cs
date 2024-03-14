
using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class UserDetailsRepository : BaseRepository<UserDetails>, IUserDetails
    {
        public UserDetailsRepository(IdbContext context) : base(context)
        {

        }

        public IEnumerable<UserDetails> GetAllUsersByProfile(long profile)
        {
            List<UserDetails> result = new List<UserDetails>();
            result = DbSet.AsQueryable<UserDetails>().Where(x => x.profile == profile).ToList();
            if (result == null) return Enumerable.Empty<UserDetails>();
            else return result;
        }

        public UserDetails GetById(string id)
        {
            UserDetails user = new UserDetails();

            if (id != null)
            {
                var Id = new ObjectId(id);
                user = DbSet.AsQueryable<UserDetails>().SingleOrDefault(x => x.id == Id);
            }

            return user;
        }

        public UserDetails GetByUserId(long id)
        {
            UserDetails user = new UserDetails();

            if (id != null)
            {
                user = DbSet.AsQueryable<UserDetails>().SingleOrDefault(x => x.userId == id);
            }

            return user;
        }

        public void UpdateUserDetails(UserDetails user)
        {
            if (user != null)
            {
                DbSet.ReplaceOne(Builders<UserDetails>.Filter.Eq("userId", user.userId), user);
            }
        }
    }
}
