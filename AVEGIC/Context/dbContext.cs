using AVEGIC.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using System.Data.Entity;

namespace AVEGIC.Context
{
    public class dbContext:IdbContext
    {
        private IMongoDatabase Database { get; set; }
        public IClientSessionHandle Session { get; set; }
        public MongoClient MongoClient { get; set; }
        private readonly List<Func<Task>> _commands;
        private readonly IConfiguration _configuration;


        public dbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _commands = new List<Func<Task>>();
        }

        private void ConfigureDb()
        {
            if (MongoClient != null)
            {
                return;
            }

           
            MongoClient = new MongoClient(_configuration["AVEDatabase:ConnectionString"]);

            Database = MongoClient.GetDatabase(_configuration["AVEDatabase:DatabaseName"]);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            ConfigureDb();

            return Database.GetCollection<T>(name);
        }
        public async Task<int> SaveChanges()
        {
            ConfigureDb();

            using (Session = await MongoClient.StartSessionAsync())
            {
                Session.StartTransaction();

                var commandTasks = _commands.Select(c => c());

                await Task.WhenAll(commandTasks);

                await Session.CommitTransactionAsync();
            }

            return _commands.Count;
        }

        public void Dispose()
        {
            Session?.Dispose();
            GC.SuppressFinalize(this);
        }

        public void AddCommand(Func<Task> func)
        {
            _commands.Add(func);
        }

        protected  void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Microsoft.AspNet.Identity.EntityFramework.IdentityRole>().Property(h => h.Name).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<ApplicationUser>().Property(x => x.UserName).HasMaxLength(32);

            //Map entity to table
            //Change the name of the table to be Users instead of AspNetUsers
            modelBuilder.Entity<Microsoft.AspNet.Identity.EntityFramework.IdentityUser>().ToTable("Users").Property(p => p.Id).HasColumnName("UserId");
            modelBuilder.Entity<ApplicationUser>().ToTable("Users").Property(p => p.Id).HasColumnName("UserId");
            modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.UserId, r.RoleId }).ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().HasKey(l => new { l.LoginProvider, l.ProviderKey, l.UserId }).ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims");
            modelBuilder.Entity<Microsoft.AspNet.Identity.EntityFramework.IdentityRole>().ToTable("Roles");
        }
    }
}
