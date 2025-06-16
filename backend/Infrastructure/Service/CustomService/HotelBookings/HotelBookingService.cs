using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.HotelBookings
{
    public class HotelBookingService : IHotelBookingService
    {
        private readonly IRepositary<HotelBooking> _repositary;
        public HotelBookingService(IRepositary<HotelBooking> repositary)
        {
            this._repositary = repositary;
        }

        public Task<bool> Add(HotelBookingInsertViewModel entity)
        {
            HotelBooking model = new()
            {
                userID = entity.userID,
                HotelID = entity.HotelID,
                Checkindate = entity.Checkindate,
                Checkoutdate = entity.Checkoutdate,
                roomType = entity.roomType,
                BookingDate = entity.BookingDate,
                noofPeople = entity.noofPeople,
                bookingStatus = "Pending",
                Price = entity.Price
            };
            return _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            HotelBooking res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<HotelBooking> Find(Expression<Func<HotelBooking, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<HotelBookingViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            HotelBookingViewModel ViewModel = new()
            {
                HotelBookingId = res.HotelBookingId,
                userID = res.userID,
                HotelID = res.HotelID,
                Checkindate = res.Checkindate,
                Checkoutdate = res.Checkoutdate,
                roomType = res.roomType,
                BookingDate = res.BookingDate,
                noofPeople = res.noofPeople,
                bookingStatus = res.bookingStatus,
                Price = res.Price
            };
            return ViewModel;
        }

        public async Task<ICollection<HotelBookingViewModel>> GetAll()
        {
            ICollection<HotelBookingViewModel> viewModel = new List<HotelBookingViewModel>();
            ICollection<HotelBooking> res = await _repositary.GetAll();

            foreach (HotelBooking item in res)
            {
                HotelBookingViewModel model = new()
                {
                    HotelBookingId = item.HotelBookingId,
                    userID = item.userID,
                    HotelID = item.HotelID,
                    Checkindate = item.Checkindate,
                    Checkoutdate = item.Checkoutdate,
                    roomType = item.roomType,
                    BookingDate = item.BookingDate,
                    noofPeople = item.noofPeople,
                    bookingStatus = "Pending",
                    Price = item.Price
                };
                viewModel.Add(model);
            }
            return viewModel;

        }

        public HotelBooking GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(HotelBookingUpdateViewModel entity)
        {
            HotelBooking model = await _repositary.Get(entity.HotelBookingId);
            if (model != null)
            {
                model.HotelBookingId = entity.HotelBookingId;
                model.userID = entity.userID;
                model.HotelID = entity.HotelID;
                model.BookingDate = entity.BookingDate;
                model.Checkindate = entity.Checkindate;
                model.Checkoutdate = entity.Checkoutdate;
                model.roomType = entity.roomType;
                model.noofPeople = entity.noofPeople;
                model.bookingStatus = entity.bookingStatus;
                model.Price = entity.Price;
                var res = await _repositary.Update(model);
                return res;
            }
            return false;
        }
    }
}
