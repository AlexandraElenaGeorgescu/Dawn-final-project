using Microsoft.AspNetCore.Mvc;
using registration_api.Services;

namespace registration_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            var success = await _userService.Register(userDto);

            if (success)
            {
                return Ok(); // Registration successful
            }
            else
            {
                return BadRequest(); // Registration failed
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            var success = await _userService.Login(userDto);
            if (success==null)
            {
                return NotFound("Announcement was not found");
            }

            return Ok(success); // Login successful
        }

    }
}
