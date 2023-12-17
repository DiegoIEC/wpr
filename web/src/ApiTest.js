import React, { useState } from 'react';
import axios from 'axios';

function ApiTest() {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState('');

  const fetchDrivers = () => {
    axios.get('http://localhost:8088/drivers')
      .then(response => {
        console.log(response.data); // Check the response structure in the console
        setDrivers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError('Error fetching data');
      });
  };

  return (
    <div className="apitest">
      <button onClick={fetchDrivers}>Load Drivers</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {drivers.length > 0 ? (
        <ul>
          {drivers.map(driver => (
            // Update to display driver.name and driver.driverNumber
            <li key={driver.id}>{driver.name} - #{driver.driverNumber}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default ApiTest;