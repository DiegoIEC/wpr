import './Home.css';
import { useState, useEffect } from 'react';
import SiteModeButton from './SiteModeButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*
const fetchNewsData = async () => {
  try {
    const response = await axios.get('http://20.199.89.238:8088/api/news');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("error fetching news.")
  }
};
*/

const total_research = 87
const total_users =  237
const Home_ALG = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);


  /*
  useEffect(() => {
    const fetchData = async () => {
      if (news.length == 0) {
        const output = await fetchNewsData();
        setNews(output);
      }
    };
    fetchData();
  }, [news]);
  */

    
    return (
        <div className="home">
          <SiteModeButton/>
            <section className="welcome section-background text-color-black block-content">
            <div className="block-left format-div">
            <h2 className="center-text format-title">Welkom bij Stichting Accessibility</h2>
            <p className="center-text">Het verbeteren van digitale accessibility voor iedereen</p>
            <button className="center-button button-black" onClick={() => navigate('//www.accessibility.nl/over-ons/')}> Meer weten </button>
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
            <h2 className="center-text format-title">Onze resultaten</h2>
            <p className="center-text">Bekijk de verschillende onderzoeken die door ons zijn uitgevoerd</p>
            <button className="center-button button-black" onClick={() => navigate('/Onderzoeken')}>Bekijk details</button>
            <div className="contribution-stats-black block-content">
            <div className="block-left-border">
              <h2 className="center-text smaller-text title-black">Geplaatste onderzoeken:</h2>
              <p className="center-text text-bold">{total_research}</p>
            </div>
            <div className="block-right-border">
                <h2 className="center-text smaller-text title-black">Aantal gebruikers die mee hebben gedaan:</h2>
                <p className="center-text text-bold">{total_users}</p>
            </div>
          </div>
          </section>
          <section className="contribution remove-margins section-background text-color-black">
            <h2 className="center-text format-title">Onze missie</h2>
            <p className="center-text">Een inclusieve samenleving waarin alle mensen met of zonder beperking gelijkwaardig participeren.</p>
            <div className='block-content contribution-stats-black'>
            <div className="block-left-border format-div">
            <h2 className="center-text smaller-text title-black"> Onderzoeken</h2>
            <p className="center-text">Wij van Stichting Accessibility hebben als doel om onderzoeken  gericht op mensen met beperkingen makkelijker te maken voor onszelf en externe partijen. Deze onderzoeken gaan van toegankelijkheids onderzoeken m.b.t. websites tot ervarings-onderzoeken voor verschillende activiteiten. Klik hieronder voor meer informatie.</p>
            <button className="center-button button-black" onClick={() => navigate('/Onderzoeken')}> Onze onderzoeken </button>
            </div>
            <div className="block-right-border format-div">
            <h2 className="center-text smaller-text title-black"> Partners</h2>
            <p className="center-text">Wij werken samen met verschillende partijen om ons doel te delen met de rest van Nederland. Een paar van onze partners zijn: Bol, Amazon, Gemeente Den Haag en Shell.
            Wij zijn continu opzoek naar nieuwe partners, heeft u of uw organisatie interesse? Klik dan hieronder om te registreren en begin meteen!</p>
            <button className="center-button button-black" onClick={() => navigate('/register_org')}> Registreer </button>
            </div>
            </div>
        </section>
          <section className="contribution remove-margins section-background text-color-black">
            <h2 className="center-text format-title">Contact</h2>
            <p className="center-text">Voor eventuele vragen of opmerkingen kunt u hieronder het formulier invullen om contact met ons op te nemen.</p>
            <div className="contribution-stats-black block-middle-border">
              <h2 className="center-text smaller-text title-black">Contactformulier</h2>
              <form className='form'>
                <div className="input-group">
                  <label htmlFor="name">Naam</label>
                  <input type="text" id="name" />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Vraag</label>
                  <textarea type="text" id="vraag" />
                </div>
                <button type="submit" className="center-button button-black">
                  Verstuur
                </button>
            </form>
          </div>
        </section>



      </div>
    );
}
    



export default Home_ALG;