using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;

namespace AVEGIC.Entity_Models
{
    public class LocationDropdown
    {
        public LocationDropdown()
        {
            DistrictList = new List<SelectListItem>();
        }

        [DisplayName("District")]
        public List<SelectListItem> DistrictList
        {
            get;
            set;
        }
    }
}
