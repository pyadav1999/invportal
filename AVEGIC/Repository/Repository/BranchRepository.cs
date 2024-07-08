using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;
using Nest;
using System.Xml.Linq;

namespace AVEGIC.Repository.Repository
{
    public class BranchRepository : BaseRepository<Branch>, IBranchRepository
    {
        public BranchRepository(IdbContext context) : base(context)
        {

        }

        public IEnumerable<Branch> GetAllBranch()
        {
            return DbSet.AsQueryable<Branch>().ToList();
        }

        public IEnumerable<Branch> GetAllBranchByHeadId(string id)
        {
            //var result= (IEnumerable<Branch>)DbSet.AsQueryable<Branch>().SingleOrDefault(x => x.HeadOfficeId == id);
            List<Branch> result = new List<Branch>();
            result = DbSet.AsQueryable<Branch>().Where(x => x.HeadOfficeId == id).ToList();
            if (result == null) return Enumerable.Empty<Branch>();
            else return result;

        }

        public IEnumerable<Branch> GetBranch(Branch model)
        {
            List<Branch> result = new List<Branch>();
            //result = DbSet.AsQueryable<Branch>().Where(x => x.HeadOfficeId == id).ToList();
            //if (result == null) return Enumerable.Empty<Branch>();
            //else return result
            //var headId = Builders<BsonDocument>.Filter.Eq("HeadOfficeId", model.HeadOfficeId);
            //var state = Builders<BsonDocument>.Filter.Eq("State", model.State);
            //var district = Builders<BsonDocument>.Filter.Eq("District", model.District);
            //var combinedFilterOr = Builders<BsonDocument>.Filter.Or(headId, state, district);
            //result = DbSet.Find(combinedFilterOr).ToList();

            var filterBuilder = Builders<Branch>.Filter;
            var filters = new List<FilterDefinition<Branch>>();
            filters.Add(filterBuilder.Eq("HeadOfficeId", model.HeadOfficeId));
            filters.Add(filterBuilder.Eq("State", model.State));
            filters.Add(filterBuilder.Eq("District", model.District));
            var combinedFilter = filterBuilder.And(filters);
            result = DbSet.Find(combinedFilter).ToList();
            if (result == null) return Enumerable.Empty<Branch>();
            else return result;
        }

        public Branch GetById(string id)
        {
            Branch branch = new Branch();

            if (id != null)
            {
                var Id = new ObjectId(id);
                branch = DbSet.AsQueryable<Branch>().SingleOrDefault(x => x.Id == Id);
            }

            return branch;
        }
        public void UpdateBranch(Branch branch)
        {
            if (branch != null)
            {
                DbSet.ReplaceOne(Builders<Branch>.Filter.Eq("_id", branch.Id), branch);
            }
        }
    }
}
