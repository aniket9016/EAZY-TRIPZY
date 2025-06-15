
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Domain.ViewModel
{
    public class FlightViewModel
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "FlightName is required...")]
        [DisplayName("Flight Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Enter Departing Date...")]
        [DisplayName("Departing Date")]
        public DateTime DepartingDate { get; set; }

        [DisplayName("Returning Date")]
        public DateTime? ReturningDate { get; set; }

        [Required(ErrorMessage = "Enter Departing Time...")]
        [DisplayName("Departing Time")]
        public string DepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Returning Time...")]
        [DisplayName("Returning Time")]
        public string ReturningTime { get; set; }

        [Required(ErrorMessage = "Enter Departing Country...")]
        [DisplayName("Departing Country")]
        public string DepartingCountry { get; set; }

        [Required(ErrorMessage = "Enter Departing City...")]
        [DisplayName("Departing City")]
        public string DepartingCity { get; set; }

        public string CombinedDepLocation { get; set; }
        public string CombinedDestination { get; set; }

        [DisplayName("Destination Country")]
        public string DestinationCountry { get; set; }

        [DisplayName("Destination City")]
        public string DestinationCity { get; set; }

        [Required(ErrorMessage = "Enter Return Departing Time...")]
        [DisplayName("Return Departing Time")]
        public string ReturnDepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Return Arriving Time...")]
        [DisplayName("Return Arriving Time")]
        public string ReturnArrivingTime { get; set; }

        [Required(ErrorMessage = "Enter Flight Type...")]
        [DisplayName("Flight Type")]
        public string Type { get; set; }

        [Required(ErrorMessage = "Enter Price...")]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0")]
        [DisplayName("Price")]
        public int Price { get; set; }

        [DisplayName("Image")]
        public string Image { get; set; }
    }

    public class FlightInsertViewModel
    {
        [Required(ErrorMessage = "FlightName is required...")]
        [DisplayName("Flight Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Enter Departing Date...")]
        public DateTime DepartingDate { get; set; }

        public DateTime? ReturningDate { get; set; }

        [Required(ErrorMessage = "Enter Departing Time...")]
        public string DepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Returning Time...")]
        public string ReturningTime { get; set; }

        [Required(ErrorMessage = "Enter Departing Country...")]
        public string DepartingCountry { get; set; }

        [Required(ErrorMessage = "Enter Departing City...")]
        public string DepartingCity { get; set; }

        public string CombinedDepLocation { get; set; }
        public string CombinedDestination { get; set; }
        public string DestinationCountry { get; set; }
        public string DestinationCity { get; set; }

        [Required(ErrorMessage = "Enter Return Departing Time...")]
        public string ReturnDepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Return Arriving Time...")]
        public string ReturnArrivingTime { get; set; }

        [Required(ErrorMessage = "Enter Flight Type...")]
        public string Type { get; set; }

        [Required(ErrorMessage = "Enter Price...")]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public int Price { get; set; }

        [DisplayName("Image")]
        [Required(ErrorMessage = "Please upload flight image...")]
        public IFormFile? Image { get; set; }
    }

    public class FlightUpdateViewModel
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "FlightName is required...")]
        [DisplayName("Flight Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Enter Departing Date...")]
        public DateTime DepartingDate { get; set; }

        public DateTime? ReturningDate { get; set; }

        [Required(ErrorMessage = "Enter Departing Time...")]
        public string DepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Returning Time...")]
        public string ReturningTime { get; set; }

        [Required(ErrorMessage = "Enter Departing Country...")]
        public string DepartingCountry { get; set; }

        [Required(ErrorMessage = "Enter Departing City...")]
        public string DepartingCity { get; set; }

        public string CombinedDepLocation { get; set; }
        public string CombinedDestination { get; set; }
        public string DestinationCountry { get; set; }
        public string DestinationCity { get; set; }

        [Required(ErrorMessage = "Enter Return Departing Time...")]
        public string ReturnDepartingTime { get; set; }

        [Required(ErrorMessage = "Enter Return Arriving Time...")]
        public string ReturnArrivingTime { get; set; }

        [Required(ErrorMessage = "Enter Flight Type...")]
        public string Type { get; set; }

        [Required(ErrorMessage = "Enter Price...")]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public int Price { get; set; }

        [DisplayName("Image")]
        public IFormFile? Image { get; set; }

        public string? ExistingImage { get; set; }
    }
}
