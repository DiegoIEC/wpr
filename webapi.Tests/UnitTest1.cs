using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Controllers;
using DemoApp.Data;
using DemoApp.Models;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using Newtonsoft.Json.Linq;

public class OnderzoekApiTests
{
    [Fact]
    public async Task GetOnderzoeken_200OK()
    {
        // Arrange
        using var client = new HttpClient();
        var requestUrl = "http://20.199.89.238:8088/api/onderzoek";

        // Act
        var response = await client.GetAsync(requestUrl);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    [Fact]
    public async Task GetOnderzoek11_Titel_Toegankelijkheid_Haagse_Hogeschool()
    {
        // Arrange
        using var client = new HttpClient();
        var requestUrl = "http://20.199.89.238:8088/api/onderzoek/11";

        // Act
        var response = await client.GetAsync(requestUrl);

        // Assert
        response.EnsureSuccessStatusCode(); // This will throw if the status code does not indicate success

        var responseContent = await response.Content.ReadAsStringAsync();
        var responseObject = JObject.Parse(responseContent);

        var actualTitle = responseObject["titel"].ToString();
        var expectedTitle = "Toegankelijkheid Haagse Hogeschool";
        Assert.Equal(expectedTitle, actualTitle);
    }

    [Fact]
    public async Task GetDeskundige_200OK()
    {
        // Arrange
        using var client = new HttpClient();
        var requestUrl = "http://20.199.89.238:8088/api/deskundige/1";

        // Act
        var response = await client.GetAsync(requestUrl);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    [Fact]
    public async Task GetDeelnames_200OK()
    {
        // Arrange
        using var client = new HttpClient();
        var requestUrl = "http://20.199.89.238:8088/api/deelname/1";

        // Act
        var response = await client.GetAsync(requestUrl);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    [Fact]
    public async Task GetBeperkingen_200OK()
    {
        // Arrange
        using var client = new HttpClient();
        var requestUrl = "http://20.199.89.238:8088/api/beperking";

        // Act
        var response = await client.GetAsync(requestUrl);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
    [Fact]
    public async Task GetdeskundigeBeperkingen_200OK()
    {
        // Arrange
        using var client = new HttpClient();
        var requestUrl = "http://20.199.89.238:8088/api/deskundigebeperking/1";

        // Act
        var response = await client.GetAsync(requestUrl);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
