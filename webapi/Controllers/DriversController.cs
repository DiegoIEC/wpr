using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoApp.Models;
using DemoApp.Data;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class DriversController : ControllerBase
{


    private readonly ILogger<DriversController> _logger;
    private readonly ApiDbContext _context;

    public DriversController(
        ILogger<DriversController> logger,
        ApiDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetAllDrivers")]
    public async Task<IActionResult> Get()
    {
        var driver = new Driver()
        {
            DriverNumber =44,
            Name = "Sir Lewis Hamilton"
        };

        _context.Add(driver);
        await _context.SaveChangesAsync();

        var allDrivers = await _context.Drivers.ToListAsync();

        return Ok(allDrivers);
    }
}
