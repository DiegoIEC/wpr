import React from 'react';
import SiteModeButton from './SiteModeButton';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import './Home.css'
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

const Register = () => {
  const navigate = useNavigate();
  const { user, login_user, logout_user } = useAuth();
  const [beperkingen, setBeperkingen] = useState([]);
  const [error, setError] = useState('');
  const [errorCaretaker, setErrorCaretaker] = useState('');
  const [selectedBeperkingen, setSelectedBeperkingen] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const today = new Date().toISOString().split('T')[0];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [email, setEmail] = useState('');
  const [emailCaretaker, setEmailCaretaker] = useState('');
  const [name, setName] = useState('');
  const [nameCaretaker, setNameCaretaker] = useState('');
  const [postal, setPostal] = useState('');
  const [postalCaretaker, setPostalCaretaker] = useState('');
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
    var avai = checkAvailability();
    var age = calcAge();
    var beperkingen = `Beperkingen: ${selectedBeperkingen.join(', ')}`;
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
      return ErrorMessage;
    }

    const careTakerFields = Object.entries({
      Naam: nameCaretaker,
      Email: emailCaretaker,
      Postcode: postalCaretaker
    }).filter(([key, value]) => !value).map(([key]) => key);

    if (careTakerFields.length > 0 && age < 18) {
      const ErrorMessage = `Als minderjarige moet u een verzorger aanmelden, u ben de volgende veld(en) vergeten in te vullen: ${careTakerFields.join(', ')}`;
      setErrorCaretaker(ErrorMessage);
      return ErrorMessage;
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
    var caretaker = false;
    var message = await checkInput();
    setError(message);
    var avai = checkAvailability();
    var age = calcAge();
    var beperkingen = `Beperkingen: ${selectedBeperkingen.join(', ')}`;

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

    const careTakerFields = Object.entries({
      Naam: nameCaretaker,
      Email: emailCaretaker,
      Postcode: postalCaretaker
    }).filter(([key, value]) => !value).map(([key]) => key);

    const careTaker = {
      Naam: nameCaretaker,
      Email: emailCaretaker,
      Postcode: postalCaretaker
    }

    if (careTakerFields.length === 0){
      var input = [userData, careTaker];
    }
    else{
      var input = [userData];
    }


    if (message.length === 0){
      console.log('Saving user!')
      console.log(userData)
      try {
        const response = await axios.post('http://20.199.89.238:8088/api/user', input)
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
            <section className="welcome section-background text-color-black">
            <h2 className="center-text format-title">Registreren</h2>
            </section>
            <section className="welcome section-background text-color-black block-content-reg">
              <div className="contribution-stats-black block-left-border">
                <p className='center-text'>Gegevens gebruiker</p>
                <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label htmlFor="name">Naam</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Voer hier uw naam in..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="age">Geboorte datum</label>
                    <input
                      type="date"
                      id="birthday"
                      max={today}
                      value={birthday}
                      onChange={(e) => helpBirthday(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Voer hier uw email in..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="postal">Postcode</label>
                    <input
                      type="text"
                      id="postal"
                      placeholder="Voer hier uw postcode in..."
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
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
                  <div className="input-group">
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
                  <div className="input-group">
                    <label htmlFor="dropdown">Hoe wilt u het liefst benaderd worden?:</label>
                    <select id="dropdown" value={preference} onChange={(e) => setPreference(e.target.value)}>
                      <option value="email">Via de mail</option>
                      <option value="site">Via de website</option>
                      <option value="telefonisch">Telefonisch</option>
                    </select>
                  </div>
                  <div className="input-group">
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
                  <p>Geselecteerde beperkingen:</p>
                  <ul>
                    {selectedBeperkingen.map((selectedOption) => (
                      <li key={selectedOption}>{selectedOption}</li>
                    ))}
                  </ul>
                  </div>
                  <div className="input-group">
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
                    <button type="submit" className="center-button button-black">
                      Registreer
                    </button>
                    <button className="center-button button-black" onClick={() => navigate('/register_org')}> Registreren als organisatie </button>
                  </div>
                </form>
              </div>
              <div className="contribution-stats-black block-right-border">
                <p className='center-text'>Gegevens verzorger (indien de gebruiker jonger dan 18 jaar is of een verzorger wenst)</p>
                <form>
                <div className="input-group">
                    <label htmlFor="name">Naam</label>
                    <input
                      type="text"
                      id="name2"
                      placeholder="Voer hier uw naam in..."
                      value={nameCaretaker}
                      onChange={(e) => setNameCaretaker(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email2"
                      placeholder="Voer hier uw email in..."
                      value={emailCaretaker}
                      onChange={(e) => setEmailCaretaker(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="postal">Postcode</label>
                    <input
                      type="text"
                      id="postal2"
                      placeholder="Voer hier uw postcode in..."
                      value={postalCaretaker}
                      onChange={(e) => setPostalCaretaker(e.target.value)}
                    />
                  </div>
                  <div className="error-message">
                    {errorCaretaker && <p>{errorCaretaker}</p>}
                  </div>
                </form>
              </div>
              

             
        </section>
      </div>
    );
}
    

export default Register;