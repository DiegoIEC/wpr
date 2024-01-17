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
        static List<int> ConvertStringToIntList(string input){

            string[] idStrings = input.Split(',');
            List<int> idList = idStrings.Select(s => int.Parse(s.Trim())).ToList();
            return idList;
        }
        static DeskundigeDto PopulateDes(DeskundigeDto leeg, Dictionary<string, string> data){
            //num, data["Email"], data["Password"], data["Role"], data["Postcode"], data["Naam"], int.Parse(data["Leeftijd"]), data["Beschikbaarheid"], data["BenaderingVoorkeur"], data["BenaderingCommercieel"], data["Aandoening"], idList
            Random rnd = new Random();
            int num = rnd.Next();
            List<int> idList = ConvertStringToIntList(data["BeperkingenIds"]);

            leeg.UserId = num;
            leeg.Email = data["Email"];
            leeg.Leeftijd = int.Parse(data["Leeftijd"]);
            leeg.Beschikbaarheid = data["Beschikbaarheid"];
            leeg.BenaderingCommercieel = data["BenaderingCommercieel"];
            leeg.Aandoening = data["Aandoening"];
            leeg.Password = data["Password"];
            leeg.Role = data["Role"];
            leeg.Postcode = data["Postcode"];
            leeg.Naam = data["Naam"];
            //leeg.BeperkingenIds = idList;
            leeg.BenaderingVoorkeur = data["BenaderingVoorkeur"];

            return leeg;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<string>> RegisterUser([FromBody] Dictionary<string, string> data)
        {
            try{
                if (data.ContainsKey("Email") && data.ContainsKey("Password") && data.ContainsKey("Role")){
                    var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == data["Email"]);
                    if (tried_user == null){
                        User user = new(data["Email"], data["Password"], data["Role"]);                                                                                                      
                        DeskundigeController dc = new DeskundigeController(_context);
                        DeskundigeDto deskundige = PopulateDes(new DeskundigeDto(), data);
                        var new_ed = await dc.PostDeskundige(deskundige);
                        //_context.Users.Add(user);
                        //await _context.SaveChangesAsync();
                        return "Succes!";
                    }
                    else{
                        return "Email error";
                    }
                    
                }
                else {
                    return "Helaas!";
                }
                
            }
            catch (Exception e){
                Console.WriteLine(e);
                return StatusCode(500, e.ToString());
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