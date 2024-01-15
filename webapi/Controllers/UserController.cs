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
        public async Task<ActionResult<User>> RegisterUser(DeskundigeDto data)
        {
            try{
                var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == data.Email);

                if (tried_user == null){
                    User user = new User(data.Email, data.Password, data.Role);
                    Deskundige deskundige = new Deskundige(data.Email, data.Password, data.Role, data.Postcode, data.Naam, data.Leeftijd, data.Beschikbaarheid, data.BenaderingVoorkeur, data.BenaderingCommercieel, data.Aandoening);
                    _context.Users.Add(user);
                    _context.Deskundigen.Add(deskundige);
                    
                    return user;
                }
                else if (tried_user != null){
                    // Deze email is al geregistreerd:
                    return StatusCode(500, "Deze email is al geregistreerd.");
                }
                else{
                    // Gaat van alles fout:
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
        public async Task<ActionResult<User>> GetUser([FromQuery] string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound();
            }
            else if (user.Password != password){
                return new ObjectResult("Verkeerde Wachtwoord") { StatusCode = 404 };
            }
            else if (user.Password == password){
                return user;
            }

            return BadRequest("Geet nie goed");
        }

    }
}