namespace DemoApp.Models
{
    public class Deskundige : User
    {
        public string Postcode { get; set; }
        public string Naam { get; set; }
        public int Leeftijd { get; set; }
        public string Beschikbaarheid { get; set; }
        public virtual ICollection<DeskundigeBeperking> DeskundigeBeperkingen { get; set; }
        public virtual ICollection<Deelname> Deelnames { get; set; }
        public string BenaderingVoorkeur { get; set; }
        public string BenaderingCommercieel { get; set; }
        public string Aandoening { get; set; }

        public Deskundige(string email, string password, string role,
                          string postcode, string naam, int leeftijd, 
                          string beschikbaarheid, string benaderingVoorkeur, 
                          string benaderingCommercieel, string aandoening) 
            : base(email, password, role)
        {
            Postcode = postcode;
            Naam = naam;
            Leeftijd = leeftijd;
            Beschikbaarheid = beschikbaarheid;
            BenaderingVoorkeur = benaderingVoorkeur;
            BenaderingCommercieel = benaderingCommercieel;
            Aandoening = aandoening;
            DeskundigeBeperkingen = new List<DeskundigeBeperking>();
            Deelnames = new List<Deelname>();
            
        }
    }

}