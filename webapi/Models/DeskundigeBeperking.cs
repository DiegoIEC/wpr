using DemoApp.Models;

public class DeskundigeBeperking
{
    public int DeskundigeId { get; set; }
    public Deskundige Deskundige { get; set; }

    public int BeperkingId { get; set; }
    public Beperking Beperking { get; set; }
}
