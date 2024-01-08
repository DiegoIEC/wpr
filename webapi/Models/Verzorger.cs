namespace DemoApp.Models
{
    public class Verzorger
    {
        public int VerzorgerID { get; set; }
        public string Naam { get; set; }
        public string Postcode { get; set; }
        public string Email { get; set; }

        // Navigation property for the Deskundige
        public int DeskundigeID { get; set; }
        public virtual Deskundige Deskundige { get; set; }
    }
}