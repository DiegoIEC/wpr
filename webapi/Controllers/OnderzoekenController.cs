using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;
using DemoApp.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnderzoekController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public OnderzoekController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/Onderzoek
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Onderzoek>>> GetOnderzoeken()
        {
            return await _context.Onderzoeken.ToListAsync();
        }

        // GET: api/Onderzoek/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Onderzoek>> GetOnderzoek(int id)
        {
            var onderzoek = await _context.Onderzoeken.FindAsync(id);

            if (onderzoek == null)
            {
                return NotFound();
            }

            return onderzoek;
        }

        // POST: api/Onderzoek
        [HttpPost]
        public async Task<ActionResult<Onderzoek>> PostOnderzoek(Onderzoek onderzoek)
        {
            _context.Onderzoeken.Add(onderzoek);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOnderzoek), new { id = onderzoek.OnderzoekId }, onderzoek);
        }

        // PUT: api/Onderzoek/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOnderzoek(int id, Onderzoek onderzoek)
        {
            if (id != onderzoek.OnderzoekId)
            {
                return BadRequest();
            }

            _context.Entry(onderzoek).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OnderzoekExists(id))
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

        // DELETE: api/Onderzoek/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOnderzoek(int id)
        {
            var onderzoek = await _context.Onderzoeken.FindAsync(id);
            if (onderzoek == null)
            {
                return NotFound();
            }

            _context.Onderzoeken.Remove(onderzoek);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OnderzoekExists(int id)
        {
            return _context.Onderzoeken.Any(e => e.OnderzoekId == id);
        }
    }
}
