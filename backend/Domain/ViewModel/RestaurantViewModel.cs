using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Domain.ViewModel
{
    public class RestaurantViewModel
    {
        public Guid ID { get; set; }
        public String Name { get; set; }
        public String Desc { get; set; }
        public String Address { get; set; }
        public String Country { get; set; }
        public String City { get; set; }
        public String PhoneNumber { get; set; }
        public String Meals { get; set; }
        public String image { get; set; }
    }

    public class RestaurantInsertViewModel
    {
        public String Name { get; set; }
        public String Desc { get; set; }
        public String Address { get; set; }
        public String Country { get; set; }
        public String City { get; set; }
        public String PhoneNumber { get; set; }
        public String Meals { get; set; }
        public IFormFile image { get; set; }
    }

    public class RestaurantUpdateViewModel : RestaurantInsertViewModel
    {
        public Guid ID { get; set; }
    }
}
