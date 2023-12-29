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
    public class DeskundigeController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public DeskundigeController(ApiDbContext context)
        {
            _context = context;
        }

        // POST: api/Deskundige
        [HttpPost]
        public async Task<ActionResult<Deskundige>> PostDeskundige(Deskundige deskundige)
        {
            _context.Deskundigen.Add(deskundige);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDeskundige", new { id = deskundige.UserId }, deskundige);
        }

        // GET: api/Deskundige/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Deskundige>> GetDeskundige(int id)
        {
            var deskundige = await _context.Deskundigen.FindAsync(id);

            if (deskundige == null)
            {
                return NotFound();
            }

            return deskundige;
        }

        // PUT: api/Deskundige/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeskundige(int id, Deskundige deskundige)
        {
            if (id != deskundige.UserId)
            {
                return BadRequest();
            }

            _context.Entry(deskundige).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeskundigeExists(id))
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

        // DELETE: api/Deskundige/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeskundige(int id)
        {
            var deskundige = await _context.Deskundigen.FindAsync(id);
            if (deskundige == null)
            {
                return NotFound();
            }

            _context.Deskundigen.Remove(deskundige);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Deskundige
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Deskundige>>> GetDeskundige()
        {
            return await _context.Deskundigen.ToListAsync();
        }

        private bool DeskundigeExists(int id)
        {
            return _context.Deskundigen.Any(e => e.UserId == id);
        }
    }
}