import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import styles from './DeskundigeEdit.module.css';

function DeskundigeEdit() {
  const [beperkingen, setBeperkingen] = useState([]);
  const [selectedBeperkingen, setSelectedBeperkingen] = useState([]);
  const [deskundige, setDeskundige] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8088/api/beperking')
      .then(response => {
        // Map the response to the format that react-select expects
        const options = response.data.map(beperking => ({
          value: beperking.BeperkingId,
          label: beperking.Naam
        }));
        setBeperkingen(options);
      })
      .catch(error => {
        console.error('Error fetching beperkingen:', error);
        setError('Error fetching Beperkingen');
      });
  
    axios.get('http://localhost:8088/api/deskundige/4')
      .then(response => {
        // Set the deskundige state
        setDeskundige(response.data);
        // Map the DeskundigeBeperkingen to the react-select format
        const selectedOptions = response.data.DeskundigeBeperkingen.map(beperking => ({
          value: beperking.BeperkingId,
          label: beperking.Naam
        }));
        setSelectedBeperkingen(selectedOptions);
      })
      .catch(error => {
        console.error('Error fetching Deskundige:', error);
        setError('Error fetching Deskundige');
      });
  }, []);

  const handleBeperkingChange = (selectedOptions) => {
    setSelectedBeperkingen(selectedOptions || []);
  };

  const handleSave = () => {
    if (deskundige && selectedBeperkingen) {
      const beperkingenToUpdate = selectedBeperkingen.map(b => b.value);
      const updatedDeskundige = {
        ...deskundige,
        DeskundigeBeperkingen: beperkingenToUpdate
      };

      axios.put(`http://localhost:8088/api/deskundige/${deskundige.UserId}`, updatedDeskundige)
        .then(response => {
          alert('Deskundige updated successfully');
        })
        .catch(error => {
          setError('Error updating Deskundige');
        });
    }
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
      />
      <button className={styles.saveButton} onClick={handleSave}>Save</button>
    </div>
  );
}

export default DeskundigeEdit;