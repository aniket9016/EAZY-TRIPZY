using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Restaurants
{
     public interface IRestaurantService
    {
        Task<ICollection<RestaurantViewModel>> GetAll();
        Task<RestaurantViewModel> Get(Guid ID);
        Restaurant GetLast();
        Task<bool> Add(RestaurantInsertViewModel entity, String photo);
        Task<bool> Update(RestaurantUpdateViewModel entity, String photo);
        Task<bool> Delete(Guid id);
        Task<Restaurant> Find(Expression<Func<Restaurant, bool>> match);
    }
}
