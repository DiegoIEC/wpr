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

        public UserController(ApiDbContext context)
        {
            _context = context;
        }

        
        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<string>> PostUser(string email, string password)
        {
            try{
                var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
                //var tried_user = await _context.Users.FindAsync(email);
                if (tried_user == null){
                    return NotFound("User not found");
                }
                else if (tried_user.Password == password){ // Hier nog een secure methode voor maken.
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
        

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<User>> GetUser([FromQuery] string email)
        {
            var user = await _context.Users.FindAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

    }
}