using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class RestaurantBooking
    {
        [Key]
        public Guid RestaurantBookingId { get; set; }
        [Required(ErrorMessage = "Enter Restaurant...")]
        public Guid RestaurantID { get; set; }
        public virtual Restaurant restaurant { get; set; }
        [Required(ErrorMessage = "Enter User....")]
        public Guid userID { get; set; }
        public virtual User user { get; set; }
        public string MealTime { get; set; }
        public string TotalPeople { get; set; }    
        public DateTime BookingDate { get; set; }
        public DateTime MealDate { get; set; }
       public String status { get; set; }
    }
}
