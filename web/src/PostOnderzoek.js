import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './PostOnderzoek.css';
import { useAuth } from './globals/auth';

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

const getRandomId = () => {
  const id = Math.floor(Math.random() * 9999);
  return id;
};

function OnderzoekPost() {
  // useState hooks to handle form data
  const [onderzoekData, setOnderzoekData] = useState({
    onderzoekId: getRandomId(),
    titel: '',
    korteBeschrijving: '',
    beschrijving: '',
    beloning: 0,
    locatie: '',
    soort: 'enquete',
    startdatum: '2024-01-02T00:00:00Z',
    einddatum: '2024-01-30T00:00:00Z',
    beperkingenIds: [],
    deelnames: [],
    status: 0
  });
  const [beperkingenOptions, setBeperkingenOptions] = useState([]);
  const [selectedBeperkingen, setSelectedBeperkingen] = useState([]);

  // Fetch Beperkingen options for the Select component
  useState(() => {
    axios.get('http://20.199.89.238:8088/api/beperking')
      .then(response => {
        const options = response.data.map(beperking => ({
          value: beperking.beperkingId,
          label: beperking.naam,
          color: getRandomColor()
        }));
        setBeperkingenOptions(options);
      })
      .catch(error => {
        console.error('Error fetching Beperkingen:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOnderzoekData({ ...onderzoekData, [name]: value });

    
  
  };

  const handleBeperkingChange = (selectedOptions) => {
    setSelectedBeperkingen(selectedOptions);
    const ids = selectedOptions.map(option => option.value);
    setOnderzoekData({ ...onderzoekData, beperkingenIds: ids });
  };

  const handleSubmit = (event) => {
  
    event.preventDefault();

    const submissionData = {
      ...onderzoekData,
      startdatum: `${onderzoekData.startdatum}T00:00:00Z`,
      einddatum: `${onderzoekData.einddatum}T00:00:00Z`
    };
    console.log('Posting the following data to the server:', submissionData);
    axios.post('http://20.199.89.238:8088/api/onderzoek', submissionData)
      .then(response => {
        alert('Onderzoek is succesvol aangemaakt');
      })
      .catch(error => {
        console.error('Error posting onderzoek:', error);
      });
  };

 
  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? state.data.color : null,
      color: state.isFocused ? 'white' : 'black',
    }),
    multiValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: data.color,
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  };

  return (
    <div className="onderzoekPost">
      <h2>Post Nieuw Onderzoek</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="titel" className="label">Titel</label>
          <input
            id="titel"
            type="text"
            name="titel"
            value={onderzoekData.titel}
            onChange={handleInputChange}
            className="input"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="korteBeschrijving" className="label">Korte Beschrijving</label>
          <textarea
            id="korteBeschrijving"
            name="korteBeschrijving"
            value={onderzoekData.korteBeschrijving}
            onChange={handleInputChange}
            className="textarea"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="beschrijving" className="label">Lange Beschrijving</label>
          <textarea
            id="beschrijving"
            name="beschrijving"
            value={onderzoekData.beschrijving}
            onChange={handleInputChange}
            className="textarea"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="beperkingenIds" className="label">Beperkingen</label>
          <Select
            id="beperkingenIds"
            isMulti
            name="beperkingenIds"
            options={beperkingenOptions}
            classNamePrefix="select"
            value={selectedBeperkingen}
            onChange={handleBeperkingChange}
            styles={selectStyles}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="beloning" className="label">Beloning</label>
          <input
            id="beloning"
            type="number"
            name="beloning"
            value={onderzoekData.beloning}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="locatie" className="label">Locatie</label>
          <input
            id="locatie"
            type="text"
            name="locatie"
            value={onderzoekData.locatie}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="soort" className="label">Soort</label>
          <select
            id="soort"
            name="soort"
            value={onderzoekData.soort}
            onChange={handleInputChange}
            className="select"
          >
            <option value="enquete">Enquete</option>
            <option value="interview">Interview</option>
          </select>
        </div>

        <div className="formGroup">
          <label htmlFor="startdatum" className="label">Startdatum</label>
          <input
            id="startdatum"
            type="date"
            name="startdatum"
            value={onderzoekData.startdatum}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div className="formGroup">
          <label htmlFor="einddatum" className="label">Einddatum</label>
          <input
            id="einddatum"
            type="date"
            name="einddatum"
            value={onderzoekData.einddatum}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        

        <button type="submit" className="submitButton">Post Onderzoek</button>
      </form>
    </div>
  );
}

export default OnderzoekPost;