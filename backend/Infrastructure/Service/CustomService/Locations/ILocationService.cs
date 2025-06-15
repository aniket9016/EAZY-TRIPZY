using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Locations
{
    public interface ILocationService
    {
        Task<ICollection<LocationViewModel>> GetAll();
        Task<LocationViewModel> Get(Guid ID);
        Location GetLast();
        Task<bool> Add(LocationInsertViewModel entity);
        Task<bool> Update(LocationUpdateViewModel entity);
        Task<bool> Delete(Guid id);
        Task<Location> Find(Expression<Func<Location, bool>> match);
    }
}
