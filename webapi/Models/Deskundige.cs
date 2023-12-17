namespace DemoApp.Models
{
    public class Deskundige
    {
        public int Id { get; set; }
        public string Postcode { get; set; }
        public string Naam { get; set; }
        public int Leeftijd { get; set; }
        public string Email { get; set; }
        public string Beschikbaarheid { get; set; }
        public virtual ICollection<DeskundigeBeperking> DeskundigeBeperkingen { get; set; }
        public string BenaderingVoorkeur { get; set; }
        public string BenaderingCommercieel { get; set; }
        public string Aandoening { get; set; }
    }

}