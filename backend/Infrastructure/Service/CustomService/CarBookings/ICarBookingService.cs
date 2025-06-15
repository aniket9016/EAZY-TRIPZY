using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.CarBookings
{
    public interface ICarBookingService
    {
        Task<ICollection<CarBookingViewModel>> GetAll();
        Task<CarBookingViewModel> Get(Guid ID);
        CarBooking GetLast();
        Task<bool> Add(CarBookingInsertViewModel entity);
        Task<bool> Update(CarBookingUpdateViewModel entity);
        Task<bool> Delete(Guid id);
        Task<CarBooking> Find(Expression<Func<CarBooking, bool>> match);
    }
}
