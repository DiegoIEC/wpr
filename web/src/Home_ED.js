import './Home.css';
const userName = "gebruiker"
const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2']
const completedResearchCount = 100
const compensation =  10
const Home = () => {
    
    return (
        <div className="home">
            <section className="welcome section-background-blue text-color-green block-content">
            <div className="block-left format-div">
            <h2 className="center-text format-title">Welkom {userName}</h2>
            <p className="center-text">Hieronder een overzicht met onderzoeken waarvoor u in aanmerking komt</p>
            <button className="center-button button-green"> Onderzoeken </button>
            </div>
            <div className="block-right format-div">
            <h2 className="center-text format-title">Laatste nieuws</h2>
            <p className="center-text">Het laatste nieuws omtrent online toegankelijkheid</p>
            <div className="news-content">
            <p className="center-text">Google nieuws API...</p>
            </div>
            </div>
          </section>
          <section className="ongoing-research remove-margins section-background-green text-color-blue">
            <h2 className="center-text format-title">Lopende onderzoeken</h2>
            <div className="block-middle-border-blue">
            <ul className="center-text">
              {ongoingResearch.map((research, index) => (
                <li key={index}>{research}</li>
              ))}
            </ul>
            </div>
          </section>
          <section className="contribution remove-margins section-background-blue text-color-green">
            <h2 className="center-text format-title">Uw bijdrage</h2>
            <p className="center-text">Bekijk de verschillende onderzoeken die u zijn uitgevoerd</p>
            <button className="center-button button-green">Bekijk details</button>
            <div className="contribution-stats-blue block-content">
            <div className="block-left-border">
              <h2 className="center-text smaller-text">U heeft meegedaan aan zoveel onderzoeken:</h2>
              <p className="center-text">{completedResearchCount}</p>
            </div>
            <div className="block-right-border">
                <h2 className="center-text smaller-text">Ontvangen compensatie:</h2>
                <p className="center-text">€{compensation}</p>
            </div>
          </div>
        </section>



      </div>
    );
}
    



export default Home;