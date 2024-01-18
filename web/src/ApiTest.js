import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './DeskundigeEdit.module.css';
import { useAuth } from './globals/auth';

// Function to generate random color
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

function DeskundigeEdit() {
  const [beperkingen, setBeperkingen] = useState([]);
  const [selectedBeperkingen, setSelectedBeperkingen] = useState([]);
  const [deskundige, setDeskundige] = useState({
    userId: null, // assuming this is the unique identifier for Deskundige
    deskundigeBeperkingen: []
    // add other properties as needed
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://20.199.89.238:8088/api/beperking')
      .then(response => {
        const options = response.data.map(beperking => ({
          value: beperking.beperkingId,
          label: beperking.naam,
          color: getRandomColor()
          
        }));
        setBeperkingen(options);
      })
      .catch(error => {
        setError('Error fetching Beperkingen');
      });

    axios.get('http://20.199.89.238:8088/api/deskundige/4')
      .then(response => {
        setDeskundige(response.data);
        const selectedOptions = response.data.deskundigeBeperkingen.map(beperking => ({
          value: beperking.beperkingId,
          label: beperking.naam
        }));
        setSelectedBeperkingen(selectedOptions);
      })
      .catch(error => {
        setError('Error fetching Deskundige');
      });
  }, []);

  // The rest of your component logic remains unchanged
  const handleBeperkingChange = (selectedOptions) => {
    setSelectedBeperkingen(selectedOptions || []);
  };

  const handleSave = () => {
    if (deskundige && selectedBeperkingen.length) {
      // Prepare the BeperkingenIds array with just the BeperkingId
      const beperkingenIds = selectedBeperkingen.map(b => b.value);
  
      // Prepare the updated Deskundige object
      const updatedDeskundige = {
        ...deskundige, // spread the existing properties
        BeperkingenIds: beperkingenIds // add BeperkingenIds property with selected IDs
      };
  
      // Remove properties that should not be sent in the PUT request
      delete updatedDeskundige.deskundigeBeperkingen;
      delete updatedDeskundige.deelnames;
      // Add any other properties you want to exclude from the PUT request
  
      axios.put(`http://20.199.89.238:8088/api/deskundige/${deskundige.userId}`, updatedDeskundige)
        .then(response => {
          alert('Deskundige updated successfully');
        })
        .catch(error => {
          setError('Error updating Deskundige');
          console.error('Error updating Deskundige:', error);
        });
    }
  };

  // Custom styles for the react-select component
  const customStyles = {
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
    <div className={styles.deskundigeEdit}>
      <h2>Edit Deskundige</h2>
      {error && <p className={styles.error}>{error}</p>}
      <Select
        isMulti
        name="beperkingen"
        options={beperkingen}
        className="basic-multi-select"
        classNamePrefix="select"
        value={selectedBeperkingen}
        onChange={handleBeperkingChange}
        styles={customStyles}// Apply custom styles
      />
      <button className={styles.saveButton} onClick={handleSave}>Save</button>
    </div>
  );
}

export default DeskundigeEdit;