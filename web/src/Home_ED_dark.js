import './Darkmode.css';
import SiteModeButton from './SiteModeButton';
import { useAuth } from './globals/auth';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Home_ED_Dark = () => {
  const navigate = useNavigate();
  const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2']
  const completedResearchCount = 100
  const compensation =  10
  const { user, loading, logout_user } = useAuth();

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
          <SiteModeButton/>
            <section className="welcome section-background-dark text-color-white block-content">
            <div className="block-left format-div">
            <h2 className="center-text format-title-dark">Welkom {user.naam}</h2>
            <p className="center-text text-color-white">Hieronder een overzicht met onderzoeken waarvoor u in aanmerking komt</p>
            <button className="center-button button-black"> Onderzoeken </button>
            </div>
            <div className="block-right format-div">
            <h2 className="center-text format-title-dark">Laatste nieuws</h2>
            <p className="center-text text-color-white">Het laatste nieuws omtrent online toegankelijkheid</p>
            <div className="news-content">
            <p className="center-text text-color-white">Google nieuws API...</p>
            </div>
            </div>
          </section>
          <section className="ongoing-research remove-margins section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Lopende onderzoeken</h2>
            <div className="block-middle-border text-color-white">
            <ul className="center-text text-color-white">
              {ongoingResearch.map((research, index) => (
                <li className="text-color-white" key={index}>{research}</li>
              ))}
            </ul>
            </div>
          </section>
          <section className="contribution remove-margins section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Uw bijdrage</h2>
            <p className="center-text text-color-white">Bekijk de verschillende onderzoeken die u zijn uitgevoerd</p>
            <button className="center-button button-black">Bekijk details</button>
            <div className="contribution-stats-white block-content">
            <div className="block-left-border">
              <h2 className="center-text smaller-text text-color-white">U heeft meegedaan aan zoveel onderzoeken:</h2>
              <p className="center-text text-color-white">{completedResearchCount}</p>
            </div>
            <div className="block-right-border">
                <h2 className="center-text smaller-text text-color-white">Ontvangen compensatie:</h2>
                <p className="center-text text-color-white">€{compensation}</p>
            </div>
          </div>
        </section>



      </div>
    );
}
}
    



export default Home_ED_Dark;