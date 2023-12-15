const titel = "Toegankelijkheid van Bol.com voor Senioren en Slechtzienden"
const beschrijving ="Hier zou je de tekst en subsecties van het onderzoeksdoel plaatsen"
const methodiek = "uitleg methodiek"

const Onderzoek = () => {
  return (
    <div className="onderzoek">
      <section className="onderzoeknaam">
      <h1>{titel}</h1>
    </section>

    <section className="research-details">
    <h2>Doel van het Onderzoek</h2>
      <p>{beschrijving}</p>
    </section>
    <section className="methodology">
      <h2>Methodologie</h2>
      <p>{methodiek}</p>
    </section>
    <section className="section3">
      <h2>Deelnemen</h2>
      <p>Meer informatie over de inhoud van deze sectie...</p>
      <button>Deelnemen</button>
    </section>
    </div>
  );
}









export default Onderzoek;