using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace AVEGIC.Context
{
    public interface IdbContext:IDisposable
    { 
        void AddCommand(Func<Task> func);
        Task<int> SaveChanges();
        IMongoCollection<T> GetCollection<T>(string name);
    }
}
