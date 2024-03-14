using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class UserLetterHeadRepository: BaseRepository<UserLetterHead>, IUserLetterHead
    {
        public UserLetterHeadRepository(IdbContext context) : base(context)
        {

        }

        public UserLetterHead GetById(string id)
        {
            UserLetterHead user = new UserLetterHead();

            if (id != null)
            {
                var Id = new ObjectId(id);
                user = DbSet.AsQueryable<UserLetterHead>().SingleOrDefault(x => x.id == Id);
            }

            return user;
        }

        public UserLetterHead GetByUserId(long id)
        {
            UserLetterHead user = new UserLetterHead();

            if (id != null)
            {
                user = DbSet.AsQueryable<UserLetterHead>().SingleOrDefault(x => x.userId == id);
            }

            return user;
        }

        public void UpdateLetterHead(UserLetterHead user)
        {
            if (user != null)
            {
                DbSet.ReplaceOne(Builders<UserLetterHead>.Filter.Eq("_id", user.id), user);
            }
        }
    }
}
