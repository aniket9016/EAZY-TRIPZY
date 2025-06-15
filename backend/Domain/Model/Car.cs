 using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
   public class Car:BaseEntity
    {
        [Required(ErrorMessage ="Enter Description...")]
        [DataType("varchar(max)")]
        public String Desc { get; set; }

        [Required(ErrorMessage = "Enter Price...")]        
        public int Price { get; set; }

        [Required(ErrorMessage = "Enter Country...")]
        [DataType("varchar(30)")]
        public String Country { get; set; }

        [Required(ErrorMessage = "Enter City...")]
        [DataType("varchar(30)")]
        public String City { get; set; }

        [Required(ErrorMessage = "Enter Seating Capacity of Car...")]
        public int SeatingCapacity { get; set; }

        [DisplayName("Image")]
        [Required(ErrorMessage = "Please Upload Car image...")]
        public String image { get; set; }

        public virtual List<CarBooking> carbooking { get; set; }

    }
}
