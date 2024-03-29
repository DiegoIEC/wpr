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
            leeg.BeperkingenIds = idList;
            leeg.BenaderingVoorkeur = data["BenaderingVoorkeur"];

            return leeg;
        }

        static VerzorgerDto PopulateVer(VerzorgerDto leeg, Dictionary<string, string> data, DeskundigeDto des){
            Random rnd = new Random();
            int num = rnd.Next();

            leeg.VerzorgerID = num;
            leeg.Email = data["Email"];
            leeg.Postcode = data["Postcode"];
            leeg.Naam = data["Naam"];
            leeg.DeskundigeID = des.UserId;

            return leeg;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<object>> RegisterUser([FromBody] Dictionary<string, string> data)
        {
            try{
                if (data.ContainsKey("Email") && data.ContainsKey("Password") && data.ContainsKey("Role")){
                    var email = data["Email"];
                    var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == data["Email"]);

                    if (tried_user == null){                                                                                                    
                        DeskundigeController dc = new DeskundigeController(_context);
                        DeskundigeDto deskundige = PopulateDes(new DeskundigeDto(), data);
                        var new_ed = await dc.PostDeskundige(deskundige);
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
        public async Task<ActionResult<object>> GetUser([FromQuery] string email)
        {
            try{
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
                if (user == null)
                {
                    return NotFound();
                }
                else{
                    if (user.Role == "ED" || user.Role == "deskundige"){
                        var output = await _context.Deskundigen.FindAsync(user.UserId);
                        if (output != null){
                            return output;
                        }
                    }
                    else if(user.Role == "ORG"){
                        var output = await _context.Organisaties.FindAsync(user.UserId);
                        if (output != null){
                            return output;
                        }
                    }
                    else{
                        return user;
                    }
                    return StatusCode(500, "No users :(");
                }
            }
            catch (Exception e){
                return StatusCode(500, e.ToString());
            }
        }
    }
}

