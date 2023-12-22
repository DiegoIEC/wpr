import React from 'react';
import './Organisaties.css';

const Organisaties = () => {
  const organizationName = "Naam Organisatie";
  return (
    <div className="company-portal">
      <div className="flex-container">
        <section className="welcome section-background-blue text-color-green">
          <div className="welcome-content">
            <h2>Welkom {organizationName}</h2>
            <p>Hieronder een overzicht met de onderzoeken die bezig zijn</p>
            <button className="center-button button-green">Onderzoeken</button>
          </div>
        </section>

        <section className="latest-news section-background-green text-color-blue">
          <div className="news-content">
            <h2>Laatste nieuws</h2>
            <p>Het laatste nieuws omtrent online toegankelijkheid.</p>
          </div>
        </section>
      </div>

      <section className="overview section-background-blue text-color-green">
        <h2 className="center-text">Overzicht onderzoeken</h2>
        <p className="center-text smaller-text">U heeft de volgende onderzoeken nog lopen</p>

        <div className="live-research">
          <p className="research-category">Live onderzoeken</p>
          <ul>
            <li>Onderzoek 1</li>
            <li>Onderzoek 2</li>
          </ul>
        </div>

        <div className="review-research">
          <p className="research-category">Onderzoeken in review</p>
          <ul>
            <li>Onderzoek 3</li>
            <li>Onderzoek 4</li>
          </ul>
        </div>
      </section>

      {/* Nieuw onderzoek plaatsen */}
      <section className="new-research section-background-blue text-color-green">
        <h2 className="center-text">Nieuw onderzoek plaatsen</h2>
        <p className="center-text smaller-text">Upload of maak een nieuw onderzoek aan</p>
        <div className="new-research-buttons">
          <button className="button-green">Upload een bestaand onderzoek</button>
          <button className="button-blue">Vul een van onze templates</button>
        </div>
      </section>

      {/* Overzicht resultaten */}
      <section className="result-overview section-background-blue text-color-green">
        <h2 className="center-text">Overzicht resultaten</h2>
        <p className="center-text smaller-text">Een overzicht van de verschillende door u geplaatste onderzoeken die zijn afgerond</p>
        <div className="completed-research">
          <p className="research-category">Afgeronde onderzoeken</p>
          <ul>
            <li>Onderzoek 1</li>
            <li>Onderzoek 2</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Organisaties;
