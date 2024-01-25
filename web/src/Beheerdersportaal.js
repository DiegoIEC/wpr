import React, { useState } from 'react';
import './Beheerdersportaal.css';
import SiteModeButton from './SiteModeButton';
import { Link } from 'react-router-dom';
import DeskundigenList from './DeskundigenList';

const admin = "beheerder";
const ongoingResearch = ['Onderzoek 1', 'Onderzoek 2'];
const reviewResearch = [
  { name: 'Onderzoek 3', status: 'pending' },
  { name: 'Onderzoek 4', status: 'pending' },
];
const completedResearch = ['Onderzoek 5', 'Onderzoek 6'];
const completedResearchCount = 100;
const compensation = 18;

const Beheerdersportaal = () => {
  const [researchList, setResearchList] = useState(reviewResearch);

  const handleResearchApproval = (index, approve) => {
    const updatedList = [...researchList];
    updatedList[index].status = approve ? 'approved' : 'removed';
    setResearchList(updatedList);
  };

  const revertResearchStatus = (index) => {
    const updatedList = [...researchList];
    updatedList[index].status = 'pending';
    setResearchList(updatedList);
  };

  const [ervaringsdeskundigen, setErvaringsdeskundigen] = useState([
    { gebruikersnaam: 'Gebruiker1', typeBeperking: 'Blind', contactInfo: 'gebruiker1@gmail.com' },
    { gebruikersnaam: 'Gebruiker2', typeBeperking: 'Slechthorend', contactInfo: 'gebruiker2@gmail.com' },
    // Voeg meer ervaringsdeskundigen toe zoals nodig
  ]);

  return (
    <div className="home">
      <SiteModeButton />
      <section className="welcome section-background text-color-black block-content">
        <div className="block-left format-div">
          <h2 className="center-text format-title">Welkom {admin}</h2>
          <p className="center-text">Hieronder een overzicht met uw onderzoeken die bezig zijn</p>
          <Link to="/onderzoeken" className="center-button button-black">
            Onderzoeken
          </Link>
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
        <h2 className="center-text format-title">Ongoing Onderzoeken</h2>
        <p className="center-text">U heeft de volgende onderzoeken nog lopen</p>
        <ul className="center-text">
          <li style={{ listStyleType: 'none', fontWeight: 'bold' }}>Onderzoeken</li>
          {ongoingResearch.map((research, index) => (
            <li key={index}>{research}</li>
          ))}
        </ul>
      </section>
      <section className="contribution remove-margins section-background text-color-black">
        <h2 className="center-text format-title">Overzicht resultaten</h2>
        <p className="center-text">Een overzicht van de verschillende door u geplaatste onderzoeken die zijn afgerond</p>
      </section>
      <section className="completed-research-section">
        <div className="completed-research-container">
          <p className="center-text text-bold">Afgeronde onderzoeken</p>
          <ul className="center-text">
            {completedResearch.map((research, index) => (
              <li key={index}>{research}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pending-approval-section section-background text-color-black">
        <h2 className="center-text format-title">Overzicht onderzoeken afwachtend op goedkeuring</h2>
        <p className="center-text">U heeft de volgende onderzoeken nog lopen</p>
        <section className="completed-research-section">
          <div className="completed-research-container"></div>
          <ul className="center-text">
            <li style={{ listStyleType: 'none', fontWeight: 'bold' }}>Onderzoeken</li>
            {researchList.map((research, index) => (
              <li key={index} style={{ listStyleType: 'disc' }}>
                {research.name}{' '}
                {research.status === 'pending' && (
                  <>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleResearchApproval(index, true)}>
                      ✓
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={() => handleResearchApproval(index, false)}>
                      ✗
                    </span>
                  </>
                )}
                {research.status === 'approved' && (
                  <>
                    ✓ goedgekeurd{' '}
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => revertResearchStatus(index)}
                    >
                      (Revert)
                    </span>
                  </>
                )}
                {research.status === 'removed' && (
                  <>
                    ✗ verwijderd{' '}
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => revertResearchStatus(index)}
                    >
                      (Revert)
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </section>

      <section className="ervaringsdeskundigen-section section-background text-color-black">
        <h2 className="center-text format-title">Overzicht van de ervaringsdeskundigen</h2>
        <DeskundigenList />
      </section>
    </div>
  );
}

export default Beheerdersportaal;
