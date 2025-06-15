using Domain.ViewModel;
using Infrastructure.Service.CustomService.Cars;
using Infrastructure.Service.CustomService.Locations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;       

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;           
        }

        [Route("GetAllLocation")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await _locationService.GetAll();
            return Ok(res);
        }

        [Route("GetLocationByID")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _locationService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [Route("AddLocation")]
        [HttpPost]
        public async Task<IActionResult> Add(LocationInsertViewModel cats)
        {
            if (ModelState.IsValid)
            {         
                var res = await _locationService.Add(cats);
                return Ok(res);
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("EditLocation/{id}")]
        [HttpPatch]
        public async Task<IActionResult> update(LocationUpdateViewModel cat)
        {
            if (ModelState.IsValid)
            {                
                await _locationService.Update(cat);
                return Ok();
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("RemoveLocation/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                await _locationService.Delete(id);
                return Ok();
            }
            return NotFound();
        }
    }
}
