using Domain.ViewModel;
using Infrastructure.Service.CustomService.CarBookings;
using Infrastructure.Service.CustomService.RestaurantBookings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantBookingController : ControllerBase
    {
        private readonly IRestaurantBookingService _restaurantBookingService;

        public RestaurantBookingController(IRestaurantBookingService restaurantBookingService)
        {
            this._restaurantBookingService = restaurantBookingService;
        }

        [Route("GetAllRestaurantBooking")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await _restaurantBookingService.GetAll();
            return Ok(res);
        }

        [Route("GetRestaurantBookingByID")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _restaurantBookingService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [Route("AddRestaurantBooking")]
        [HttpPost]
        public async Task<IActionResult> Add(RestaurantBookingInsertViewModel cats)
        {
            if (ModelState.IsValid)
            {
                var res = await _restaurantBookingService.Add(cats);
                return Ok(res);
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("EditRestaurantBooking/{id}")]
        [HttpPatch] 
        public async Task<IActionResult> update(RestaurantBookingUpdateViewModel cat)
        {
            if (ModelState.IsValid)
            {
                await _restaurantBookingService.Update(cat);
                return Ok();
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("RemoveRestaurantBooking/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                await _restaurantBookingService.Delete(id);
                return Ok();
            }
            return NotFound();
        }
    }
}
