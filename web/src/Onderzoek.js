import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './globals/auth';

const OnderzoekDetail = () => {
  const [onderzoek, setOnderzoek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [beperkingen, setBeperkingen] = useState([]);
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const deskundigeId = 1; // Replace with actual logged in deskundige ID

  useEffect(() => {
    // Fetch the research details
    axios.get(`http://20.199.89.238:8088/api/onderzoek/${id}`)
      .then(response => {
        setOnderzoek(response.data);
        fetchBeperkingen(response.data.beperkingenIds);
      })
      .catch(error => {
        console.error('Error fetching onderzoek details:', error);
        setLoading(false);
      });
  }, [id]);

  const fetchBeperkingen = (beperkingenIds) => {
    axios.get('http://20.199.89.238:8088/api/beperking')
      .then(response => {
        const beperkingenMap = response.data.reduce((acc, beperking) => {
          acc[beperking.beperkingId] = beperking.naam;
          return acc;
        }, {});
        const beperkingenNames = beperkingenIds.map(id => beperkingenMap[id]);
        setBeperkingen(beperkingenNames);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching beperkingen:', error);
        setLoading(false);
      });
  };

  const handleDeelnemen = () => {
    const deelnameData = {
      DeskundigeId: deskundigeId,
      OnderzoekId: parseInt(id), // Assuming id is a string and needs to be an integer
      status: 1,
      deskundige: {
        // Populate with the deskundige details
        userId: deskundigeId, // This should come from the actual logged-in user's data
        // Other properties as needed
      },
      onderzoek: {
        // Populate with the onderzoek details
        onderzoekId: parseInt(id), // This should match the OnderzoekId
        // Other properties as needed
      }
    };
  
    axios.post(`http://20.199.89.238:8088/api/deelname`, deelnameData)
      .then(response => {
        alert('Successfully joined the research');
        // Update UI or state as needed
      })
      .catch(error => {
        console.error('Error joining the research:', error);
      });
  };

  const handleNietGeinteresseerd = () => {
    const deelnameData = {
      DeskundigeId: deskundigeId,
      OnderzoekId: parseInt(id), // Assuming id is a string and needs to be an integer
      status: 0,
      deskundige: {
        // Populate with the deskundige details
        userId: deskundigeId, // This should come from the actual logged-in user's data
        // Other properties as needed
      },
      onderzoek: {
        // Populate with the onderzoek details
        onderzoekId: parseInt(id), // This should match the OnderzoekId
        // Other properties as needed
      }
    };
  
    axios.post(`http://20.199.89.238:8088/api/deelname`, deelnameData)
      .then(response => {
        alert('You have expressed disinterest');
        // Update UI or state as needed
      })
      .catch(error => {
        console.error('Error expressing disinterest:', error);
      });
  };

  if (loading) {
    return <p>Loading onderzoek details...</p>;
  }

  return (
    <div className="onderzoek-detail">
      <h1>{onderzoek?.titel} test</h1>
      <p>Type: {onderzoek?.soort}</p>
      <p>{onderzoek?.korteBeschrijving}</p>
      <div className="tags">
        {beperkingen.map((beperking, index) => (
          <span key={index} className="tag">{beperking}</span>
        ))}
      </div>
      <button onClick={handleDeelnemen}>Deelnemen</button>
      <button onClick={handleNietGeinteresseerd}>Niet geïnteresseerd</button>
    </div>
  );
};

export default OnderzoekDetail;