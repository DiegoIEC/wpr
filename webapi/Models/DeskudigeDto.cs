namespace DemoApp.Models
{
    public class DeskundigeDto
    {
        public int UserId { get; set; } // Assuming you want to include the UserId in the DTO
        public string Email { get; set; }
        public string Password { get; set; } // Consider excluding sensitive information like Password in DTOs
        public string Role { get; set; }
        public string Postcode { get; set; }
        public string Naam { get; set; }
        public int Leeftijd { get; set; }
        public string Beschikbaarheid { get; set; }
        public string BenaderingVoorkeur { get; set; }
        public string BenaderingCommercieel { get; set; }
        public string Aandoening { get; set; }
        public List<int> BeperkingenIds { get; set; } // Add this line to include Beperkingen IDs
        
        // Add any other fields you need from Deskundige
    }
}