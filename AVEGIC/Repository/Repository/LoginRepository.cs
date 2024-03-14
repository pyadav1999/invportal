using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Models;
using AVEGIC.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class LoginRepository:BaseRepository<UserProfile>,ILoginRepository
    {
        public LoginRepository(IdbContext context) : base(context)
        {

        }

        public UserProfile FindUser(string username, string password)
        {
            UserProfile model = new UserProfile();
            if(model!=null)
            {
                model = DbSet.AsQueryable<UserProfile>().SingleOrDefault(x => x.email == username && x.password == password);
            }
          
            return model;
        }
    }
}
