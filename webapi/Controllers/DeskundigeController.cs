using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;
using DemoApp.Data;
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
public async Task<ActionResult<DeskundigeDto>> PostDeskundige(DeskundigeDto dto)
{
    var deskundige = new Deskundige(
        dto.Email,
        dto.Password,
        dto.Role,
        dto.Postcode,
        dto.Naam,
        dto.Leeftijd,
        dto.Beschikbaarheid,
        dto.BenaderingVoorkeur,
        dto.BenaderingCommercieel,
        dto.Aandoening
    );

    // Handle the mapping for Beperkingen if provided in the DTO
    if (dto.BeperkingenIds != null && dto.BeperkingenIds.Count > 0)
    {
        deskundige.DeskundigeBeperkingen = new List<DeskundigeBeperking>();
        foreach (var beperkingId in dto.BeperkingenIds)
        {
            deskundige.DeskundigeBeperkingen.Add(new DeskundigeBeperking { DeskundigeId = deskundige.UserId, BeperkingId = beperkingId });
        }
    }

    _context.Deskundigen.Add(deskundige);
    await _context.SaveChangesAsync();

    // Create a DTO for the response
    var returnDto = new DeskundigeDto
    {
        // Populate the properties of the DTO
        Email = deskundige.Email,
        // ... other properties
        BeperkingenIds = deskundige.DeskundigeBeperkingen.Select(db => db.BeperkingId).ToList()
    };

    // Return the created DTO with a '201 Created' response, including the route to get the deskundige
    return CreatedAtAction(nameof(GetDeskundige), new { id = deskundige.UserId }, returnDto);
}


        // GET: api/Deskundige/5
        [HttpGet("id")]
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
public async Task<IActionResult> PutDeskundige(int id, DeskundigeDto dto)
{
    if (id != dto.UserId)
    {
        return BadRequest();
    }

    var deskundige = await _context.Deskundigen.FindAsync(id);
    if (deskundige == null)
    {
        return NotFound();
    }

    // Update properties from DTO
    deskundige.Email = dto.Email;
    deskundige.Password = dto.Password;
    deskundige.Role = dto.Role;
    deskundige.Postcode = dto.Postcode;
    deskundige.Naam = dto.Naam;
    deskundige.Leeftijd = dto.Leeftijd;
    deskundige.Beschikbaarheid = dto.Beschikbaarheid;
    deskundige.BenaderingVoorkeur = dto.BenaderingVoorkeur;
    deskundige.BenaderingCommercieel = dto.BenaderingCommercieel;
    deskundige.Aandoening = dto.Aandoening;
    // Update other properties as needed

    // Assuming you have a navigation property for DeskundigeBeperkingen
    // Clear existing Beperkingen if necessary
    if (dto.BeperkingenIds != null)
    {
        deskundige.DeskundigeBeperkingen.Clear();
        foreach (var beperkingId in dto.BeperkingenIds)
        {
            deskundige.DeskundigeBeperkingen.Add(new DeskundigeBeperking { DeskundigeId = id, BeperkingId = beperkingId });
        }
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

        private bool DeskundigeExists(int id)
        {
            return _context.Deskundigen.Any(e => e.UserId == id);
        }
    }
}
