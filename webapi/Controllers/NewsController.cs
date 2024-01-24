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

        
        // GET: api/News
        [HttpGet]
        public async Task<object> GetNews()
        {
            try{
                string keywords = HttpUtility.UrlEncode("online accessibility");
                string apiKey = "089c8f2e2dfe4d818e24dcf00a2bb122";
                var url = $"https://newsapi.org/v2/everything?q={keywords}&sortBy=publishedAt&apiKey={apiKey}";
                //https://newsapi.org/v2/everything?q=online-accessibility&apiKey=089c8f2e2dfe4d818e24dcf00a2bb122
                using HttpClient client = new();
                try{
                    string response = await client.GetStringAsync(url);
                    return response;
                }
                catch (HttpRequestException e){
                    return $"Error: {e.Message}";
                }
            }
            catch (Exception e){
                return e.ToString();
            }
        }
    }
}
