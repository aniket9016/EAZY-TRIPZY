using Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class RestaurantBookingViewModel
    {
        public Guid RestaurantBookingId { get; set; }      
        public Guid RestaurantID { get; set; }
        public Guid userID { get; set; }
        public string MealTime { get; set; }
        public string TotalPeople { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime MealDate { get; set; }  
        public String status { get; set; }
    }

    public class RestaurantBookingInsertViewModel
    {
        public Guid RestaurantID { get; set; }
        public Guid userID { get; set; }
        public string MealTime { get; set; }
        public string TotalPeople { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime MealDate { get; set; }
    }

    public class RestaurantBookingUpdateViewModel : RestaurantBookingInsertViewModel
    {
        public Guid RestaurantBookingId { get; set; }       
    }
}
