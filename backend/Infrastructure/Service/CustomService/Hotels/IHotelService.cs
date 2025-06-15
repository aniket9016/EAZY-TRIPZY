using Domain.Model;
using Domain.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Service.CustomService.Hotels
{
    public interface IHotelService
    {
        Task<ICollection<HotelViewModel>> GetAll();
        Task<HotelViewModel> Get(Guid ID);
        Hotel GetLast();
        Task<bool> Add(HotelInsertViewModel entity, String photo);
        Task<bool> Update(HotelUpdateViewModel entity, String photo);
        Task<bool> Delete(Guid id);
        Task<Hotel> Find(Expression<Func<Hotel, bool>> match);
    }
}
