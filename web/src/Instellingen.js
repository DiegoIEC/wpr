import React, { useState } from 'react';
import './Instellingen.css';

  const Instellingen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setStad] = useState('');

    const updateSettings = () => {
      // Voeg logica toe om de gegevens naar de server te sturen
      console.log('Gegevens bijgewerkt:', { name, email, city });
    };

      return (
        <div className="settings-container">
          <h2>Instellingen</h2>
          <label htmlFor="name">Naam:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="stad">Woonplaats:</label>
          <input
            type="text"
            id="stad"
            value={city}
            onChange={(e) => setStad(e.target.value)}
            required
          />

          <button type="button" onClick={updateSettings}>
            Opslaan
          </button>
        </div>
      );
    }

export default Instellingen;