using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Restaurants
{
    public class RestaurantService : IRestaurantService
    {
        private readonly IRepositary<Restaurant> _repositary;

        public RestaurantService(IRepositary<Restaurant> repositary)
        {
            _repositary = repositary;
        }

        public async Task<bool> Add(RestaurantInsertViewModel entity, string photo)
        {
            Restaurant model = new()
            {
                Name = entity.Name,
                Desc = entity.Desc,
                Address = entity.Address,
                Country = entity.Country,
                City = entity.City,
                image = photo,
                PhoneNumber = entity.PhoneNumber,
                Meals = entity.Meals
            };
            return await _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            Restaurant res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<Restaurant> Find(Expression<Func<Restaurant, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<RestaurantViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            RestaurantViewModel ViewModel = new()
            {
                ID = res.ID,
                Name = res.Name,
                Desc = res.Desc,
                Address = res.Address,
                Country = res.Country,
                City = res.City,
                image = res.image,
                PhoneNumber = res.PhoneNumber,
                Meals = res.Meals
            };
            return ViewModel;
        }

        public async Task<ICollection<RestaurantViewModel>> GetAll()
        {
            ICollection<RestaurantViewModel> ViewModel = new List<RestaurantViewModel>();
            ICollection<Restaurant> Model = await _repositary.GetAll();

            foreach (Restaurant item in Model)
            {
                RestaurantViewModel vm = new()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Desc = item.Desc,
                    Address = item.Address,
                    Country = item.Country,
                    City = item.City,
                    image = item.image,
                    PhoneNumber=item.PhoneNumber,
                    Meals = item.Meals
                };
                ViewModel.Add(vm);
            }
            return ViewModel;
        }

        public Restaurant GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(RestaurantUpdateViewModel entity, string photo)
        {
            Restaurant Model = await _repositary.Get(entity.ID);
            if (Model != null)
            {
                Model.Name = entity.Name;
                Model.Desc = entity.Desc;
                Model.Address = entity.Address;
                Model.Country = entity.Country;
                Model.City = entity.City;
                if (photo != null)
                {
                    Model.image = photo;
                }
                Model.PhoneNumber = entity.PhoneNumber;
                Model.Meals = entity.Meals;
                var res = await _repositary.Update(Model);
                return res;
            }
            ;
            return false;
        }
    }
}
