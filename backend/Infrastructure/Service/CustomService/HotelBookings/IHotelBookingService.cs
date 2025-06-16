using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.HotelBookings
{
    public interface IHotelBookingService
    {
        Task<ICollection<HotelBookingViewModel>> GetAll();
        Task<HotelBookingViewModel> Get(Guid ID);
        HotelBooking GetLast();
        Task<bool> Add(HotelBookingInsertViewModel entity);
        Task<bool> Update(HotelBookingUpdateViewModel entity);
        Task<bool> Delete(Guid id);
        Task<HotelBooking> Find(Expression<Func<HotelBooking, bool>> match);
    }
}
