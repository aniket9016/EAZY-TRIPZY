using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class BaseEntity
    {
        [Key]
        public Guid ID { get; set; }

        [Required(ErrorMessage ="Enter Name")]
        [DataType("varchar(max)")]
        public String Name { get; set; }
    }
}
