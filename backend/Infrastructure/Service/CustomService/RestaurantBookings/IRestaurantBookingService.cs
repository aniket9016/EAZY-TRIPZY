using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.RestaurantBookings
{
    public interface IRestaurantBookingService
    {
        Task<ICollection<RestaurantBookingViewModel>> GetAll();
        Task<RestaurantBookingViewModel> Get(Guid ID);
        RestaurantBooking GetLast();
        Task<bool> Add(RestaurantBookingInsertViewModel entity);
        Task<bool> Update(RestaurantBookingUpdateViewModel entity);
        Task<bool> Delete(Guid id);
        Task<RestaurantBooking> Find(Expression<Func<RestaurantBooking, bool>> match);
    }
}
