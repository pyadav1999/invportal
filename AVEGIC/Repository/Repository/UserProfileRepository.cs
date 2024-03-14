using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;
using Nest;

namespace AVEGIC.Repository.Repository
{
    public class UserProfileRepository : BaseRepository<UserProfile>, IUserProfile
    {
        public UserProfileRepository(IdbContext context) : base(context)
        {

        }

        public UserProfile FindByEmail(string email)
        {
            UserProfile user = new UserProfile();

            if (email != null)
            {
                //var Id = new ObjectId(id);
                user = DbSet.AsQueryable<UserProfile>().SingleOrDefault(x => x.email == email);
            }

            return user;
        }

        public IEnumerable<UserProfile> GetAllUsers()
        {
            return DbSet.AsQueryable<UserProfile>().ToList();
        }

        public IEnumerable<UserProfile> GetAllUsersByRole(long role)
        {
            List<UserProfile> result = new List<UserProfile>();
            result = DbSet.AsQueryable<UserProfile>().Where(x => x.role == role).ToList();
            if (result == null) return Enumerable.Empty<UserProfile>();
            else return result;
        }

        public UserProfile GetById(string id)
        {
            UserProfile user = new UserProfile();

            if (id != null)
            {
                var Id = new ObjectId(id);
                user = DbSet.AsQueryable<UserProfile>().SingleOrDefault(x => x.id == Id);
            }

            return user;
        }

        public UserProfile GetByUserId(long id)
        {
            UserProfile user = new UserProfile();

            if (id != null)
            {
                user = DbSet.AsQueryable<UserProfile>().SingleOrDefault(x => x.userId == id);
            }

            return user;
        }

        public void UpdateUser(UserProfile user)
        {
            if (user != null)
            {
                DbSet.ReplaceOne(Builders<UserProfile>.Filter.Eq("_id", user.id), user);
            }
        }
    }
}
