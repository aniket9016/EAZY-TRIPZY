using Domain.Model;
using Infrastructure.ContextClass;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositaries
{
    public class Repositary<T>:IRepositary<T> where T :class
    {
        private readonly ApplicationDbContext _context; 
        private readonly DbSet<T> entities;  

        public Repositary(ApplicationDbContext _context)
        {
            this._context = _context;
            entities = _context.Set<T>();
        }

        public async Task<ICollection<T>> GetAll()
        {
            return await entities.ToListAsync();
        }

        public async Task<T> Get(Guid ID)
        {
            return await entities.FindAsync(ID);
        }


        public async Task<bool> Add(T entity)
        {
            await entities.AddAsync(entity);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> Delete(T entity)
        {
            entities.Remove(entity);
            _context.SaveChanges();
            return true;
        }


        public T GetLast()
        {
            if (entities.ToList() != null)
            {
                return entities.ToList().Last();
            }
            else
            {
                return entities.ToList().Last();
            }
        }

        public async Task<bool> Update(T entity)
        {
            entities.Update(entity);
            _context.SaveChanges();
            return true;
        }

        public async Task<T> Find(Expression<Func<T, bool>> match)   
        {
            return await entities.FirstOrDefaultAsync(match);
        }

        public async Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
        {
            return await entities.Where(match).ToListAsync();
        }
    }
}
