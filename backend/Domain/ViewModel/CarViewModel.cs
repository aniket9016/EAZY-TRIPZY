using Domain.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class CarViewModel
    {
        public Guid ID { get; set; }
        public String Name { get; set; }
        public String Desc { get; set; }   
        public int Price { get; set; }    
        public String Country { get; set; }  
        public String City { get; set; } 
        public String image { get; set; }
        public int SeatingCapacity { get; set; } 
    }

    public class CarInsertViewModel
    {
        public String Name { get; set; }
        public String Desc { get; set; }
        public int Price { get; set; }
        public String Country { get; set; }
        public String City { get; set; }
        public int SeatingCapacity { get; set; }
        public IFormFile image { get; set; }
    }

    public class CarUpdateViewModel:CarInsertViewModel
    {
       public Guid ID { get; set; }
    }
}
