using MongoDB.Bson;

namespace AVEGIC.Dto
{
    public class UserDto
    {
        public ObjectId id { get; set; }
        public long userId { get; set; }
        public string? name { get; set; }
        public string state { get; set; }
        public string district { get; set; }
        public string address { get; set; }
        public string mobileNo { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public long role { get; set; }
        public string? companyName { get; set; }
        public string? headOffice { get; set; }
        public string? branch { get; set; }
        public string? firmName { get; set; }
        public long profile { get; set; }
        public string abbrevation { get; set; }
        public string panNo { get; set; }
        public string gstNo { get; set; }
        public string bankName { get; set; }
        public string ifscCode { get; set; }
        public long accountNo { get; set; }
        public string letterHead { get; set; }
        public string billLetterHead { get; set; }
        public DateTime createdDate { get; set; }
        public bool isDeleted { get; set; }
    }
}
