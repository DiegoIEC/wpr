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

        // POST: api/User/register
        [HttpPost]
        public async Task<ActionResult<User>> RegisterUser(string name, string email, string password, string postal, string availability, string born, List<string> beperkingen, bool commercial, string preference, string role)
        {
            try{
                User user = new User(email, password, role);
                Deskundige deskundige = new Deskundige(email, password, role, postal, name, leeftijd:10, beschikbaarheid:availability, aandoening:"ja", benaderingCommercieel:"ja", benaderingVoorkeur:"ja");
                var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

                if (tried_user == null){
                    // Registratie logica:
                    return NotFound();
                }
                else if (tried_user != null){
                    // Deze email is al geregistreerd:
                    return BadRequest();
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