using Domain.ViewModel;
using Infrastructure.Service.CustomService.Cars;
using Infrastructure.Service.CustomService.Restaurants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;
        private readonly IWebHostEnvironment environment;

        public RestaurantController(IRestaurantService _restaurantService, IWebHostEnvironment environment)
        {
            this._restaurantService = _restaurantService;
            this.environment = environment;
        }

        [Route("GetAllRestaurant")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await _restaurantService.GetAll();
            return Ok(res);
        }

        [Route("GetRestaurantByID")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _restaurantService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [Route("AddRestaurant")]
        [HttpPost]
        public async Task<IActionResult> Add([FromForm] RestaurantInsertViewModel cats)
        {
            if (ModelState.IsValid)
            {
                var img = await UploadImage(cats.image, cats.Name);
                var res = await _restaurantService.Add(cats, img);
                return Ok(res);
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("EditRestaurant/{id}")]
        [HttpPatch]
        public async Task<IActionResult> Update([FromForm] RestaurantUpdateViewModel cat)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid model");

            string img;

            if (cat.image != null)
            {
                img = await UploadImage(cat.image, cat.Name);
            }
            else if (!string.IsNullOrEmpty(cat.ExistingImage))
            {
                img = cat.ExistingImage;
            }
            else
            {
                var existingRestaurant = await _restaurantService.Get(cat.ID);
                if (existingRestaurant == null)
                    return NotFound("Restaurant not found");

                img = existingRestaurant.image;
            }

            await _restaurantService.Update(cat, img);
            return Ok();
        }

        [Route("RemoveRestaurant/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                await _restaurantService.Delete(id);
                return Ok();
            }
            return NotFound();
        }

        private async Task<string> UploadImage(IFormFile images, string id)
        {
            string file;
            string ContentPath = this.environment.ContentRootPath;
            var extension = "." + images.FileName.Split('.')[^1];
            if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
            {
                file = id.ToLower() + "-" + extension;
                string newFileName = Regex.Replace(file, @"[^0-9a-zA-Z.]+", "");
                var paths = Path.Combine(ContentPath, "Images\\Restaurant");

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
    }
}
