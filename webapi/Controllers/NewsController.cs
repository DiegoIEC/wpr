using Microsoft.AspNetCore.Mvc;
using NewsAPI;
using NewsAPI.Models;
using NewsAPI.Constants;
using System.Text.Encodings.Web;
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
        public async Task<ActionResult<object>> GetNews()
        {
            try
            {
                var newsApiClient = new NewsApiClient("089c8f2e2dfe4d818e24dcf00a2bb122");
                var articlesResponse = await newsApiClient.GetEverythingAsync(new EverythingRequest{
                    Q = "Online AND Accessibility",
                    SortBy = SortBys.Relevancy
                });
                if (articlesResponse.Status == Statuses.Ok)
                {
                    // total results found
                    Console.WriteLine(articlesResponse.TotalResults);

                    int count = 0;
                    List<List<string>> news = new List<List<string>>();
                    foreach (var article in articlesResponse.Articles)
                    {
                        while (count < 5)
                        {
                            news.Add(new List<string> { article.Title, article.Description, article.Url });
                            count++;
                            break;
                        }
                    }
                    return news;
                }
                return "Niet ok";
            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
