using DemoApp.Models;

public class Beperking
{
    public int BeperkingId { get; set; }
    public string Naam { get; set; }
    public virtual ICollection<DeskundigeBeperking> DeskundigeBeperkingen { get; set; }
}