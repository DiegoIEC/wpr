using DemoApp.Models;

public class Deelname
    {
        // Composite key, no need for a separate primary key
        public int DeskundigeId { get; set; }
        public int OnderzoekId { get; set; }
        public int status { get; set; }

        // Navigation properties
        public virtual Deskundige Deskundige { get; set; }
        public virtual Onderzoek Onderzoek { get; set; }
    }