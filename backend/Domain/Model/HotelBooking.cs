using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class HotelBooking
    {
        public Guid HotelBookingId { get; set; }
        public Guid userID { get; set; }
        public virtual User user { get; set; }
        public Guid HotelID { get; set; }
        public virtual Hotel hotel { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime Checkindate { get; set; }
        public DateTime Checkoutdate { get; set; }
        public string roomType { get; set; }
        public int noofPeople { get; set; }
        public string bookingStatus { get; set; }
        public int Price { get; set; }
    }
}
