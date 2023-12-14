import './Home.css';

const userName = "gebruiker"
const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2']
const completedResearchCount = 100
const compensation =  10
const Home = () => {
    
    return (
        <div className="home">
            <section className="welcome">
            <h2>Welkom {userName}</h2>
            <p>Hieronder een overzicht met onderzoeken waarvoor u in aanmerking komt</p>
            <button> Onderzoeken </button>
          </section>
          <section className="latest-news">
            <h2>Laatste nieuws</h2>
            <div className="news-content">
              {/* Content for latest news */}
            </div>
          </section>
          <section className="ongoing-research">
            <h2>Lopende onderzoeken</h2>
            <ul>
              {ongoingResearch.map((research, index) => (
                <li key={index}>{research}</li>
              ))}
            </ul>
          </section>
          <section className="contribution">
            <h2>Uw bijdrage</h2>
            <p>Bekijk de verschillende onderzoeken die u zijn uitgevoerd</p>
            <button>Bekijk details</button>
            <div className="contribution-stats">
              <div>U heeft meegedaan aan zoveel onderzoeken {completedResearchCount}</div>
              <div>Ontvangen compensatie.. €{compensation}</div>
            </div>
          </section>



        </div>
    );
}
    



export default Home;