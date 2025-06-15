using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class CarBooking
    {    
        public Guid ID { get; set; }
        public Guid userID { get; set; }
        public virtual User user { get; set; }
        public Guid carID { get; set; }
        public virtual Car car { get; set; }
        public Guid Pickup_Location_Id { get; set; }
        public virtual Location Pickup_Location { get; set; }
        public Guid Return_Location_Id { get; set; }
        public virtual Location Return_Location { get; set; }
        public DateTime PickupDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime BookingDate { get; set; }
        public int Rental_days { get; set; }
        public int TotalAmount { get; set; }
        public String Status { get; set; }
    }
}
