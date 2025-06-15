using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
   public class User:BaseEntity
    {

        [Required(ErrorMessage = "Enter Email...")]
        [DataType("varchar(50)")]
        [RegularExpression(@"^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+.)+[a-z]{2,5}$",ErrorMessage ="Your Email is not valid")]
        public String Email { get; set; }

        [Required(ErrorMessage = "Enter Password...")]
        [DataType("varchar(50)")]
        [MaxLength(8, ErrorMessage ="Password must contain 8 character")]     
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", ErrorMessage = "Password must contain at least one Uppercase, Lowercase ,number and special character")]
        public string Password { get; set; }
       
        [Required(ErrorMessage = "Enter Date of Birth...")]       
        public DateOnly DOB { get; set; }

        public virtual List<CarBooking> carbooking { get; set; }
        public virtual List<FlightBooking> FlightBookings { get; set; }
        public virtual List<HotelBooking> HotelBookings { get; set; }
        public virtual List<RestaurantBooking> RestaurantBookings { get; set; }

       


    }
}
