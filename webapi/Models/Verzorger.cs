namespace DemoApp.Models
{
    public class Verzorger
    {
        public int VerzorgerID { get; set; }
        public string Naam { get; set; }
        public string Postcode { get; set; }
        public string Email { get; set; }
        public int DeskundigeID { get; set; }
        public virtual Deskundige Deskundige { get; set; }

        public Verzorger(string naam, string postcode, string email, int deskundigeID) 
        {
            Naam = naam;
            Postcode = postcode;
            Email = email;
            DeskundigeID = deskundigeID;
        }
    }
}