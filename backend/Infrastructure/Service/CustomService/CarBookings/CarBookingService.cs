using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.CarBookings
{
    public class CarBookingService : ICarBookingService
    {
        private readonly IRepositary<CarBooking> _repositary;

        public CarBookingService(IRepositary<CarBooking> repositary)
        {
            this._repositary = repositary;
        }
        public async Task<bool> Add(CarBookingInsertViewModel entity)
        {
            CarBooking model = new()
            {
                userID = entity.userID,
                carID = entity.carID,
                Pickup_Location_Id = entity.Pickup_Location_Id,
                Return_Location_Id = entity.Return_Location_Id,
                PickupDate = entity.PickupDate,
                ReturnDate = entity.ReturnDate,
                BookingDate = entity.BookingDate,
                Rental_days = entity.Rental_days,
                TotalAmount = entity.TotalAmount,
                Status = entity.Status
            };
            return await _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            CarBooking res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<CarBooking> Find(Expression<Func<CarBooking, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<CarBookingViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            CarBookingViewModel ViewModel = new()
            {
                ID = res.ID,
                userID = res.userID,
                carID = res.carID,
                Pickup_Location_Id = res.Pickup_Location_Id,
                Return_Location_Id = res.Return_Location_Id,
                PickupDate = res.PickupDate,
                ReturnDate = res.ReturnDate,
                BookingDate = res.BookingDate,
                Rental_days = res.Rental_days,
                TotalAmount = res.TotalAmount,
                Status = res.Status
            };
            return ViewModel;
        }

        public async Task<ICollection<CarBookingViewModel>> GetAll()
        {
            ICollection<CarBookingViewModel> ViewModel = new List<CarBookingViewModel>();
            ICollection<CarBooking> Model = await _repositary.GetAll();

            foreach (CarBooking item in Model)
            {
                CarBookingViewModel vm = new()
                {
                    ID = item.ID,
                    userID = item.userID,
                    carID = item.carID,
                    Pickup_Location_Id = item.Pickup_Location_Id,
                    Return_Location_Id = item.Return_Location_Id,
                    PickupDate = item.PickupDate,
                    ReturnDate = item.ReturnDate,
                    BookingDate = item.BookingDate,
                    Rental_days = item.Rental_days,
                    TotalAmount = item.TotalAmount,
                    Status = item.Status
                };
                ViewModel.Add(vm);
            }
            return ViewModel;
        }

        public CarBooking GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(CarBookingUpdateViewModel entity)
        {
            CarBooking Model = await _repositary.Get(entity.ID);
            if (Model != null)
            {
                Model.userID = entity.userID;
                Model.carID = entity.carID;
                Model.Pickup_Location_Id = entity.Pickup_Location_Id;
                Model.Return_Location_Id = entity.Return_Location_Id;
                Model.PickupDate = entity.PickupDate;
                Model.ReturnDate = entity.ReturnDate;
                Model.BookingDate = entity.BookingDate;
                Model.Rental_days = entity.Rental_days;
                Model.TotalAmount=entity.TotalAmount;
                Model.Status = entity.Status;
                var res = await _repositary.Update(Model);
                return res;
            }
;
            return false;
        }
    }
}
