using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModel
{
    public class UserViewModel
    {
        public Guid ID { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }     
        public DateOnly DOB { get; set; }
    }

    public class UserInsertViewModel
    {
        public String Name { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public DateOnly DOB { get; set; }
    }

    public class UserUpdateViewModel:UserInsertViewModel
    {
        public Guid ID { get; set; }
    }
}
