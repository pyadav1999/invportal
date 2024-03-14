using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface IBranchRepository:IBaseRepository<Branch>
    {
        Branch GetById(string id);
        IEnumerable<Branch> GetAllBranch();
        IEnumerable<Branch> GetAllBranchByHeadId(string id);
        IEnumerable<Branch> GetBranch(Branch model);
        void UpdateBranch(Branch branch);
    }
}
