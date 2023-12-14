import './Home.css';
const userName = "gebruiker"
const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2']
const completedResearchCount = 100
const compensation =  10
const Home = () => {
    
    return (
        <div className="home">
            <section className="welcome section-background-blue text-color-green">
            <h2 className="center-text">Welkom {userName}</h2>
            <p className="center-text">Hieronder een overzicht met onderzoeken waarvoor u in aanmerking komt</p>
            <button className="center-button button-green"> Onderzoeken </button>
          </section>
          <section className="latest-news section-background-green text-color-blue">
            <h2 className="center-text">Laatste nieuws</h2>
            <div className="news-content">
              {/* Content for latest news */}
            </div>
          </section>
          <section className="ongoing-research text-color-green">
            <h2 className="center-text">Lopende onderzoeken</h2>
            <ul className="center-text">
              {ongoingResearch.map((research, index) => (
                <li key={index}>{research}</li>
              ))}
            </ul>
          </section>
          <section className="contribution section-background-green text-color-blue">
            <h2 className="center-text">Uw bijdrage</h2>
            <p className="center-text">Bekijk de verschillende onderzoeken die u zijn uitgevoerd</p>
            <button className="center-button button-blue">Bekijk details</button>
            <div className="contribution-stats-blue">
              <div>U heeft meegedaan aan {completedResearchCount} onderzoeken</div>
              <div>Ontvangen compensatie.. €{compensation}</div>
            </div>
          </section>



        </div>
    );
}
    



export default Home;