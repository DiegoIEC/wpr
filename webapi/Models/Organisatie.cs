namespace DemoApp.Models
{
    public class Organisatie : User
    {
        public string Naam { get; set; }
        public string Locatie { get; set; }
        public string Website { get; set; }

        public Organisatie(string email, string password, string role, 
                           string naam, string locatie, string website) 
            : base(email, password, role)
        {
            Naam = naam;
            Locatie = locatie;
            Website = website;
        }

        // Additional properties and methods specific to Organisatie
    }

}