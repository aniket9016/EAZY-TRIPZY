using System;

namespace Domain.ViewModel
{
    public class FlightBookingViewModel
    {
        public Guid flightBookingID { get; set; }
        public Guid userID { get; set; }
        public Guid flightID { get; set; }
        public DateTime bookingDate { get; set; }
        public string adults { get; set; }
        public string kids { get; set; }
        public int price { get; set; }
    }

    public class FlightBookingInsertViewModel
    {
        public Guid userID { get; set; }
        public Guid flightID { get; set; }
        public DateTime bookingDate { get; set; }
        public string adults { get; set; }
        public string kids { get; set; }
        public int price { get; set; }
    }

    public class FlightBookingUpdateViewModel : FlightBookingInsertViewModel
    {
        public Guid flightBookingID { get; set; }
    }

}
