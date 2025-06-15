using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositaries
{
    public interface IRepositary<T> where T:class
    {
        Task<ICollection<T>> GetAll();  
        Task<T> Get(Guid ID);
        T GetLast();
        Task<bool> Add(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(T entity);
        Task<T> Find(Expression<Func<T, bool>> match);   
        Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match);
    }
}
