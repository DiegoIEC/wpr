import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from './globals/auth';

const Profiel = () => {
    const [deskundige, setDeskundige] = useState(null);
    const [beperkingenMap, setBeperkingenMap] = useState({});
  const  id = 1;


  useEffect(() => {
    // Fetch all beperkingen to create a map
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
    axios.get(`http://20.199.89.238:8088/api/deskundige/1`)
      .then(response => {
        setDeskundige(response.data);
      })
      .catch(error => {
        console.error('Error fetching deskundige details:', error);
      });
  }, [id]);

  if (!deskundige) {
    return <p>Loading deskundige details...</p>;
  }

  const beperkingenNames = deskundige.DeskundigeBeperkingen && Array.isArray(deskundige.DeskundigeBeperkingen)
  ? deskundige.DeskundigeBeperkingen.map(db => beperkingenMap[db.BeperkingId])
  : [];



  return (
    <div className="deskundige-detail">
      <h1>{deskundige.Naam}</h1>
      <p>Postcode: {deskundige.Postcode}</p>
      <p>Leeftijd: {deskundige.Leeftijd}</p>
      <p>Beschikbaarheid: {deskundige.Beschikbaarheid}</p>
      <p>Benadering Voorkeur: {deskundige.BenaderingVoorkeur}</p>
      <p>Benadering Commercieel: {deskundige.BenaderingCommercieel}</p>
      <p>Aandoening: {deskundige.Aandoening}</p>
      <h2>Beperkingen</h2>
      <ul>
      {beperkingenNames.map((naam, index) => (
          <li key={index}>{naam}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profiel;