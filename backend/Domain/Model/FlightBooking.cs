using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
   public class FlightBooking
    {
        public Guid FlightBookingID { get; set; }
        public Guid userID { get; set; }
        public virtual User user { get; set; }
        public Guid  FlightID { get; set; }
        public virtual Flight flight { get; set; }
        public DateTime BookingDate { get; set; }
        public String Adults { get; set; }
        public String kids { get; set; }
        public int Price { get; set; }
    }
}
