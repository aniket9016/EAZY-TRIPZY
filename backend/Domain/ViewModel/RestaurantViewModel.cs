using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Domain.ViewModel
{
    public class RestaurantViewModel
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Meals { get; set; }
        public string image { get; set; }
    }

    public class RestaurantInsertViewModel
    {
        [Required]
        public string Name { get; set; }
        public string Desc { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Meals { get; set; }

        public IFormFile? image { get; set; }
    }

    public class RestaurantUpdateViewModel
    {
        [Required]
        public Guid ID { get; set; }

        [Required]
        public string Name { get; set; }
        public string Desc { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string Meals { get; set; }

        public IFormFile? image { get; set; }
        public string? ExistingImage { get; set; }
    }
}
