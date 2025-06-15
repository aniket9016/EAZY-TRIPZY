using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Hotels
{
    public class HotelService:IHotelService
    {
        private readonly IRepositary<Hotel> _repositary;

        public HotelService(IRepositary<Hotel> repositary)
        {
            _repositary = repositary;
        }

        public async Task<ICollection<HotelViewModel>> GetAll()
        {
            ICollection<HotelViewModel> ViewModel = new List<HotelViewModel>();
            ICollection<Hotel> Model = await _repositary.GetAll();
            foreach (Hotel item in Model)
            {
                HotelViewModel vm = new()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Desc = item.Desc,
                    Address = item.Address,
                    Country = item.Country,
                    City = item.City,
                    Price = item.Price,
                    Package = item.Package,
                    People = item.People,
                    Rooms = item.Rooms,
                    Image = item.image

                };
                ViewModel.Add(vm);
            }
            return ViewModel;
        }

        public async Task<bool> Add(HotelInsertViewModel entity, string photo)
        {
            Hotel model = new()
            {
                Name = entity.Name,
                Desc = entity.Desc,
                Address = entity.Address,
                Country = entity.Country,
                City = entity.City,
                Price = entity.Price,
                Package = entity.Package,
                People = entity.People,
                Rooms = entity.Rooms,
                image = photo
            };
            return await _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            Hotel res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<Hotel> Find(Expression<Func<Hotel, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<HotelViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            HotelViewModel ViewModel = new()
            {
                ID = res.ID,
                Name = res.Name,
                Desc = res.Desc,
                Address = res.Address,
                Country = res.Country,
                City = res.City,
                Price = res.Price,
                Package = res.Package,
                People = res.People,
                Rooms = res.Rooms,
                Image = res.image
            };
            return ViewModel;
        }
        public Hotel GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(HotelUpdateViewModel entity, string photo)
        {
            Hotel Model = await _repositary.Get(entity.ID);
            if (Model != null)
            {
                Model.Name = entity.Name;
                Model.Desc = entity.Desc;
                Model.Address = entity.Address;
                Model.Country = entity.Country;
                Model.City = entity.City;
                Model.Price = entity.Price;
                Model.Package = entity.Package;
                Model.People = entity.People;
                Model.Rooms = entity.Rooms;
                Model.image = photo;

                var res = await _repositary.Update(Model);
                return res;
            };
            return false;
        }
    }
}
