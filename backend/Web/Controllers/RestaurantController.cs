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
        public async Task<IActionResult> Add(RestaurantInsertViewModel cats)
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
        public async Task<IActionResult> update(RestaurantUpdateViewModel cat)
        {
            if (ModelState.IsValid)
            {
                var img = await UploadImage(cat.image, cat.Name);
                await _restaurantService.Update(cat, img);
                return Ok();
            }
            return BadRequest("Something Went Wrong");
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

        private async Task<String> UploadImage(IFormFile images, String id)
        {
            String file;
            String ContentPath = this.environment.ContentRootPath;
            var extension = "." + images.FileName.Split('.')[images.FileName.Split('.').Length - 1];
            if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
            {
                file = id.ToLower() + "-" + extension;
                String newFileName = Regex.Replace(file, @"[^0-9a-zA-Z.]+", "");
                var paths = Path.Combine(ContentPath, "Images\\Car");

                if (!Directory.Exists(paths))
                {
                    Directory.CreateDirectory(paths);
                }
                var path = Path.Combine(ContentPath, "Images\\Car", newFileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await images.CopyToAsync(stream);
                }
                return newFileName;
            }
            else
                return "";

        }
    }
}
