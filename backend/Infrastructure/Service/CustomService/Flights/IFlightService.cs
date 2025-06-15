using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Flights
{
    public interface IFlightService
    {
        Task<ICollection<FlightViewModel>> GetAll();
        Task<FlightViewModel> Get(Guid ID);
        Flight GetLast();
        Task<bool> Add(FlightInsertViewModel entity, String photo);
        Task<bool> Update(FlightUpdateViewModel entity, String photo);
        Task<bool> Delete(Guid id);
        Task<Flight> Find(Expression<Func<Flight, bool>> match);
    }
}
