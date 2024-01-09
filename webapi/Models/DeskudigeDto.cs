namespace DemoApp.Models
{
    public class DeskundigeDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Postcode { get; set; }
        public string Naam { get; set; }
        public int Leeftijd { get; set; }
        public string Beschikbaarheid { get; set; }
        public string BenaderingVoorkeur { get; set; }
        public string BenaderingCommercieel { get; set; }
        public string Aandoening { get; set; }
        // Add any other fields you need from Deskundige
    }
}