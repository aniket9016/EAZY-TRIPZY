using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.FlightBookings
{
    public interface IFlightBookingService
    {
        Task<ICollection<FlightBookingViewModel>> GetAll();
        Task<FlightBookingViewModel> Get(Guid id);
        FlightBooking GetLast();
        Task<bool> Add(FlightBookingInsertViewModel entity);
        Task<bool> Update(FlightBookingUpdateViewModel entity);
        Task<bool> Delete(Guid id);
        Task<FlightBooking> Find(Expression<Func<FlightBooking, bool>> match);
    }
}
