using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.RestaurantBookings
{
    public class RestaurantBookingService : IRestaurantBookingService
    {
        private readonly IRepositary<RestaurantBooking> _repositary;
        public RestaurantBookingService(IRepositary<RestaurantBooking> repositary)
        {
            this._repositary = repositary;
        }

        public Task<bool> Add(RestaurantBookingInsertViewModel entity)
        {
            RestaurantBooking model = new()
            {
                RestaurantID = entity.RestaurantID,
                userID = entity.userID,
                MealTime = entity.MealTime,
                TotalPeople = entity.TotalPeople,
                BookingDate = entity.BookingDate,
                MealDate = entity.MealDate,
                status = "Pending" 
            };
            return _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            RestaurantBooking res=await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<RestaurantBooking> Find(Expression<Func<RestaurantBooking, bool>> match)
        {
           return await _repositary.Find(match);
        }

        public async Task<RestaurantBookingViewModel> Get(Guid ID)
        {
            var res=await _repositary.Get(ID);
            RestaurantBookingViewModel ViewModel = new()
            {
                RestaurantBookingId = res.RestaurantBookingId,
                RestaurantID = res.RestaurantID,
                userID = res.userID,
                MealTime = res.MealTime,
                TotalPeople = res.TotalPeople,
                BookingDate = res.BookingDate,
                MealDate = res.MealDate,
                status = res.status
            };
            return ViewModel;
        }

        public async Task<ICollection<RestaurantBookingViewModel>> GetAll()
        {
           ICollection<RestaurantBookingViewModel> viewModel=new List<RestaurantBookingViewModel>();
           ICollection<RestaurantBooking> res =await _repositary.GetAll();

            foreach(RestaurantBooking item in res)
            {
                RestaurantBookingViewModel model = new()
                {
                    RestaurantBookingId = item.RestaurantBookingId,
                    RestaurantID = item.RestaurantID,
                    userID = item.userID,
                    MealTime = item.MealTime,
                    TotalPeople = item.TotalPeople,
                    BookingDate = item.BookingDate,
                    MealDate = item.MealDate,
                    status = item.status
                };
                viewModel.Add(model);
            }
            return viewModel;

        }

        public RestaurantBooking GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(RestaurantBookingUpdateViewModel entity)
        {
           RestaurantBooking model=await _repositary.Get(entity.RestaurantBookingId);
            if (model != null)
            {
                model.RestaurantID = entity.RestaurantID;
                model.userID = entity.userID;
                model.MealTime = entity.MealTime;
                model.TotalPeople = entity.TotalPeople;
                model.BookingDate = entity.BookingDate;
                model.MealDate = entity.MealDate;
                var res= await _repositary.Update(model);
                return res;
            }
            return false;
        }
    }
}
