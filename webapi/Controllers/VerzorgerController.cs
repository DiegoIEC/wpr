using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;
using DemoApp.Data;

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
        
        // POST: api/Verzorger
        [HttpPost]
        public async Task<string> PostVerzorger(VerzorgerDto dto, Deskundige de)
        {
            try{
                var verzorger = new Verzorger(naam: dto.Naam, email: dto.Email, postcode: dto.Postcode, deskundigeID: dto.DeskundigeID)
                {
                    Deskundige = de
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
