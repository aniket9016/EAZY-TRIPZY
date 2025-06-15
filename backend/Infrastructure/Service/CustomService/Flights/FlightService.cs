using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Flights
{
    public class FlightService:IFlightService
    {
        private readonly IRepositary<Flight> _repositary;
        public FlightService(IRepositary<Flight> repositary)
        {
            _repositary = repositary;
        }

        public async Task<bool> Add(FlightInsertViewModel entity, string photo)
        {
            Flight model = new()
            {
                Name = entity.Name,
                DepartingDate = entity.DepartingDate,
                ReturningDate = entity.ReturningDate,
                DepartingTime = entity.DepartingTime,
                ReturningTime = entity.ReturningTime,
                DepartingCountry = entity.DepartingCountry,
                DepartingCity = entity.DepartingCity,
                CombinedDepLocation = entity.CombinedDepLocation,
                CombinedDestination = entity.CombinedDestination,
                DestinationCountry = entity.DepartingCountry,
                DestinationCity = entity.DestinationCity,
                ReturnDepartingTime = entity.ReturnDepartingTime,
                ReturnArrivingTime = entity.ReturnArrivingTime,
                Type = entity.Type,
                Price = entity.Price,
                image = photo
            };
            return await _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            Flight res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<Flight> Find(Expression<Func<Flight, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<FlightViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            FlightViewModel model = new()
            {
                Id = res.ID,
                Name = res.Name,
                DepartingDate = res.DepartingDate,
                ReturningDate = res.ReturningDate,
                DepartingTime = res.DepartingTime,
                ReturningTime = res.ReturningTime,
                DepartingCountry = res.DepartingCountry,
                DepartingCity = res.DepartingCity,
                CombinedDepLocation = res.CombinedDepLocation,
                CombinedDestination = res.CombinedDestination,
                DestinationCountry = res.DepartingCountry,
                DestinationCity = res.DestinationCity,
                ReturnDepartingTime = res.ReturnDepartingTime,
                ReturnArrivingTime = res.ReturnArrivingTime,
                Type = res.Type,
                Price = res.Price,
                Image = res.image
            };
            return model;
        }

        public async Task<ICollection<FlightViewModel>> GetAll()
        {
            ICollection<FlightViewModel> viewModels = new List<FlightViewModel>();
            ICollection<Flight> Model = await _repositary.GetAll();
            foreach (Flight item in Model)
            {
                FlightViewModel flights = new()
                {
                    Id = item.ID,
                    Name = item.Name,
                    DepartingDate = item.DepartingDate,
                    ReturningDate = item.ReturningDate,
                    DepartingTime = item.DepartingTime,
                    ReturningTime = item.ReturningTime,
                    DepartingCountry = item.DepartingCountry,
                    DepartingCity = item.DepartingCity,
                    CombinedDepLocation = item.CombinedDepLocation,
                    CombinedDestination = item.CombinedDestination,
                    DestinationCountry = item.DepartingCountry,
                    DestinationCity = item.DestinationCity,
                    ReturnDepartingTime = item.ReturnDepartingTime,
                    ReturnArrivingTime = item.ReturnArrivingTime,
                    Type = item.Type,
                    Price = item.Price,
                    Image = item.image

                };
                viewModels.Add(flights);
            }
            return viewModels;
        }

        public Flight GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(FlightUpdateViewModel entity, string photo)
        {
            Flight model = await _repositary.Get(entity.Id);
            if (model != null)
            {
                model.Name = entity.Name;
                model.DepartingDate = entity.DepartingDate;
                model.ReturningDate = entity.ReturningDate;
                model.DepartingTime = entity.DepartingTime;
                model.ReturningTime = entity.ReturningTime;
                model.DepartingCountry = entity.DepartingCountry;
                model.DepartingCity = entity.DepartingCity;
                model.CombinedDepLocation = entity.CombinedDepLocation;
                model.CombinedDestination = entity.CombinedDestination;
                model.DestinationCountry = entity.DestinationCountry;
                model.DestinationCity = entity.DestinationCity;
                model.ReturnDepartingTime = entity.ReturnDepartingTime;
                model.ReturnArrivingTime = entity.ReturnArrivingTime;
                model.Type = entity.Type;
                model.Price = entity.Price;
                model.image = photo;

                var res = await _repositary.Update(model);
                return res;
            }
            return false;
        }
    }
}
