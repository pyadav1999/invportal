using AVEGIC.Common;
using AVEGIC.Entity_Models;
using MongoDB.Bson;

namespace AVEGIC.Repository.Interface
{
    public interface IConclusionSet:IBaseRepository<ConclusionSet>
    {
        ConclusionSet GetById(string id);
        IEnumerable<ConclusionSet> GetAllSets();
        IEnumerable<ConclusionSet> GetAllSetById(string ID);
        ConclusionSet GetSetByName(string name);
        void UpdateSet(ConclusionSet conclusion);
        void DeleteSet(ObjectId id);
    }
}
