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
    public class DeelnameController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public DeelnameController(ApiDbContext context)
        {
            _context = context;
        }

        // POST: api/Deelname
        [HttpPost]
public async Task<ActionResult<Deelname>> PostDeelname([FromBody] DeelnameDto deelnameDto)
{
    var deelname = new Deelname
    {
        DeskundigeId = deelnameDto.DeskundigeId,
        OnderzoekId = deelnameDto.OnderzoekId,
        status = deelnameDto.Status
    };

    _context.Deelnames.Add(deelname);
    await _context.SaveChangesAsync();

    return CreatedAtAction("GetDeelname", new { deskundigeId = deelname.DeskundigeId, onderzoekId = deelname.OnderzoekId }, deelname);
}

       [HttpGet("{deskundigeId}")]
public async Task<ActionResult<IEnumerable<Deelname>>> GetDeelnames(int deskundigeId)
{
    var deelnames = await _context.Deelnames
                                  .Where(d => d.DeskundigeId == deskundigeId)
                                  .ToListAsync();

    if (deelnames == null || !deelnames.Any())
    {
        return NotFound();
    }

    return deelnames;
}

        // DELETE: api/Deelname/5/10
        [HttpDelete("{deskundigeId}/{onderzoekId}")]
        public async Task<IActionResult> DeleteDeelname(int deskundigeId, int onderzoekId)
        {
            var deelname = await _context.Deelnames.FindAsync(deskundigeId, onderzoekId);
            if (deelname == null)
            {
                return NotFound();
            }

            _context.Deelnames.Remove(deelname);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Deelname
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deelname>>> GetDeelnames()
        {
            return await _context.Deelnames
                                 .Include(d => d.Deskundige)
                                 .Include(d => d.Onderzoek)
                                 .ToListAsync();
        }

        private bool DeelnameExists(int deskundigeId, int onderzoekId)
        {
            return _context.Deelnames.Any(e => e.DeskundigeId == deskundigeId && e.OnderzoekId == onderzoekId);
        }
    }
}