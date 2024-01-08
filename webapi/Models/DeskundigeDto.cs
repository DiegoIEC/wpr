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

    // Add any other fields you want to expose through the API for updates
}
