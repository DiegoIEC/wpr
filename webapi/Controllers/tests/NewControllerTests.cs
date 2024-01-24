using webapi.Controllers;
using System.Net.Http;
using System.Threading.Tasks;
using System.Diagnostics;
using Xunit;
public class UnitTestNews{

    [Fact]
    public void GetNewsReturnsStatus(){
        //Arrange
        HttpClient client = new();
        NewsController controller = new NewsController(client);

        //Act
        var response = controller.GetNews();

        //Assert
        if (response.Value != null)
        {
            Debug.WriteLine("check: niet Null");
            Debug.WriteLine(response.Value);
            if (response.Value is List<List<string>> newsList)
            {
                foreach (var article in newsList)
                {
                    Debug.WriteLine($"Article:");

                    foreach (var value in article)
                    {
                        Debug.WriteLine(value);
                    }
                };
            };
        }
        else
        {
            Debug.WriteLine(response);
            Debug.WriteLine("check: Null");
        }
        Assert.NotNull(response);

    }
}