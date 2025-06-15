using Domain.ViewModel;
using Infrastructure.Service.CustomService.Cars;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        private readonly IWebHostEnvironment environment;

        public CarController(ICarService carService, IWebHostEnvironment environment)
        {
            _carService = carService;
            this.environment = environment;
        }

        [HttpGet("GetAllCar")]
        public async Task<IActionResult> GetAll()
        {
            var res = await _carService.GetAll();
            return Ok(res);
        }

        [HttpGet("GetCarByID")]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _carService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [HttpPost("AddCar")]
        public async Task<IActionResult> Add([FromForm] CarInsertViewModel car)
        {
            if (!ModelState.IsValid || car.image == null || car.image.Length == 0)
                return BadRequest("Invalid car data or image missing.");

            var img = await UploadImage(car.image, car.Name);
            if (string.IsNullOrEmpty(img))
                return BadRequest("Unsupported image format. Only PNG, JPG, JPEG allowed.");

            var res = await _carService.Add(car, img);
            return Ok(res);
        }

        [HttpPatch("EditCar/{ID}")]
        public async Task<IActionResult> Update([FromRoute] Guid ID, [FromForm] CarUpdateViewModel car)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid car data.");

            car.ID = ID; // 🛠 Assign ID from route to model

            string img = string.Empty;
            if (car.image != null && car.image.Length > 0)
            {
                img = await UploadImage(car.image, car.Name);
                if (string.IsNullOrEmpty(img))
                    return BadRequest("Unsupported image format.");
            }

            await _carService.Update(car, img);
            return Ok();
        }

        [HttpDelete("RemoveCar/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                await _carService.Delete(id);
                return Ok();
            }
            return NotFound();
        }

        private async Task<string> UploadImage(IFormFile image, string name)
        {
            var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
            var ext = Path.GetExtension(image.FileName).ToLower();

            if (!allowedExtensions.Contains(ext))
                return string.Empty;

            var fileName = $"{Guid.NewGuid()}{ext}"; 
            var folderPath = Path.Combine(environment.ContentRootPath, "Images", "Car");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
