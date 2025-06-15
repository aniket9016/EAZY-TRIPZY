using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Cars
{
    public interface ICarService
    {
        Task<ICollection<CarViewModel>> GetAll();
        Task<CarViewModel> Get(Guid ID);
        Car GetLast();
        Task<bool> Add(CarInsertViewModel entity, String photo);
        Task<bool> Update(CarUpdateViewModel entity, String photo);
        Task<bool> Delete(Guid id);
        Task<Car> Find(Expression<Func<Car, bool>> match);   
    }
}
