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
    public class BeperkingController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public BeperkingController(ApiDbContext context)
        {
            _context = context;
        }

        // POST: api/Beperking
        [HttpPost]
        public async Task<ActionResult<Beperking>> PostBeperking(Beperking beperking)
        {
            _context.Beperkingen.Add(beperking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBeperking", new { id = beperking.BeperkingId }, beperking);
        }

        // GET: api/Beperking/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Beperking>> GetBeperking(int id)
        {
            var beperking = await _context.Beperkingen.FindAsync(id);

            if (beperking == null)
            {
                return NotFound();
            }

            return beperking;
        }

        // PUT: api/Beperking/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBeperking(int id, Beperking beperking)
        {
            if (id != beperking.BeperkingId)
            {
                return BadRequest();
            }

            _context.Entry(beperking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BeperkingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Beperking/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBeperking(int id)
        {
            var beperking = await _context.Beperkingen.FindAsync(id);
            if (beperking == null)
            {
                return NotFound();
            }

            _context.Beperkingen.Remove(beperking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        // GET: api/Beperking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Beperking>>> GetBeperkingen()
        {
            return await _context.Beperkingen.ToListAsync();
        }

        private bool BeperkingExists(int id)
        {
            return _context.Beperkingen.Any(e => e.BeperkingId == id);
        }
    }
}
