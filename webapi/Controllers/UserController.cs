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
        static DeskundigeDto PopulateDes(DeskundigeDto leeg, Dictionary<string, object> data){
            //num, data["Email"], data["Password"], data["Role"], data["Postcode"], data["Naam"], int.Parse(data["Leeftijd"]), data["Beschikbaarheid"], data["BenaderingVoorkeur"], data["BenaderingCommercieel"], data["Aandoening"], idList
            Random rnd = new Random();
            int num = rnd.Next();
            //List<int> idList = ConvertStringToIntList(data["BeperkingenIds"]);

            leeg.UserId = num;
            leeg.Email = (string)data["Email"];
            leeg.Leeftijd = int.Parse((string)data["Leeftijd"]);
            leeg.Beschikbaarheid = (string)data["Beschikbaarheid"];
            leeg.BenaderingCommercieel = (string)data["BenaderingCommercieel"];
            leeg.Aandoening = (string)data["Aandoening"];
            leeg.Password = (string)data["Password"];
            leeg.Role = (string)data["Role"];
            leeg.Postcode = (string)data["Postcode"];
            leeg.Naam = (string)data["Naam"];
            leeg.BeperkingenIds = (List<int>)data["BeperkingenIds"];
            leeg.BenaderingVoorkeur = (string)data["BenaderingVoorkeur"];

            return leeg;
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult<object>> RegisterUser([FromBody] Dictionary<string, object> data)
        {
            try{
                if (data.ContainsKey("Email") && data.ContainsKey("Password") && data.ContainsKey("Role")){
                    var tried_user = await _context.Users.SingleOrDefaultAsync(u => u.Email == (string)data["Email"]);
                    if (tried_user == null){
                        //User user = new(data["Email"], data["Password"], data["Role"]);                                                                                                      
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