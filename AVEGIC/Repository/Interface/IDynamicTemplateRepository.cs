using MongoDB.Bson;

namespace AVEGIC.Repository.Interface
{
    public interface IDynamicTemplateRepository:IDisposable
    {
        void createCollection(string name);
        void saveData(string name, dynamic data);
        IEnumerable<dynamic> GetByAllTempData(string name);
        dynamic GetAllTempDataByReportId(string ID, string name);
        dynamic FindTempDataByUserIdAndReportId(long userId, string Id,string name);
        void updateData(string name, dynamic data);
        void deleteTempdata(string name, string Id,long userId);
        void deletecollection(string name);
    }
}
