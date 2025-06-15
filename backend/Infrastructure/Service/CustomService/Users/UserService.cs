using Domain.Model;
using Domain.ViewModel;
using Infrastructure.Repositaries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Users
{
    public class UserService : IUserService
    {
        private readonly IRepositary<User> _repositary;

        public UserService(IRepositary<User> repositary)
        {
            _repositary = repositary;
        }

        public async Task<bool> Add(UserInsertViewModel entity)
        {
            User model = new()
            {
                Name = entity.Name,
                Email=entity.Email,
                Password=entity.Password,
                DOB = entity.DOB
            };
            return await _repositary.Add(model);
        }

        public async Task<bool> Delete(Guid id)
        {
            User res = await _repositary.Get(id);
            if (res != null)
            {
                await _repositary.Delete(res);
                return true;
            }
            return false;
        }

        public async Task<User> Find(Expression<Func<User, bool>> match)
        {
            return await _repositary.Find(match);
        }

        public async Task<UserViewModel> Get(Guid ID)
        {
            var res = await _repositary.Get(ID);
            UserViewModel ViewModel = new()
            {
                ID = res.ID,
                Name = res.Name,              
                Email = res.Email,
                Password = res.Password,
                DOB = res.DOB
            };
            return ViewModel;
        }

        public async Task<ICollection<UserViewModel>> GetAll()
        {
            ICollection<UserViewModel> ViewModel = new List<UserViewModel>();
            ICollection<User> Model = await _repositary.GetAll();

            foreach (User item in Model)
            {
                UserViewModel vm = new()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Email = item.Email,
                    Password = item.Password,
                    DOB = item.DOB
                };
                ViewModel.Add(vm);
            }
            return ViewModel;
        }

        public User GetLast()
        {
            return _repositary.GetLast();
        }

        public async Task<bool> Update(UserUpdateViewModel entity)
        {
            User Model = await _repositary.Get(entity.ID);
            if (Model != null)
            {
                Model.Name = entity.Name;
                Model.Email = entity.Email;
                Model.Password = entity.Password;
                Model.DOB = entity.DOB;
                var res = await _repositary.Update(Model);
                return res;
            }
 
            return false;
        }
    }
}
