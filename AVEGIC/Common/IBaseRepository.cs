namespace AVEGIC.Common
{
    public interface IBaseRepository<TEntity> : IDisposable where TEntity : class
    {
        void Add(TEntity obj);
        Task<TEntity> GetById(Guid id); 
        Task<IEnumerable<TEntity>> GetAll();
        void Remove(string id);
    }
}
