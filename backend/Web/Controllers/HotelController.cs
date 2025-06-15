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
        public async Task<IActionResult> Add([FromForm] HotelInsertViewModel hotel)
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
        public async Task<IActionResult> Update([FromForm] HotelUpdateViewModel hotelUpdate)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string imgName = hotelUpdate.ExistingImage;

                    if (hotelUpdate.Image != null && hotelUpdate.Image.Length > 0)
                    {
                        imgName = await UploadImage(hotelUpdate.Image, hotelUpdate.Name);
                    }

                    await _hotelService.Update(hotelUpdate, imgName);
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

        private async Task<string> UploadImage(IFormFile image, string name)
        {
            try
            {
                if (image == null || image.Length == 0)
                    return "";

                string contentPath = _webHostEnvironment.ContentRootPath;
                string extension = Path.GetExtension(image.FileName).ToLower();

                if (extension != ".png" && extension != ".jpg" && extension != ".jpeg")
                    throw new Exception("Unsupported image format.");

                string cleanedName = Regex.Replace(name.ToLower(), @"[^0-9a-zA-Z]+", "");
                string fileName = $"{cleanedName}-{Guid.NewGuid()}{extension}";
                string folderPath = Path.Combine(contentPath, "Images", "Hotel");

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                string filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                return fileName;
            }
            catch (Exception ex)
            {
                throw new Exception($"Image upload failed: {ex.Message}");
            }
        }
    }
}
