using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class HotelViewModel
    {
        public Guid ID { get; set; }

        [Display(Name = "Hotel Name")]
        [Required(ErrorMessage = "Please enter the hotel name.")]
        public string Name { get; set; }

        [Display(Name = "Description")]
        [Required(ErrorMessage = "Please enter the hotel description.")]
        public string Desc { get; set; }

        [Display(Name = "Address")]
        [Required(ErrorMessage = "Please enter the address.")]
        public string Address { get; set; }

        [Display(Name = "Country")]
        [Required(ErrorMessage = "Please enter the country.")]
        public string Country { get; set; }

        [Display(Name = "City")]
        [Required(ErrorMessage = "Please enter the city.")]
        public string City { get; set; }

        [Display(Name = "Price")]
        [Required(ErrorMessage = "Please enter the price.")]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public int Price { get; set; }

        [Display(Name = "Package Duration")]
        [Required(ErrorMessage = "Please enter the package duration.")]
        public string Package { get; set; }

        [Display(Name = "Number of People")]
        [Required(ErrorMessage = "Please enter the number of people.")]
        public string People { get; set; }

        [Display(Name = "Number of Rooms")]
        [Required(ErrorMessage = "Please enter the number of rooms.")]
        public string Rooms { get; set; }

        [Display(Name = "Hotel Image")]
        [Required(ErrorMessage = "Please upload the hotel image.")]
        public string Image { get; set; }
    }

    public class HotelInsertViewModel
    {
        [Display(Name = "Hotel Name")]
        [Required(ErrorMessage = "Please enter the hotel name.")]
        public string Name { get; set; }

        [Display(Name = "Description")]
        [Required(ErrorMessage = "Please enter the hotel description.")]
        public string Desc { get; set; }

        [Display(Name = "Address")]
        [Required(ErrorMessage = "Please enter the address.")]
        public string Address { get; set; }

        [Display(Name = "Country")]
        [Required(ErrorMessage = "Please enter the country.")]
        public string Country { get; set; }

        [Display(Name = "City")]
        [Required(ErrorMessage = "Please enter the city.")]
        public string City { get; set; }

        [Display(Name = "Price")]
        [Required(ErrorMessage = "Please enter the price.")]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0.")]
        public int Price { get; set; }

        [Display(Name = "Package Duration")]
        [Required(ErrorMessage = "Please enter the package duration.")]
        public string Package { get; set; }

        [Display(Name = "Number of People")]
        [Required(ErrorMessage = "Please enter the number of people.")]
        public string People { get; set; }

        [Display(Name = "Number of Rooms")]
        [Required(ErrorMessage = "Please enter the number of rooms.")]
        public string Rooms { get; set; }

        [Display(Name = "Hotel Image")]
        [Required(ErrorMessage = "Please upload the hotel image.")]
        public IFormFile Image { get; set; }
    }

    public class HotelUpdateViewModel : HotelInsertViewModel
    {
        [Required(ErrorMessage = "Hotel ID is required.")]
        public Guid ID { get; set; }
    }
}
