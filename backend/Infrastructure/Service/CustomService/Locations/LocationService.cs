using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Locations
{
    public class LocationService : ILocationService
    {

        private readonly IRepositary<Location> _repositary;
        public LocationService(IRepositary<Location> repositary)
        {
            this._repositary = repositary;
        }

        public async Task<bool> Add(LocationInsertViewModel entity)
        {
            Location model = new()
            {
                Name = entity.name,
                address = entity.address,
                city = entity.city,
                state = entity.state,
                country = entity.country,
                zip_code = entity.zip_code,
                latitude = entity.latitude,
                longitude = entity.longitude
            };
            return await _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            Location res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<Location> Find(Expression<Func<Location, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<LocationViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            LocationViewModel ViewModel = new()
            {
                ID = res.ID,
                name = res.Name,
                address = res.address,
                city = res.city,
                state = res.state,
                country = res.country,
                zip_code = res.zip_code,
                latitude = res.latitude,
                longitude = res.longitude
            };
            return ViewModel;
        }

        public async Task<ICollection<LocationViewModel>> GetAll()
        {
            ICollection<LocationViewModel> ViewModel = new List<LocationViewModel>();
            ICollection<Location> Model = await _repositary.GetAll();

            foreach (Location item in Model)
            {
                LocationViewModel vm = new()
                {
                    ID = item.ID,
                    name = item.Name,
                    address = item.address,
                    city = item.city,
                    state = item.state,
                    country = item.country,
                    zip_code = item.zip_code,
                    latitude = item.latitude,
                    longitude = item.longitude
                };
                ViewModel.Add(vm);
            }
            return ViewModel;
        }

        public Location GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(LocationUpdateViewModel entity)
        {
            Location Model = await _repositary.Get(entity.ID);
            if (Model != null)
            {
                Model.Name = entity.name;
                Model.address = entity.address;
                Model.city = entity.city;
                Model.state = entity.state;
                Model.country = entity.country;
                Model.zip_code = entity.zip_code;
                Model.latitude = entity.latitude;
                Model.longitude = entity.longitude;             
                var res = await _repositary.Update(Model);
                return res;
            };
            return false;
        }
    }
}
