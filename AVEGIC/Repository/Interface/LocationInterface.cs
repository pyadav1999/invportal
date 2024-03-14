using AVEGIC.Common;
using AVEGIC.Entity_Models;

namespace AVEGIC.Repository.Interface
{
    public interface LocationInterface : IBaseRepository<State>
    {
        State GetById(string id);
        IEnumerable<State> GetAllState();
        IEnumerable<State> GetAllStateById(string id);
        void UpdateState(State state);
    }
    public interface DistrictInterface : IBaseRepository<District>
    {
        District GetById(string id);
        IEnumerable<District> GetAllDistrict();
        IEnumerable<District> GetAllDistrictByStateId(string id);

        void UpdateDistrict(District district);

    }
    public interface PoliceStationInterface : IBaseRepository<PoliceStation>
    {
        PoliceStation GetById(string id);
        IEnumerable<PoliceStation> GetAllPoliceStation();
        IEnumerable<PoliceStation> GetAllPoliceStationByDistrictId(string id);

        void UpdatePoliceStation(PoliceStation policestation);
    }
}
