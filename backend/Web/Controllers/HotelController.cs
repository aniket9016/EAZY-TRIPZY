using Domain.ViewModel;
using Infrastructure.Service.CustomService.Hotels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly IHotelService _hotelService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HotelController(IHotelService hotelService, IWebHostEnvironment webHostEnvironment)
        {
            _hotelService = hotelService;
            _webHostEnvironment = webHostEnvironment;
        }

        [Route("GetAllHotel")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var res = await _hotelService.GetAll();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Route("GetHotelByID")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            try
            {
                if (id != Guid.Empty)
                {
                    var res = await _hotelService.Get(id);
                    return Ok(res);
                }
                return NotFound("Hotel ID is required.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Route("AddHotel")]
        [HttpPost]
        public async Task<IActionResult> Add(HotelInsertViewModel hotel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var img = await UploadImage(hotel.Image, hotel.Name);
                    var res = await _hotelService.Add(hotel, img);
                    return Ok(res);
                }
                return BadRequest("Validation failed.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Route("EditHotel")]
        [HttpPatch]
        public async Task<IActionResult> update(HotelUpdateViewModel hotelUpdate)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var img = await UploadImage(hotelUpdate.Image, hotelUpdate.Name);
                    await _hotelService.Update(hotelUpdate, img);
                    return Ok();
                }
                return BadRequest("Validation failed.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Route("RemoveHotel")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                if (id != Guid.Empty)
                {
                    await _hotelService.Delete(id);
                    return Ok();
                }
                return NotFound("Hotel ID is required.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        private async Task<string> UploadImage(IFormFile images, string id)
        {
            try
            {
                string file;
                string ContentPath = this._webHostEnvironment.ContentRootPath;
                var extension = "." + images.FileName.Split('.')[^1];

                if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
                {
                    file = id.ToLower() + "-" + extension;
                    string newFileName = Regex.Replace(file, @"[^0-9a-zA-Z.]+", "");
                    var paths = Path.Combine(ContentPath, "Images\\Hotel");

                    if (!Directory.Exists(paths))
                    {
                        Directory.CreateDirectory(paths);
                    }

                    var path = Path.Combine(paths, newFileName);
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await images.CopyToAsync(stream);
                    }

                    return newFileName;
                }

                return "";
            }
            catch (Exception ex)
            {
                throw new Exception($"Image upload failed: {ex.Message}");
            }
        }

    }
}
