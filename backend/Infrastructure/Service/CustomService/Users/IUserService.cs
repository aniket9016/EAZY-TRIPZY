using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Users
{
    public interface IUserService
    {
        Task<ICollection<UserViewModel>> GetAll();
        Task<UserViewModel> Get(Guid ID);
        User GetLast();
        Task<bool> Add(UserInsertViewModel entity);
        Task<bool> Update(UserUpdateViewModel entity);
        Task<bool> Delete(Guid id);
        Task<User> Find(Expression<Func<User, bool>> match);
    }
}
