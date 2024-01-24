using Microsoft.AspNetCore.Mvc;
using System.Net;
using DemoApp.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Web;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase{
        private readonly HttpClient _httpClient;

        public NewsController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        
        // GET: api/News
        [HttpGet]
        public async Task<object> GetNews()
        {
            try{
                //https://newsapi.org/v2/everything?q=+online accessibility&apiKey=089c8f2e2dfe4d818e24dcf00a2bb122
                //string keywords = "online accessibility";
                //string encodedKeywords = HttpUtility.UrlEncode(keywords);
                //string apiKey = "089c8f2e2dfe4d818e24dcf00a2bb122";

                var url = "https://newsapi.org/v2/everything?q=online accessibility&sortBy=publishedAt&apiKey=089c8f2e2dfe4d818e24dcf00a2bb122";
            
                try{
                    string response = await _httpClient.GetStringAsync(url);
                    return Ok(response);
                }
                catch (HttpRequestException e){
                    return BadRequest(e.Message);
                }
            }
            catch (Exception e){
                return StatusCode(500, e.ToString());
            }
        }
    }
}
