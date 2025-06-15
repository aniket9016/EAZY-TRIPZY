using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
   public class Flight:BaseEntity
    {
        [Required(ErrorMessage = "Enter Departing Date...")]
        public DateTime	DepartingDate { get; set; }

        
        public DateTime? ReturningDate { get; set; }

        [Required(ErrorMessage = "Enter Departing Time...")]
        [DataType("varchar(20)")]
        public String DepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Returning Time...")]
        [DataType("varchar(20)")]
        public String ReturningTime { get; set; }

        [Required(ErrorMessage = "Enter Departing Country...")]
        [DataType("varchar(30)")]
        public String DepartingCountry { get; set; }

        [Required(ErrorMessage = "Enter Departing City...")]
        [DataType("varchar(30)")]
        public String DepartingCity { get; set; }


        public string CombinedDepLocation { get; set; }
        public string CombinedDestination { get; set; }
        public string DestinationCountry { get; set; }
        public string DestinationCity { get; set; }

        [Required(ErrorMessage = "Enter Return Departing Time...")]
        [DataType("varchar(20)")]
        public String ReturnDepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Return Arriving Time...")]
        [DataType("varchar(20)")]
        public String ReturnArrivingTime { get; set; }

        [Required(ErrorMessage = "Enter Flight Type...")]
        [DataType("varchar(20)")]
        public String Type { get; set; }

        [Required(ErrorMessage = "Enter Amount...")]
        public int Price { get; set; }

        [DisplayName("Image")]
        [Required(ErrorMessage = "Please Upload Flight image...")]
        public String image { get; set; }

        public virtual List<FlightBooking> FlightBookings { get; set; }

    }
}
