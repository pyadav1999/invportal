using AVEGIC.Common;
using AVEGIC.Context;
using AVEGIC.Entity_Models;
using AVEGIC.Repository.Interface;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AVEGIC.Repository.Repository
{
    public class LocationRepository : BaseRepository<State>, LocationInterface
    {
        public LocationRepository(IdbContext context) : base(context)
        {

        }

        public IEnumerable<State> GetAllState()
        {
            return DbSet.AsQueryable<State>().ToList();
        }

        public IEnumerable<State> GetAllStateById(string id)
        {
            //var result= (IEnumerable<State>)DbSet.AsQueryable<State>().SingleOrDefault(x => x.HeadOfficeId == id);
            var obj = new ObjectId(id);
            List<State> result = new List<State>();
            result = DbSet.AsQueryable<State>().Where(x => x.Id == obj).ToList();
            if (result == null) return Enumerable.Empty<State>();
            else return result;

        }

        public State GetById(string id)
        {
            State state = new State();

            if (id != null)
            {
                var Id = new ObjectId(id);
                state = DbSet.AsQueryable<State>().SingleOrDefault(x => x.Id == Id);
            }

            return state;
        }
        public void UpdateState(State state)
        {
            if (state != null)
            {
                DbSet.ReplaceOne(Builders<State>.Filter.Eq("_id", state.Id), state);
            }
        }


    }
    public class DistrictRepository : BaseRepository<District>, DistrictInterface
    {
        public DistrictRepository(IdbContext context) : base(context)
        {

        }
        public IEnumerable<District> GetAllDistrict()
        {
            return DbSet.AsQueryable<District>().ToList();
        }

        public IEnumerable<District> GetAllDistrictByStateId(string id)
        {
            //var result= (IEnumerable<District>)DbSet.AsQueryable<District>().SingleOrDefault(x => x.HeadOfficeId == id);
            var obj = new ObjectId(id);
            List<District> result = new List<District>();
            result = DbSet.AsQueryable<District>().Where(x => x.StateId == id).ToList();
            if (result == null) return Enumerable.Empty<District>();
            else return result;

        }

        public District GetById(string id)
        {
            District district = new District();

            if (id != null)
            {
                var Id = new ObjectId(id);
                district = DbSet.AsQueryable<District>().SingleOrDefault(x => x.Id == Id);
            }

            return district;
        }
        public void UpdateDistrict(District district)
        {
            if (district != null)
            {
                DbSet.ReplaceOne(Builders<District>.Filter.Eq("_id", district.Id), district);
            }
        }

    }
    public class PoliceStationRepository : BaseRepository<PoliceStation>, PoliceStationInterface
    {
        public PoliceStationRepository(IdbContext context) : base(context)
        {

        }
        public IEnumerable<PoliceStation> GetAllPoliceStation()
        {
            return DbSet.AsQueryable<PoliceStation>().ToList();
        }

        public IEnumerable<PoliceStation> GetAllPoliceStationByDistrictId(string id)
        {
            //var result= (IEnumerable<PoliceStation>)DbSet.AsQueryable<PoliceStation>().SingleOrDefault(x => x.HeadOfficeId == id);
            var obj = new ObjectId(id);
            List<PoliceStation> result = new List<PoliceStation>();
            result = DbSet.AsQueryable<PoliceStation>().Where(x => x.DistrictId == id).ToList();
            if (result == null) return Enumerable.Empty<PoliceStation>();
            else return result;

        }

        public PoliceStation GetById(string id)
        {
            PoliceStation policestation = new PoliceStation();

            if (id != null)
            {
                var Id = new ObjectId(id);
                policestation = DbSet.AsQueryable<PoliceStation>().SingleOrDefault(x => x.Id == Id);
            }

            return policestation;
        }
        public void UpdatePoliceStation(PoliceStation policestation)
        {
            if (policestation != null)
            {
                DbSet.ReplaceOne(Builders<PoliceStation>.Filter.Eq("_id", policestation.Id), policestation);
            }
        }

    }
}
