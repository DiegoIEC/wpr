
public class Onderzoek
    {
        public int OnderzoekId { get; set; } // Primary key, auto-generated
        public string Titel { get; set; }
        public double Beloning { get; set; }
        public string Locatie { get; set; }
        public char Startdatum { get; set; } // This should probably be a DateTime
        public char Einddatum { get; set; } // This should probably be a DateTime
        public string Attribute { get; set; } // Unclear what type this should be

        // Navigation property for the association class
        public virtual ICollection<Deelname> Deelnames { get; set; }
    }