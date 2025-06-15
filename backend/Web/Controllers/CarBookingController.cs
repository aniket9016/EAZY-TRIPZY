using Domain.ViewModel;
using Infrastructure.Service.CustomService.CarBookings;
using Infrastructure.Service.CustomService.Cars;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarBookingController : ControllerBase
    {
        private readonly ICarBookingService _carBookingService;
       
        public CarBookingController(ICarBookingService _carBookingService)
        {
            this._carBookingService = _carBookingService;         
        }

        [Route("GetAllCarBooking")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await _carBookingService.GetAll();
            return Ok(res);
        }

        [Route("GetCarBookingByID")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _carBookingService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [Route("AddCarBooking")]
        [HttpPost]
        public async Task<IActionResult> Add(CarBookingInsertViewModel cats)
        {
            if (ModelState.IsValid)
            {
                var res = await _carBookingService.Add(cats);
                return Ok(res);
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("EditCarBooking/{id}")]
        [HttpPut]
        public async Task<IActionResult> update(CarBookingUpdateViewModel cat)
        {
            if (ModelState.IsValid)
            {              
                await _carBookingService.Update(cat);
                return Ok();
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("RemoveCarBooking/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                await _carBookingService.Delete(id);
                return Ok();
            }
            return NotFound();
        }

    }
}
