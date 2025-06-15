using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
   public class Restaurant:BaseEntity
    {
         [Required(ErrorMessage = "Enter Description")]
         [DataType("varchar(max)")]
         public String Desc { get; set; }

        [Required(ErrorMessage = "Enter Address")]
        [DataType("varchar(40)")]
        public String Address { get; set; }

        [Required(ErrorMessage = "Enter Country")]
        [DataType("varchar(40)")]
        public string Country { get; set; }

        [Required(ErrorMessage = "Enter City")]
        [DataType("varchar(40)")]
        public string City { get; set; }

        [Required(ErrorMessage = "Enter PhoneNo")]
        [DataType("varchar(10)")]
        [MaxLength(10,ErrorMessage ="Phone No must be 10 Digit")]
        public String PhoneNumber { get; set; }

        [Required(ErrorMessage = "Enter meal")]
        [DataType("varchar(30)")]
        public String Meals { get; set; }

        [DisplayName("Image")]
        [Required(ErrorMessage = "Please Upload Restaurant image...")]
        public String image { get; set; }

        public virtual List<RestaurantBooking> RestaurantBookings { get; set; }

    }
}
