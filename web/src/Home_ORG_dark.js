import './Darkmode.css';
import SiteModeButton from './SiteModeButton';
import { useAuth } from './globals/auth';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Home_ORG_Dark = () => {
  const navigate = useNavigate();
  const organisation = "organisatie"
  const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2']
  const reviewResearch = ['Onderzoek 3', 'Onderzoek 4']
  const completedResearch = ['Onderzoek 5', 'Onderzoek 6']
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
  else if(user.role != "ORG"){
    return <p style={{ color: 'red' }}>U heeft geen permissie.</p>;
  }
  else{
    return (
        <div className="home">
            <SiteModeButton/>
            <section className="welcome section-background-dark text-color-white block-content">
            <div className="block-left format-div">
            <h2 className="center-text format-title-dark">Welkom {user.naam}</h2>
            <p className="center-text text-color-white">Hieronder een overzicht met uw onderzoeken die nu lopen</p>
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
          <section className="ongoing-research remove-margins section-background-dark text-color-black">
            <h2 className="center-text format-title-dark">Overzicht onderzoeken</h2>
            <p className="center-text text-color-white">U heeft de volgende onderzoeken nog lopen</p>
            <div className="contribution-stats-white block-content">
            <div className="block-left-border">
            <p className="center-text text-bold text-color-white">Live onderzoeken</p>
            <ul className="center-text">
              {ongoingResearch.map((research, index) => (
                <li className="text-color-white" key={index}>{research}</li>
              ))}
            </ul>
            </div>
            <div className="block-right-border">
            <p className="center-text text-bold text-color-white">Onderzoeken in review</p>
            <ul className="center-text">
              {reviewResearch.map((research, index) => (
                <li className="text-color-white" key={index}>{research}</li>
              ))}
            </ul>
            </div>
            </div>
          </section>
          <section className="contribution remove-margins section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Nieuw onderzoek plaatsen</h2>
            <p className="center-text text-color-white">Upload of maak een nieuw onderzoek aan</p>
            <div className="block-content format-div">
            <div className="block-left">
            <button className="center-button button-big"> Upload een bestaand onderzoek </button>
            </div>
            <div className="block-right">
            <button className="center-button button-big"> Vul een van onze templates </button>
            </div>
          </div>
        </section>
        <section className="contribution remove-margins section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Overzicht resultaten</h2>
            <p className="center-text text-color-white">Een overzicht van uw afgeronde onderzoeken</p>
            <div className="contribution-stats-white">
            <div className="block-middle-border">
            <p className="center-text text-bold text-color-white">Afgeronde onderzoeken</p>
            <ul className="center-text">
              {completedResearch.map((research, index) => (
                <li className="text-color-white" key={index}>{research}</li>
              ))}
            </ul>
            </div>
            </div>
          
        </section>



      </div>
    );
}
}
    



export default Home_ORG_Dark;