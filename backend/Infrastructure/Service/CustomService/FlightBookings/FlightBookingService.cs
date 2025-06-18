using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.FlightBookings
{
    public class FlightBookingService : IFlightBookingService
    {
        private readonly IRepositary<FlightBooking> _repositary;

        public FlightBookingService(IRepositary<FlightBooking> repositary)
        {
            _repositary = repositary;
        }

        public Task<bool> Add(FlightBookingInsertViewModel entity)
        {
            FlightBooking model = new()
            {
                userID = entity.userID,
                FlightID = entity.flightID,
                BookingDate = entity.bookingDate,
                Adults = entity.adults,
                kids = entity.kids,
                Price = entity.price
            };
            return _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            var res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<FlightBooking> Find(Expression<Func<FlightBooking, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<FlightBookingViewModel> Get(Guid id)
        {
            var res = await _repositary.Get(id);
            if (res == null) return null;

            return new FlightBookingViewModel
            {
                flightBookingID = res.FlightBookingID,
                userID = res.userID,
                flightID = res.FlightID,
                bookingDate = res.BookingDate,
                adults = res.Adults,
                kids = res.kids,
                price = res.Price
            };
        }

        public async Task<ICollection<FlightBookingViewModel>> GetAll()
        {
            var res = await _repositary.GetAll();
            var viewModel = new List<FlightBookingViewModel>();

            foreach (var item in res)
            {
                viewModel.Add(new FlightBookingViewModel
                {
                    flightBookingID = item.FlightBookingID,
                    userID = item.userID,
                    flightID = item.FlightID,
                    bookingDate = item.BookingDate,
                    adults = item.Adults,
                    kids = item.kids,
                    price = item.Price
                });
            }

            return viewModel;
        }

        public FlightBooking GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(FlightBookingUpdateViewModel entity)
        {
            var model = await _repositary.Get(entity.flightBookingID);
            if (model == null) return false;

            model.FlightBookingID = entity.flightBookingID;
            model.userID = entity.userID;
            model.FlightID = entity.flightID;
            model.BookingDate = entity.bookingDate;
            model.Adults = entity.adults;
            model.kids = entity.kids;
            model.Price = entity.price;

            return await _repositary.Update(model);
        }
    }
}
