import React, { useState, useEffect } from 'react';
import SiteModeButton from './SiteModeButton';
import './Instellingen.css';
import { useAuth } from './globals/auth'; //Deze
import { useNavigate } from 'react-router-dom'; //Deze

const Instellingen = () => {
  const { user, loading, logout_user } = useAuth(); //Deze
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stad, setStad] = useState('');

  const [currentName, setCurrentName] = useState('Jan van der Steeg'); // Replace with actual current values
  const [currentEmail, setCurrentEmail] = useState('janvdsteeg@hotmail.com');
  const [currentStad, setCurrentStad] = useState('Den Haag');

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save the updated values to the server or perform any necessary actions
    setCurrentName(name.trim() !== '' ? name : currentName);
    setCurrentEmail(email.trim() !== '' ? email : currentEmail);
    setCurrentStad(stad.trim() !== '' ? stad : currentStad);

    setIsEditing(false);
  };

  // Start
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (loading){
        navigate("/Login");
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [loading, navigate]);

  if (loading) {
    return <p style={{ color: 'black' }}>Loading...</p>;
  }
  // Eind

  return (
    <div className="settings-container">
          <h2 className="center-text format-title">Instellingen</h2>

      <div className="current-values">
        <p>Huidige naam: {user.naam}</p>
        <p>Huidige e-mail: {currentEmail}</p>
        <p>Huidige woonplaats: {currentStad}</p>
      </div>

      {isEditing ? (
        <>
          <label htmlFor="name">Nieuwe naam:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />

          <label htmlFor="email">Nieuwe e-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <label htmlFor="stad">Nieuwe woonplaats:</label>
          <input
            type="text"
            id="stad"
            value={stad}
            onChange={(e) => setStad(e.target.value)}
            className="input-field"
            required
          />

          <button type="button" onClick={handleSave} className="save-button">
            Opslaan
          </button>
        </>
      ) : (
        <button type="button" onClick={handleEdit} className="edit-button">
          Verander
        </button>
      )}
    </div>
  );
};

export default Instellingen;
