using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
   public class Hotel:BaseEntity
    {
        [Required(ErrorMessage = "Enter Description")]
        [DataType("varchar(max)")]
        public String Desc { get; set; }

        [Required(ErrorMessage = "Enter Address")]
        [DataType("varchar(40)")]
        public String Address { get; set; }

        [Required(ErrorMessage = "Enter Country")]
        [DataType("varchar(30)")]
        public String Country { get; set; }

        [Required(ErrorMessage = "Enter City")]
        [DataType("varchar(30)")]
        public String City { get; set; }                                          

        [Required(ErrorMessage = "Enter Amount")]     
        public int Price { get; set; }

        [Required(ErrorMessage = "Enter package")]
        [DataType("varchar(50)")]
        public String Package { get; set; }

        [Required(ErrorMessage = "Enter No of People")]
        [DataType("varchar(20)")]
        public String People { get; set; }

        [Required(ErrorMessage = "Enter Room")]
        [DataType("varchar(20)")]
        public String Rooms { get; set; }

        [DisplayName("Image")]
        [Required(ErrorMessage = "Please Upload Hotel image...")]
        public String image { get; set; }

        public virtual List<HotelBooking> HotelBookings { get; set; }

    }
}
