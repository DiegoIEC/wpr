using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;
using DemoApp.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerzorgerController : ControllerBase{
        private readonly ApiDbContext _context;

        public VerzorgerController(ApiDbContext context)
        {
            _context = context;
        }

        static VerzorgerDto PopulateVer(Dictionary<string, string> data, int id){
            Random rnd = new Random();
            int num = rnd.Next();
            VerzorgerDto leeg = new VerzorgerDto{
                VerzorgerID = num,
                Email = data["Email"],
                Postcode = data["Postcode"],
                Naam = data["Naam"],
                DeskundigeID = id
            };

            return leeg;
        }
        
        // POST: api/Verzorger
        [HttpPost]
        public async Task<ActionResult<object>> PostVerzorger(Dictionary<string, string> data)
        {
            try{
                var email_dto = data["Email_ED"];
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email_dto);
                if (user == null){
                    return NotFound();
                }
                var deskundige = await _context.Deskundigen.FindAsync(user.UserId);
                if (deskundige == null){
                    return NotFound();
                }
                VerzorgerDto Vdto = PopulateVer(data, deskundige.UserId);

                var verzorger = new Verzorger(naam: Vdto.Naam, email: Vdto.Email, postcode: Vdto.Postcode, deskundigeID: Vdto.DeskundigeID){
                    Deskundige = deskundige
                };

                _context.Verzorgers.Add(verzorger);
                await _context.SaveChangesAsync();
            }
            catch (Exception e){
                return e.ToString();
            }
            return "Succes!";
        }

    }
}
