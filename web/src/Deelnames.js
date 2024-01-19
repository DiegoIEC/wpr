import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Deelnames.css';
import { useAuth } from './globals/auth';

const Deelnames = () => {
  const [deelnames, setDeelnames] = useState([]);
  const [onderzoekenMap, setOnderzoekenMap] = useState({});
  const navigate = useNavigate();
  const deskundigeId = 1;

  useEffect(() => {
    axios.get('http://20.199.89.238:8088/api/onderzoek')
      .then(onderzoekResponse => {
        const newOnderzoekenMap = {};
        onderzoekResponse.data.forEach(onderzoek => {
          newOnderzoekenMap[onderzoek.onderzoekId] = {
            titel: onderzoek.titel,
            beschrijving: onderzoek.korteBeschrijving, 
            beperkingenIds: onderzoek.beperkingenIds, 
          };
        });
        setOnderzoekenMap(newOnderzoekenMap);
      })
      .catch(error => {
        console.error('Error fetching onderzoeken:', error);
      });

    axios.get(`http://20.199.89.238:8088/api/Deelname/${deskundigeId}`)
      .then(response => {
        setDeelnames(response.data);
      })
      .catch(error => {
        console.error('Error fetching deelnames:', error);
      });
  }, [deskundigeId]);

  const handleMeerInfoClick = (onderzoekId) => {
    navigate(`/onderzoek/${onderzoekId}`);
  };

  const handleDeleteClick = (deskundigeId, onderzoekId) => {
    axios.delete(`http://20.199.89.238:8088/api/Deelname/${deskundigeId}/${onderzoekId}`)
      .then(() => {
        setDeelnames(deelnames.filter(deelname => deelname.onderzoekId !== onderzoekId));
      })
      .catch(error => {
        console.error('Error deleting deelname:', error);
      });
  };

  // Function to render deelnames
const renderDeelnames = () => {
  return deelnames.map(deelname => (
    <div key={deelname.onderzoekId} className="deelname-item">
      <h2>{onderzoekenMap[deelname.onderzoekId]?.titel || 'Loading...'}</h2>
      <p>{onderzoekenMap[deelname.onderzoekId]?.beschrijving || 'Loading...'}</p>
      <button onClick={() => handleMeerInfoClick(deelname.onderzoekId)} className="meer-info-btn">Meer info</button>
      <button onClick={() => handleDeleteClick(deskundigeId, deelname.onderzoekId)} className="verwijder-btn">Verwijder</button>
    </div>
  ));
};

return (
  <div className="deelnames-container"> {/* Updated class name */}
    <h1>Mijn Onderzoeken </h1>
    <div className="deelnames-list">
      {deelnames.length ? renderDeelnames() : <p>Deelnames worden geladen...</p>}
    </div>
  </div>
);
};

export default Deelnames;