import React from 'react';
import SiteModeButton from './SiteModeButton';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import './Home.css'
import './Darkmode.css';
import { useAuth } from './globals/auth';

const fetchBeperkingenData = async () => {
  try {
    const response = await axios.get('http://20.199.89.238:8088/api/beperking');
    const options = response.data.map(beperking => ({
      value: beperking.beperkingId,
      label: beperking.naam
    }));
    return options;
  } catch (error) {
    //setError('Error fetching Beperkingen');
  }
};

const Register_Dark = () => {
  const navigate = useNavigate();
  const { user, login_user, logout_user } = useAuth();
  const [beperkingen, setBeperkingen] = useState([]);
  const [error, setError] = useState('');
  const [selectedBeperkingen, setSelectedBeperkingen] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [postal, setPostal] = useState('');
  const [birthday, setBirthday] = React.useState(new Date());
  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [commercial, setCommercial] = useState(false);
  const [preference, setPreference] = useState('Via de mail');
  const [beperking, setBeperking] = useState('');

  const checkInput = async () => {
    var pw = false;
    var pc = false;
    const postalRegex = /^\d{4}[A-Za-z]{2}$/;

    if (postalRegex.test(postal)) {
      pc = true;
    }
    else{
      setPostal('');
    }
    if (password === password2) {
      pw = true;
    }
    else{
      setPassword('');
      setPassword2('');
    }
    if (pc === false && pw != false){
      return 'Uw postcode voldoet niet aan het verplichte format: 1234AB';
    }
    if (pw === false && pc != false){
      return 'Uw wachtwoord komt niet overeen, voer tweemaal hetzelfde wachtwoord in.';
    }
    if (pc === false && pw === false){
      return 'Uw wachtwoord en postcode zijn incorrect ingevuld.';
    }
    return '';
  }

  const handleCheckboxChange = (day) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: !prevAvailability[day],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (beperkingen.length === 0) {
        const options = await fetchBeperkingenData();
        setBeperkingen(options);
      }
    };

    fetchData();
  }, [beperkingen]);

  const checkAvailability = () => {
      const trueDays = Object.entries(availability)
        .filter(([day, isAvailable]) => isAvailable)
        .map(([day]) => day);

      var resultString = `Available days: ${trueDays.join(', ')}`;
      return resultString
    };

  const handleBeperkingChange = (e) => {
    //const selectedOption = e.target.value;
    const help = beperkingen.find(item => item.label === e.target.value);
    const selectedOption = e.target.value;
    const selectedId = help['value']
    
    if (selectedBeperkingen.includes(selectedOption)){
      const updatedSelection = selectedBeperkingen.filter((option) => option !== selectedOption);
      setSelectedBeperkingen(updatedSelection)
    }
    else{
      setSelectedBeperkingen([...selectedBeperkingen, selectedOption]);
    }
    if (selectedIds.includes(selectedId)){
      const updatedSelection = selectedIds.filter((option) => option !== selectedId);
      setSelectedIds(updatedSelection)
    }
    else{
      setSelectedIds([...selectedIds, selectedId]);
    }

    console.log(selectedBeperkingen)
    console.log(selectedIds)
    };

  const helpBirthday = (e) => {
    setBirthday(e);
    console.log(birthday)
  }

  const calcAge = () => {
    var month_diff = Date.now() - new Date(birthday).getTime();
    var age_help = new Date(month_diff);

    var year = age_help.getUTCFullYear();
    var age = Math.abs(year - 1970);

    return age;
  };

  const handleRegister = async (e) => {
    
    e.preventDefault();
    var message = await checkInput();
    setError(message);
    var avai = checkAvailability();
    var age = calcAge();
    var beperkingen = `Beperkingen: ${selectedBeperkingen.join(', ')}`;

    const emptyFields = Object.entries({
      Email: email,
      Password: password,
      Role: "ED",
      Postcode: postal,
      Naam: name,
      Leeftijd: age.toString(),
      Beschikbaarheid: avai,
      BenaderingVoorkeur: preference,
      BenaderingCommercieel: commercial.toString(),
      Aandoening: "Ongespecificeerd",
      Beperkingen: beperkingen,
      BeperkingenIds: selectedIds.join(', '),
    }).filter(([key, value]) => !value).map(([key]) => key);

    if (emptyFields.length > 0) {
      const ErrorMessage = `U ben de volgende veld(en) vergeten in te vullen: ${emptyFields.join(', ')}`;
      setError(ErrorMessage);
      return;
    }

    const userData = {
      Email: email,
      Password: password,
      Role: "ED",
      Postcode: postal,
      Naam: name,
      Leeftijd: age.toString(),
      Beschikbaarheid: avai,
      BenaderingVoorkeur: preference,
      BenaderingCommercieel: commercial.toString(),
      Aandoening: "Aanstelleritus",
      Beperkingen: beperkingen,
      BeperkingenIds: selectedIds.join(', ')
    };

    if (message.length === 0){
      console.log('Saving user!')
      console.log(userData)
      try {
        const response = await axios.post('http://20.199.89.238:8088/api/user', userData)
        .then(response => {
          var data = response.data;
          console.log(response)});
          navigate("/Login");
          console.log(error)
      }
      catch (error) {
        console.error('error: ', error);
        setError('Er is iets fout gegaan tijdens de registratie, probeer opnieuw.');
      }
    }
  };
    
    return (
        <div className="home">
            <SiteModeButton/>
            <section className="welcome section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Registreren</h2>
              <div className="contribution-stats-white block-middle-border-dark">
                <button className="center-button button-white" onClick={() => navigate('/register_org')}> Als organisatie klik hier </button>
                <form className='form-dark' onSubmit={handleRegister}>
                <div className="input-group-dark">
                    <label htmlFor="name">Naam</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Voer hier uw naam in..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-group-dark">
                    <label htmlFor="age">Geboorte datum</label>
                    <input
                      type="date"
                      id="birthday"
                      max={today}
                      value={birthday}
                      onChange={(e) => helpBirthday(e.target.value)}
                    />
                  </div>
                  <div className="input-group-dark">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Voer hier uw email in..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group-dark">
                    <label htmlFor="postal">Postcode</label>
                    <input
                      type="text"
                      id="postal"
                      placeholder="Voer hier uw postcode in..."
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                    />
                  </div>
                  <div className="input-group-dark">
                    <label>Beschikbaarheid</label>
                    {days.map((day) => (
                      
                        <label key={day.toLowerCase()} className='format-label'>
                          <input
                            type="checkbox"
                            checked={availability[day.toLowerCase()]}
                            onChange={() => handleCheckboxChange(day.toLowerCase())}
                          />
                          {day}
                        </label>
                      
                    ))}
                  </div>
                  <div className="input-group-dark">
                    <label htmlFor="commercial">Wilt u commercieel benaderd worden?</label>
                    <div className="checkbox-container">
                      <input className="format-checkbox"
                        type="checkbox"
                        id="commercial"
                        placeholder="Mag u commercieel benaderd worden?"
                        value={commercial}
                        onChange={(e) => setCommercial(e.target.checked)}
                      />
                      <label className="status-label">{commercial ? 'Ja' : 'Nee'}</label>
                    </div>
                  </div>
                  <div className="input-group-dark">
                    <label htmlFor="dropdown">Hoe wilt u het liefst benaderd worden?:</label>
                    <select id="dropdown" value={preference} onChange={(e) => setPreference(e.target.value)}>
                      <option value="email">Via de mail</option>
                      <option value="site">Via de website</option>
                      <option value="telefonisch">Telefonisch</option>
                    </select>
                  </div>
                  <div className="input-group-dark">
                  <label>Selecteer uw beperkings catagorie:</label>
                  <select
                    multiple
                    onChange={(e) => handleBeperkingChange(e)}
                    className="format-dropdown">
                    {beperkingen.map((beperkingOption) => (
                      <option key={beperkingOption.value} value={beperkingOption.label}>
                        {beperkingOption.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-color-white">Geselecteerde beperkingen:</p>
                  <ul>
                    {selectedBeperkingen.map((selectedOption) => (
                      <li className="text-color-white" key={selectedOption}>{selectedOption}</li>
                    ))}
                  </ul>
                  </div>
                  <div className="input-group-dark">
                    <label htmlFor="password">Wachtwoord</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Voer hier uw wachtwoord in..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="format-label" htmlFor="password">Herhaal wachtwoord</label>
                    <input
                      type="password"
                      id="password2"
                      placeholder="Herhaal uw wachtwoord..."
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                  <div className="error-message">
                    {error && <p>{error}</p>}
                  </div>
                  <div>
                    <button type="submit" className="center-button button-white">
                      Registreer
                    </button>
                  </div>
                </form>
              </div>
             
        </section>
      </div>
    );
}
    

export default Register_Dark;