using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
   public class CarBookingViewModel
    {
        public Guid ID { get; set; }
        public Guid userID { get; set; }       
        public Guid carID { get; set; }   
        public Guid Pickup_Location_Id { get; set; }
        public Guid Return_Location_Id { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime BookingDate { get; set; }
        public int Rental_days { get; set; }
        public int TotalAmount { get; set; }
        public String Status { get; set; }
    }

    public class CarBookingInsertViewModel
    {
        public Guid userID { get; set; }
        public Guid carID { get; set; }
        public Guid Pickup_Location_Id { get; set; }
        public Guid Return_Location_Id { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime BookingDate { get; set; }
        public int Rental_days { get; set; }
        public int TotalAmount { get; set; }
        public String Status { get; set; }
    }

    public class CarBookingUpdateViewModel : CarBookingInsertViewModel
    {
        public Guid ID { get; set; }
    }
}
 