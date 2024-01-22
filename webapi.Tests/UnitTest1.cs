using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Controllers;
using DemoApp.Data;
using DemoApp.Models;
using Xunit;

public class UnitTest1
{
    [Fact]
    public async Task PostDeskundige_ReturnsCreatedAtActionResult_WithDeskundige()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApiDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase") // Use a unique name for the database
            .Options;

        using var context = new ApiDbContext(options);
        context.Database.EnsureDeleted(); 

        var controller = new DeskundigeController(context);
        var newDeskundige = new DeskundigeDto
        {
            Email = "test@test.com",
            Password = "password",
            Role = "ED",
            
        };

        // Act
        var result = await controller.PostDeskundige(newDeskundige);

        // Assert
        var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnValue = Assert.IsType<DeskundigeDto>(actionResult.Value);
        Assert.Equal("test@test.com", returnValue.Email);
        var deskundigeInDb = context.Deskundigen.FirstOrDefault(d => d.Email == returnValue.Email);
        Assert.NotNull(deskundigeInDb);
    }
}