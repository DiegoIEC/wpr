import React from 'react';
import SiteModeButton from './SiteModeButton';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
};

const fetchBeperkingenData = async () => {
  try {
    const response = await axios.get('http://20.199.89.238:8088/api/beperking');
    const options = response.data.map(beperking => ({
      value: beperking.beperkingId,
      label: beperking.naam,
      color: getRandomColor(),
    }));
    return options;
  } catch (error) {
    //setError('Error fetching Beperkingen');
  }
};

const userData = {
  UserId: 0,
  Email: '',
  Password: '',
  Role: '',
  Postcode: '',
  Naam: '',
  Leeftijd: 0,
  Beschikbaarheid: '',
  BenaderingVoorkeur: '',
  BenaderingCommercieel: '',
  Aandoening: '',
  BeperkingenIds: []
};

const Register = () => {
  const navigate = useNavigate();
  const [beperkingen, setBeperkingen] = useState([]);
  const [error, setError] = useState('');
  const [selectedBeperkingen, setSelectedBeperkingen] = useState([]);
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
  const [preference, setPreference] = useState('');
  const [beperking, setBeperking] = useState('');
  const [checkPW, setCheckPW] = useState(false);
  const [checkPO, setCheckPO] = useState(false);

  const checkPostal = () => {
    const postalRegex = /^\d{4}[A-Za-z]{2}$/;

    if (postalRegex.test(postal)) {
      setCheckPO(true);
    }
    else{
      setPostal('');
      setCheckPO(false);
    }
    return checkPO;
    
  };
  
  const checkPasswordMatch = () => {

    if (password == password2) {
      setCheckPW(true);
    }
    else{
      setPassword('');
      setPassword2('');
      setCheckPW(false);
    }
    return checkPW;
    
  };

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
    const selectedOption = e.target.value
    if (selectedBeperkingen.includes(selectedOption)){
      const updatedSelection = selectedBeperkingen.filter((option) => option !== selectedOption);
      setSelectedBeperkingen(updatedSelection)
    }
    else{
      setSelectedBeperkingen([...selectedBeperkingen, selectedOption]);
    }
    console.log(selectedBeperkingen)
    };

  const calcAge = () => {
    var month_diff = Date.now() - birthday.getTime();
    var age_help = new Date(month_diff);

    var year = age_help.getUTCFullYear();
    var age = Math.abs(year - 1970);

    return age;
  };

  const handleRegister = async (e) => {
    
    e.preventDefault();
    const pc = await checkPostal();
    const pw = await checkPasswordMatch();
    var avai = checkAvailability();
    var age = calcAge();

    userData.Email = email;
    userData.Password = password;
    userData.Role = "ED";
    userData.Postcode = postal;
    userData.Naam = name;
    userData.Leeftijd = age;
    userData.Beschikbaarheid = avai;
    userData.BenaderingVoorkeur = preference;
    userData.BenaderingCommercieel = commercial.toString();
    userData.Aandoening = selectedBeperkingen;

    if (pc && pw){
      console.log('Saving user!')
      try {
        const response = await axios.post('http://20.199.89.238:8088/api/user', {
          body: userData
        })
        .then(response => {
          var data = response.data;
          console.log(response)})
      }
      catch (error) {
        console.error('An error occurred during login:', error);
      }
    }
    else{
      console.log('Helaas...')
    }
  };
    
    return (
        <div className="home">
            <section className="welcome section-background text-color-black">
            <h2 className="center-text format-title">Registreren</h2>
            </section>
            <section className="welcome section-background text-color-black">
              <div className="contribution-stats-black block-middle-border">
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
                      onChange={(e) => setBirthday(e.target.value)}
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
                    <select id="dropdown" value={preference} onChange={(e) => setPreference(e.target.checked)}>
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
                  <div>
                    <button type="submit" className="center-button button-black">
                      Registreer
                    </button>
                  </div>
                </form>
              </div>
             
        </section>
      </div>
    );
}
    

export default Register;