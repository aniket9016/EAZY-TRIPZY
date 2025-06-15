using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Cars
{
    public class CarService : ICarService
    {
        private readonly IRepositary<Car> _repositary;

        public CarService(IRepositary<Car> repositary)
        {
            _repositary = repositary;
        }

        public async Task<bool> Add(CarInsertViewModel entity, string photo)
        {
            Car model = new()
            {
                Name = entity.Name,
                Desc=entity.Desc,
                Price = entity.Price,
                Country = entity.Country,
                City = entity.City,
                image = photo,
                SeatingCapacity=entity.SeatingCapacity
            };
            return await _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            Car res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<Car> Find(Expression<Func<Car, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<CarViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            CarViewModel ViewModel = new()
            {
                ID = res.ID,
                Name = res.Name,
                Desc = res.Desc,
                Price = res.Price,
                Country = res.Country,
                City = res.City,
                SeatingCapacity = res.SeatingCapacity,
                image = res.image
            };
            return ViewModel;
        }

        public async Task<ICollection<CarViewModel>> GetAll()
        {
            ICollection<CarViewModel> ViewModel = new List<CarViewModel>();
            ICollection<Car> Model = await _repositary.GetAll();

            foreach (Car item in Model)
            {
                CarViewModel vm = new()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Desc=item.Desc,
                    Price = item.Price,
                    Country=item.Country,
                    City=item.City,
                    SeatingCapacity = item.SeatingCapacity,
                    image =item.image
                };
                ViewModel.Add(vm);
            }
            return ViewModel;
        }

        public Car GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(CarUpdateViewModel entity, string photo)
        {
            Car Model = await _repositary.Get(entity.ID);
            if (Model != null)
            {
                Model.Name = entity.Name;
                Model.Desc=entity.Desc;
                Model.Price = entity.Price;
                Model.Country = entity.Country;
                Model.City = entity.City;
                Model.SeatingCapacity = entity.SeatingCapacity;
                if (!string.IsNullOrEmpty(photo))
                {
                    Model.image = photo;
                }
                var res = await _repositary.Update(Model);
                return res;
            }
            ;
            return false;
        }
    }
}
