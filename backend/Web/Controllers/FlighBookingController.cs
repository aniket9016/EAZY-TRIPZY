using Domain.ViewModel;
using Infrastructure.Service.CustomService.FlightBookings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightBookingController : ControllerBase
    {
        private readonly IFlightBookingService _flightBookingService;

        public FlightBookingController(IFlightBookingService flightBookingService)
        {
            _flightBookingService = flightBookingService;
        }

        [HttpGet("GetAllFlightBooking")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _flightBookingService.GetAll();
            return Ok(res);
        }

        [HttpGet("GetFlightBookingByID")]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _flightBookingService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [HttpPost("AddFlightBooking")]
        public async Task<IActionResult> Add([FromBody] FlightBookingInsertViewModel model)
        {
            if (ModelState.IsValid)
            {
                var res = await _flightBookingService.Add(model);
                return Ok(res);
            }
            return BadRequest("Something went wrong.");
        }

        [HttpPatch("EditFlightBooking/{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] FlightBookingUpdateViewModel model)
        {
            if (ModelState.IsValid)
            {
                model.flightBookingID = id;
                var res = await _flightBookingService.Update(model);
                return Ok(res);
            }
            return BadRequest("Something went wrong.");
        }

        [HttpDelete("RemoveFlightBooking/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _flightBookingService.Delete(id);
                return Ok(res);
            }
            return NotFound();
        }
    }
}
