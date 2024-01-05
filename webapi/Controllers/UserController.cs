using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;
using DemoApp.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserController(ApiDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] string email, string password)
        {
            try{
            var tried_user = await _context.Users.FindAsync(email);
            if (tried_user == null){
                return NotFound("User not found");
            }
            else if (tried_user.Password == password){
                return Ok("Login successful");
            }
            else{
                return BadRequest("Invalid login attempt");
            }
            }
            catch (Exception e){
                Console.WriteLine(e);
                return StatusCode(500, "error");
            }
        }

    }
}