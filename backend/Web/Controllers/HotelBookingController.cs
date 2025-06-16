using Domain.ViewModel;
using Infrastructure.Service.CustomService.HotelBookings;
using Infrastructure.Service.CustomService.RestaurantBookings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelBookingController : ControllerBase
    {
        private readonly IHotelBookingService _hotelBookingService;

        public HotelBookingController(IHotelBookingService hotelBookingService)
        {
            this._hotelBookingService = hotelBookingService;
        }

        [Route("GetAllHotelBooking")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await _hotelBookingService.GetAll();
            return Ok(res);
        }

        [Route("GetHotelBookingByID")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _hotelBookingService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [Route("AddHotelBooking")]
        [HttpPost]
        public async Task<IActionResult> Add(HotelBookingInsertViewModel cats)
        {
            if (ModelState.IsValid)
            {
                var res = await _hotelBookingService.Add(cats);
                return Ok(res);
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("EditHotelBooking/{id}")]
        [HttpPatch]
        public async Task<IActionResult> update(Guid id, [FromBody] HotelBookingUpdateViewModel cat)
        {
            if (ModelState.IsValid)
            {
                cat.HotelBookingId = id;
                await _hotelBookingService.Update(cat);
                return Ok();
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("RemoveHotelBooking/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                await _hotelBookingService.Delete(id);
                return Ok();
            }
            return NotFound();
        }

    }
}

