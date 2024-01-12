import './Home.css';
import SiteModeButton from './SiteModeButton';
const organisation = "organisatie"
const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2']
const reviewResearch = ['Onderzoek 3', 'Onderzoek 4']
const completedResearch = ['Onderzoek 5', 'Onderzoek 6']
const completedResearchCount = 100
const compensation =  18
const Home_ORG = () => {
    
    return (
        <div className="home">
          <SiteModeButton/>
            <section className="welcome section-background text-color-black block-content">
            <div className="block-left format-div">
            <h2 className="center-text format-title">Welkom {organisation}</h2>
            <p className="center-text">Hieronder een overzicht met uw onderzoeken die nu lopen</p>
            <button className="center-button button-black"> Onderzoeken </button>
            </div>
            <div className="block-right format-div">
            <h2 className="center-text format-title">Laatste nieuws</h2>
            <p className="center-text">Het laatste nieuws omtrent online toegankelijkheid</p>
            <div className="news-content">
            <p className="center-text">Google nieuws API...</p>
            </div>
            </div>
          </section>
          <section className="ongoing-research remove-margins section-background text-color-black">
            <h2 className="center-text format-title">Overzicht onderzoeken</h2>
            <p className="center-text">U heeft de volgende onderzoeken nog lopen</p>
            <div className="contribution-stats-black block-content">
            <div className="block-left-border">
            <p className="center-text text-bold">Live onderzoeken</p>
            <ul className="center-text">
              {ongoingResearch.map((research, index) => (
                <li key={index}>{research}</li>
              ))}
            </ul>
            </div>
            <div className="block-right-border">
            <p className="center-text text-bold">Onderzoeken in review</p>
            <ul className="center-text">
              {reviewResearch.map((research, index) => (
                <li key={index}>{research}</li>
              ))}
            </ul>
            </div>
            </div>
          </section>
          <section className="contribution remove-margins section-background text-color-black">
            <h2 className="center-text format-title">Nieuw onderzoek plaatsen</h2>
            <p className="center-text">Upload of maak een nieuw onderzoek aan</p>
            <div className="contribution-stats-black block-content">
            <div className="block-left">
            <button className="center-button button-big"> Upload een bestaand onderzoek </button>
            </div>
            <div className="block-right">
            <button className="center-button button-big"> Vul een van onze templates </button>
            </div>
          </div>
        </section>
        <section className="contribution remove-margins section-background text-color-black">
            <h2 className="center-text format-title">Overzicht resultaten</h2>
            <p className="center-text">Een overzicht van uw afgeronde onderzoeken</p>
            <div className="contribution-stats-black">
            <div className="block-middle-border">
            <p className="center-text text-bold">Afgeronde onderzoeken</p>
            <ul className="center-text">
              {completedResearch.map((research, index) => (
                <li key={index}>{research}</li>
              ))}
            </ul>
            </div>
            </div>
          
        </section>



      </div>
    );
}
    



export default Home_ORG;