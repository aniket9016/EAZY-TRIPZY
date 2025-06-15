using Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.ContextClass
{
   public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CarBooking>()
                .HasOne(t => t.car)
                .WithMany(t => t.carbooking)
                .HasForeignKey(t => t.carID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CarBooking>()
                .HasOne(t => t.user)
                .WithMany(t => t.carbooking)
                .HasForeignKey(t => t.userID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CarBooking>()
               .HasOne(t => t.Pickup_Location)
               .WithMany(t => t.PickupBookings)
               .HasForeignKey(t => t.Pickup_Location_Id)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<CarBooking>()
             .HasOne(t => t.Return_Location)
             .WithMany(t => t.ReturnBookings)
             .HasForeignKey(t => t.Return_Location_Id)
             .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FlightBooking>()
                .HasOne(t => t.flight)
                .WithMany(t => t.FlightBookings)
                .HasForeignKey(t => t.FlightID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FlightBooking>()
                .HasOne(t => t.user)
                .WithMany(t => t.FlightBookings)
                .HasForeignKey(t => t.userID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HotelBooking>()
               .HasOne(t => t.user)
               .WithMany(t => t.HotelBookings)
               .HasForeignKey(t => t.userID)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<HotelBooking>()
               .HasOne(t => t.hotel)
               .WithMany(t => t.HotelBookings)
               .HasForeignKey(t => t.HotelID)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RestaurantBooking>()
               .HasOne(t => t.restaurant)
               .WithMany(t => t.RestaurantBookings)
               .HasForeignKey(t => t.RestaurantID)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RestaurantBooking>()
               .HasOne(t => t.user)
               .WithMany(t => t.RestaurantBookings)
               .HasForeignKey(t => t.userID)
               .OnDelete(DeleteBehavior.Restrict);

        }
        public DbSet<User> User { get; set; }
        public DbSet<Flight> Flight { get; set; }
        public DbSet<FlightBooking> FlightBooking { get; set; }
        public DbSet<Hotel> Hotel { get; set; }
        public DbSet<HotelBooking> HotelBooking { get; set; }
        public DbSet<Car> Car { get; set; }
        public DbSet<CarBooking> CarBooking { get; set; }
        public DbSet<Restaurant> restaurant { get; set; }
        public DbSet<RestaurantBooking> RestaurantBooking { get; set; }
        
    }
}
