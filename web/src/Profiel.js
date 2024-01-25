import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from './globals/auth';
import styles from './Profiel.css';
import { useNavigate } from 'react-router-dom'; //Deze


const Profiel = () => {
    const { user, loading, logout_user } = useAuth(); //Deze
    const navigate = useNavigate();
    const [deskundige, setDeskundige] = useState({ beperkingenIds: [] });
    const id = 1; // Assuming 'id' is meant to be used for fetching specific deskundige details
    const [beperkingenMap, setBeperkingenMap] = useState({});
    

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


        // Fetch the deskundige details
        axios.get(`http://20.199.89.238:8088/api/deskundige/${id}`)
            .then(response => {
                setDeskundige(response.data);
            })
            .catch(error => {
                console.error('Error fetching deskundige details:', error);
            });

          // Fetch the deskundige beperkingen
    axios.get(`http://20.199.89.238:8088/api/DeskundigeBeperking/${id}`)
    .then(response => {
      const beperkingenIds = response.data.map(db => db.beperkingId);
      console.log('Beperkingen IDs:', beperkingenIds); 

      setDeskundige(deskundige => ({ ...deskundige, beperkingenIds: beperkingenIds }));
    })
    .catch(error => {
      console.error('Error fetching deskundige beperkingen:', error);
    });
}, [id]); 

useEffect(() => {
  const timeoutId = setTimeout(() => {
    if (loading){
      navigate("/Login");
    }
  }, 1000);
  return () => clearTimeout(timeoutId);
}, [loading, navigate]);

    

    if (!deskundige) {
        return <p>Loading deskundige details...</p>;
    }
  
    if (loading) {
      return <p style={{ color: 'black' }}>Loading...</p>;
    }

    return (
      <div className="deskundige-detail">
          <h1 className='format-title'>{user.naam}</h1>
          <p>Postcode: {user.postcode}</p>
          <p>Leeftijd: {user.leeftijd}</p>
          <p>Beschikbaarheid: {user.beschikbaarheid}</p>
          <p>Benadering Voorkeur: {user.benaderingVoorkeur}</p>
          <p>Benadering Commercieel: {user.benaderingCommercieel}</p>
          <p>Aandoening: {user.aandoening}</p>
          <div className="tags">
      {deskundige.beperkingenIds && deskundige.beperkingenIds.map((id, index) => (
        <span key={index} className="tag">{beperkingenMap[id] || 'Laden...'}</span>
      ))}
    </div>
      </div>
  );
};

export default Profiel;