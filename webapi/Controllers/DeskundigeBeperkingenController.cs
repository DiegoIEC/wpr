using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;
using DemoApp.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeskundigeBeperkingController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public DeskundigeBeperkingController(ApiDbContext context)
        {
            _context = context;
        }

        // POST: api/DeskundigeBeperking
        [HttpPost]
        public async Task<ActionResult<DeskundigeBeperking>> PostDeskundigeBeperking([FromBody] DeskundigeBeperkingDto deskundigeBeperkingDto)
        {
            var deskundigeBeperking = new DeskundigeBeperking
            {
                DeskundigeId = deskundigeBeperkingDto.DeskundigeId,
                BeperkingId = deskundigeBeperkingDto.BeperkingId
            };

            _context.DeskundigeBeperkingen.Add(deskundigeBeperking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeskundigebeperking", new { deskundigeId = deskundigeBeperking.DeskundigeId, beperkingId = deskundigeBeperking.BeperkingId }, deskundigeBeperking);
        }

        [HttpGet("{deskundigeId}")]
public async Task<ActionResult<IEnumerable<DeskundigeBeperkingDto>>> GetDeskundigeBeperkingen(int deskundigeId)
{
    var deskundigeBeperkingen = await _context.DeskundigeBeperkingen
                                              .Where(db => db.DeskundigeId == deskundigeId)
                                              .Select(db => new DeskundigeBeperkingDto
                                              {
                                                  DeskundigeId = db.DeskundigeId,
                                                  BeperkingId = db.BeperkingId,
                                                  // Map other properties as needed
                                              })
                                              .ToListAsync();

    if (!deskundigeBeperkingen.Any())
    {
        return NotFound();
    }

    return deskundigeBeperkingen;
}
        // DELETE: api/DeskundigeBeperking/5/10
        [HttpDelete("{deskundigeId}/{beperkingId}")]
        public async Task<IActionResult> DeleteDeskundigeBeperking(int deskundigeId, int beperkingId)
        {
            var deskundigeBeperking = await _context.DeskundigeBeperkingen
                                                     .FirstOrDefaultAsync(db => db.DeskundigeId == deskundigeId && db.BeperkingId == beperkingId);
            if (deskundigeBeperking == null)
            {
                return NotFound();
            }

            _context.DeskundigeBeperkingen.Remove(deskundigeBeperking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeskundigeBeperkingExists(int deskundigeId, int beperkingId)
        {
            return _context.DeskundigeBeperkingen.Any(db => db.DeskundigeId == deskundigeId && db.BeperkingId == beperkingId);
        }
    }
}