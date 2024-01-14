import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Deelnames = ({ deskundigeId }) => {
  const [deelnames, setDeelnames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

  if (!deelnames.length) {
    return <p>Loading deelnames...</p>;
  }

  return (
    <div className="deelnames-list">
      <h1>Deelnames van Expert {deskundigeId}</h1>
      {deelnames.map(deelname => (
        <div key={deelname.onderzoekId} className="deelname-item">
          <h2>Onderzoek ID: {deelname.onderzoekId}</h2>
          <button onClick={() => handleMeerInfoClick(deelname.onderzoekId)}>Meer info</button>
        </div>
      ))}
    </div>
  );
};

export default Deelnames;