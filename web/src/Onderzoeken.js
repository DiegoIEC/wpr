import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Onderzoeken.css';

const Onderzoeken = () => {
  const [onderzoeken, setOnderzoeken] = useState(null);
  const [beperkingenMap, setBeperkingenMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch limitations to get their names
    axios.get('http://20.199.89.238:8088/api/beperking')
      .then(beperkingenResponse => {
        const newBeperkingenMap = {};
        beperkingenResponse.data.forEach(beperking => {
          newBeperkingenMap[beperking.beperkingId] = beperking.naam;
        });
        setBeperkingenMap(newBeperkingenMap);
      })
      .catch(error => {
        console.error('Error fetching beperkingen:', error);
      });

    // Fetch research data
    axios.get('http://20.199.89.238:8088/api/onderzoek')
      .then(onderzoekResponse => {
        setOnderzoeken(onderzoekResponse.data);
      })
      .catch(error => {
        console.error('Error fetching onderzoeken:', error);
        setOnderzoeken([]); // Set as an empty array in case of error
      });
  }, []);

  const handleMeerInfoClick = (id) => {
    navigate(`/onderzoek/${id}`);
  };

  if (onderzoeken === null) {
    return <p>Onderzoeken worden geladen...</p>;
  }

  return (
    <div className="research-list">
      <h1>Onderzoeken</h1>
      {onderzoeken.map((onderzoek) => (
        <div key={onderzoek.onderzoekId} className="research-item">
          <h2>{onderzoek.titel}</h2>
          <p>Type: {onderzoek.soort}</p>
          <p>{onderzoek.korteBeschrijving}</p>
          <div className="tags">
            {onderzoek.beperkingenIds.map((id, index) => (
              <span key={index} className="tag">{beperkingenMap[id] || 'Laden...'}</span>
            ))}
          </div>
          <button onClick={() => handleMeerInfoClick(onderzoek.onderzoekId)}>Meer info</button>
        </div>
      ))}
    </div>
  );
};

export default Onderzoeken;