import './Darkmode.css';
import SiteModeButton from './SiteModeButton';
const total_research = 87
const total_users =  237

const Home_ALG_dark = () => {
    
    return (
        <div className="home">
            <SiteModeButton/>
            <section className="welcome section-background-dark text-color-white block-content">
            <div className="block-left format-div">
            <h2 className="center-text format-title-dark">Welkom bij Stichting Accessibility</h2>
            <p className="center-text">Het verbeteren van digitale accessibility voor iedereen</p>
            <button className="center-button button-white"> Meer weten </button>
            </div>
            <div className="block-right format-div">
            <h2 className="center-text format-title-dark">Laatste nieuws</h2>
            <p className="center-text">Het laatste nieuws omtrent online toegankelijkheid</p>
            <div className="news-content">
            <p className="center-text">Google nieuws API...</p>
            </div>
            </div>
          </section>
          <section className="ongoing-research remove-margins section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Onze resultaten</h2>
            <p className="center-text">Bekijk de verschillende onderzoeken die door ons zijn uitgevoerd</p>
            <button className="center-button button-white">Bekijk details</button>
            <div className="contribution-stats-white block-content">
            <div className="block-left-border-dark">
              <h2 className="center-text smaller-text">Geplaatste onderzoeken:</h2>
              <p className="center-text">{total_research}</p>
            </div>
            <div className="block-right-border-dark">
                <h2 className="center-text smaller-text">Aantal gebruikers die mee hebben gedaan:</h2>
                <p className="center-text">{total_users}</p>
            </div>
          </div>
          </section>
          <section className="contribution remove-margins section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Onze missie</h2>
            <p className="center-text">Een inclusieve samenleving waarin alle mensen met of zonder beperking gelijkwaardig participeren.</p>
            <div className='block-content contribution-stats-white'>
            <div className="block-left-border-dark format-div">
            <h2 className="center-text smaller-text"> Onderzoeken</h2>
            <p className="center-text">Wij van Stichting Accessibility hebben als doel om onderzoeken  gericht op mensen met beperkingen makkelijker te maken voor onszelf en externe partijen. Deze onderzoeken gaan van toegankelijkheids onderzoeken m.b.t. websites tot ervarings-onderzoeken voor verschillende activiteiten. Klik hieronder voor meer informatie.</p>
            <button className="center-button button-white" href="./Onderzoeken"> Onze onderzoeken </button>
            </div>
            <div className="block-right-border-dark format-div">
            <h2 className="center-text smaller-text"> Partners</h2>
            <p className="center-text">Wij werken samen met verschillende partijen om ons doel te delen met de rest van Nederland. Een paar van onze partners zijn: Bol, Amazon, Gemeente Den Haag en Shell.
            Wij zijn continu opzoek naar nieuwe partners, heeft u of uw organisatie interesse? Klik dan hieronder om te registreren en begin meteen!</p>
            <button className="center-button button-white"> Registreer </button>
            </div>
            </div>
        </section>
          <section className="contribution remove-margins section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Contact</h2>
            <p className="center-text">Voor eventuele vragen of opmerkingen kunt u hieronder het formulier invullen om contact met ons op te nemen.</p>
            <div className="contribution-stats-white block-middle-border-dark">
              <h2 className="center-text smaller-text">Contactformulier</h2>
              <form className='form-dark'>
                <div className="input-group-dark">
                  <label htmlFor="name">Naam</label>
                  <input type="text" id="name" />
                </div>
                <div className="input-group-dark">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
                </div>
                <div className="input-group-dark">
                  <label htmlFor="email">Vraag</label>
                  <textarea type="email" id="email" />
                </div>
                <button type="submit" className="center-button button-white">
                  Verstuur
                </button>
            </form>
          </div>
        </section>



      </div>
    );
}
    



export default Home_ALG_dark;