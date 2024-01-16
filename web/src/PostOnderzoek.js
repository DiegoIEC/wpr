import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './PostOnderzoek.css';

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
    console.log('Posting the following data to the server:', onderzoekData);
    axios.post('http://20.199.89.238:8088/api/onderzoek', onderzoekData)
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

        <button type="submit" className="submitButton">Post Onderzoek</button>
      </form>
    </div>
  );
}

export default OnderzoekPost;