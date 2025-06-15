using Domain.ViewModel;
using Infrastructure.Service.CustomService.Cars;
using Infrastructure.Service.CustomService.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        
        public UserController(IUserService _userService)
        {
            this._userService = _userService;           
        }

        [Route("GetAllUser")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var res = await _userService.GetAll();
            return Ok(res);
        }

        [Route("GetUserByID")]
        [HttpGet]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id != Guid.Empty)
            {
                var res = await _userService.Get(id);
                return Ok(res);
            }
            return NotFound();
        }

        [Route("AddUser")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] UserInsertViewModel user)
        {
            if (ModelState.IsValid)
            {
                
                var res = await _userService.Add(user);
                return Ok(res);
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("EditUser/{id}")]
        [HttpPatch]
        public async Task<IActionResult> Update(UserUpdateViewModel user)
        {   
            if (ModelState.IsValid)
            {               
                await _userService.Update(user);
                return Ok();
            }
            return BadRequest("Something Went Wrong");
        }

        [Route("RemoveUser/{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id != Guid.Empty)
            {
                await _userService.Delete(id);
                return Ok();
            }
            return NotFound();
        }
    }
}
