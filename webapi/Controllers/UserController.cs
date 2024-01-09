using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;
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

        
        // POST: api/User/register
        /*
        email: email,
            name: name,
            password: password,
            postal: postal,
            availability: avai,
            born: birthday,
            beperkingen: beperkingen,
            commercial: commercial,
            preference: preference
        */
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(string email, string password, string postal, string availability, string born, List<string> beperkingen, bool commercial, string preference)
        {
            try{
                var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

                if (tried_user == null){
                    return NotFound();
                }
                else if (tried_user.Password == password){ // Hier nog een secure methode voor maken.
                    return tried_user;
                }
                else{
                    return BadRequest();
                }
            }
            catch (Exception e){
                Console.WriteLine(e);
                return StatusCode(500, "error");
            }
        }
        // POST: api/User/Register
        [HttpPost]
        public async Task<ActionResult<User>> RegisterUser(string email, string password)
        {
            try{
                var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

                if (tried_user == null){
                    return NotFound();
                }
                else if (tried_user.Password == password){ // Hier nog een secure methode voor maken.
                    return tried_user;
                }
                else{
                    return BadRequest();
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
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

    }
}