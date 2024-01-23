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
        public async Task<string> PostVerzorger(VerzorgerDto Vdto, DeskundigeDto dto)
        {
            try{
                var deskundige = new Deskundige(
                email: dto.Email,
                password: dto.Password,
                role: dto.Role,
                postcode: dto.Postcode,
                naam: dto.Naam,
                leeftijd: dto.Leeftijd,
                beschikbaarheid: dto.Beschikbaarheid,
                benaderingVoorkeur: dto.BenaderingVoorkeur,
                benaderingCommercieel: dto.BenaderingCommercieel,
                aandoening: dto.Aandoening){
                DeskundigeBeperkingen = new List<DeskundigeBeperking>()
                };

                if (dto.BeperkingenIds != null && dto.BeperkingenIds.Any()){
                    foreach (var beperkingId in dto.BeperkingenIds){
                        deskundige.DeskundigeBeperkingen.Add(new DeskundigeBeperking { BeperkingId = beperkingId });
                    }
                }

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
