using MongoDB.Bson;

namespace AVEGIC.Dto
{
    public class UserLetterHeadDto
    {
        public ObjectId id { get; set; }
        public long userId { get; set; }
        public string letterHeadName { get; set; }
        public string billLetterHeadName { get; set; }
        public string letterHeadData { get; set; }
        public string billLetterHeadData { get; set; }
        public string letterHeadFormat { get; set; }
        public string billLetterHeadFormat { get; set; }
        public DateTime createdDate { get; set; }
        public bool isDeleted { get; set; }
    }
}
