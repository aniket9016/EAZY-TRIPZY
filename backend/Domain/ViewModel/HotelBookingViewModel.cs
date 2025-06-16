using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class HotelBookingViewModel
    {
        public Guid HotelBookingId { get; set; }
        public Guid userID { get; set; }
        public Guid HotelID { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime Checkindate { get; set; }
        public DateTime Checkoutdate { get; set; }
        public string roomType { get; set; }
        public int noofPeople { get; set; }
        public string bookingStatus { get; set; }
        public int Price { get; set; }
    }

    public class HotelBookingInsertViewModel
    {
        public Guid userID { get; set; }
        public Guid HotelID { get; set; }
        public DateTime Checkindate { get; set; }
        public DateTime Checkoutdate { get; set; }
        public string roomType { get; set; }
        public DateTime BookingDate { get; set; }
        public int noofPeople { get; set; }
        public string bookingStatus { get; set; }
        public int Price { get; set; }
    }

    public class HotelBookingUpdateViewModel : HotelBookingInsertViewModel
    {
        public Guid HotelBookingId { get; set; }
    }
}

