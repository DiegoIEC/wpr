import './Home.css';
import SiteModeButton from './SiteModeButton';
import { useAuth } from './globals/auth';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Chat from './Chat';

const Home_ED = () => {
  const navigate = useNavigate();
  const { user, loading, logout_user } = useAuth();
  const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2']
  const completedResearchCount = 100
  const compensation =  10

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading){
        navigate("/Login");
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [loading, navigate]);

  if (loading) {
    return <p style={{ color: 'black' }}>Loading...</p>;
  }
  else if(user.role != "ED" && user.role != "deskundige"){
    return <p style={{ color: 'red' }}>U heeft geen permissie.</p>;
  }
  else{
    return (
        <div className="home">
          <Chat/>
          <SiteModeButton/>
            <section className="welcome section-background text-color-black block-content">
            <div className="block-left format-div">
            <h2 className="center-text format-title">Welkom {user.naam}</h2>
            <p className="center-text">Hieronder een overzicht met onderzoeken waarvoor u in aanmerking komt</p>
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
            <h2 className="center-text format-title">Lopende onderzoeken</h2>
            <div className="block-middle-border">
            <ul className="center-text">
              {ongoingResearch.map((research, index) => (
                <li key={index}>{research}</li>
              ))}
            </ul>
            </div>
          </section>
          <section className="contribution remove-margins section-background text-color-black">
            <h2 className="center-text format-title">Uw bijdrage</h2>
            <p className="center-text">Bekijk de verschillende onderzoeken die u zijn uitgevoerd</p>
            <button className="center-button button-black">Bekijk details</button>
            <div className="contribution-stats-black block-content">
            <div className="block-left-border">
              <h2 className="center-text smaller-text title-black">U heeft meegedaan aan zoveel onderzoeken:</h2>
              <p className="center-text">{completedResearchCount}</p>
            </div>
            <div className="block-right-border">
                <h2 className="center-text smaller-text title-black">Ontvangen compensatie:</h2>
                <p className="center-text">€{compensation}</p>
            </div>
          </div>
        </section>
      </div>
    );
}
}
    



export default Home_ED;