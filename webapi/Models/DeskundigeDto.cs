public class DeskundigeDto
{
    public string Postcode { get; set; }
    public string Naam { get; set; }
    public int Leeftijd { get; set; }
    public string Beschikbaarheid { get; set; }
    public List<int> BeperkingenIds { get; set; } // Just the IDs of the Beperkingen
    public string BenaderingVoorkeur { get; set; }
    public string BenaderingCommercieel { get; set; }
    public string Aandoening { get; set; }
    public string Email { get; internal set; }
    public int UserId { get; internal set; }
    public string Password { get; internal set; }
    public string Role { get; internal set; }

    // Add any other fields you want to expose through the API for updates
}
