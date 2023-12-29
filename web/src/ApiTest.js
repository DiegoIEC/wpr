import React, { useState } from 'react';
import axios from 'axios';

function ApiTest() {
  const [beperkingen, setBeperkingen] = useState([]);
  const [error, setError] = useState('');

  const fetchBeperkingen = () => {
    axios.get('http://localhost:8088/api/beperking') // Make sure this URL is correct
      .then(response => {
        setBeperkingen(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError('Error fetching data');
      });
  };

  return (
    <div className="beperkingen-list">
      <button onClick={fetchBeperkingen}>Load Beperkingen</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {beperkingen.map((beperking) => (
          <li key={beperking.beperkingId}>{beperking.naam}</li>
        ))}
      </ul>
    </div>
  );
}

export default ApiTest;