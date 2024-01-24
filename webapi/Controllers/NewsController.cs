using Microsoft.AspNetCore.Mvc;
using System.Net;
using DemoApp.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase{

        
        // GET: api/News
        [HttpGet]
        public async Task<string> GetNews()
        {
            try{
                var url = "https://newsapi.org/v2/top-headlines?" +
                            "q=Accessibility&" +
                            "apiKey=089c8f2e2dfe4d818e24dcf00a2bb122";

                var json = await new HttpClient().GetStringAsync(url);
                if (json != null){
                    return json;
                }
                return "Helaas";
            }
            catch (Exception e){
                return e.ToString();
            }
        }

    }
}
