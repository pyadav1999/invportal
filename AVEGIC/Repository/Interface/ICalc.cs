using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface ICalc: IBaseRepository<CalculationTable>
    {
        CalculationTable GetByName(string name);
        void update(CalculationTable table);
        IEnumerable<CalculationTable> GetAllCalcTable();
        void delete(string name);
    }
}
