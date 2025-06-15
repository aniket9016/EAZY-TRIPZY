using Azure;
using Domain.Model;
using Domain.ViewModel;
using Infrastructure.ContextClass;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Response = Domain.Model.Response;


namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserInsertViewModel newUser)
        {
            if (newUser == null || string.IsNullOrWhiteSpace(newUser.Email) || string.IsNullOrWhiteSpace(newUser.Password))
                return BadRequest(new Response
                {
                    Status = 400,
                    Message = "Username and password are required."
                });

            var existingUser = await _context.User.FirstOrDefaultAsync(u => u.Email == newUser.Email);
            if (existingUser != null)
                return Conflict(new Response
                {
                    Status = 409,
                    Message = "Email already exists."
                });

            var user = new User
            {
                Name = newUser.Name,
                Password = newUser.Password,
                Email = newUser.Email,
                DOB = newUser.DOB
            };

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user.Name, user.Email);

            return Ok(new
            {
                Status = 200,
                Message = "Registration successful.",
                Token = token
            });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginViewModel loginRequest)
        {
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.PasswordHash))
                return BadRequest(new Response
                {
                    Status = 400,
                    Message = "Username and password are required."
                });

            var user = _context.User
                //.Include(u => u.Role)
                .FirstOrDefault(u => u.Email == loginRequest.Email && u.Password == loginRequest.PasswordHash);

            if (user == null)
                return Unauthorized(new Response
                {
                    Status = 401,
                    Message = "Invalid credentials."
                });

            var token = GenerateJwtToken(user.Name, user.Email);

            return Ok(new
            {
                Status = 200,
                Message = "Login successful.",
                Token = token,
                Name = user.Name,
            });
        }

        private string GenerateJwtToken(string name, string email)
        {
            var jwtKey = _configuration["Jwt:Key"];
            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, name),
                new Claim(ClaimTypes.Email, email),
            };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
