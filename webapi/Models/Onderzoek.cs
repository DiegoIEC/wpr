
public class Onderzoek
    {
        public int OnderzoekId { get; set; }
        public string Titel { get; set; }
        public string KorteBeschrijving { get; set; }
        public string Beschrijving  { get; set; }
        public double Beloning { get; set; }
        public string Locatie { get; set; }
        public string Soort { get; set; }
        public DateTime Startdatum { get; set; }
        public DateTime Einddatum { get; set; }
        public List<int> BeperkingenIds { get; set; }
        public virtual ICollection<Deelname> Deelnames { get; set; }
    }