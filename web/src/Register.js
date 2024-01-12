import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Register = () => {
  const navigate = useNavigate();
  const [beperkingen, setBeperkingen] = useState([]);
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
    
  };

  const handleCheckboxChange = (day) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: !prevAvailability[day],
    }));
  };

  useEffect(() => {
    axios.get('http://20.199.89.238:3000/api/beperking')
      .then(response => {
        const options = response.data.map(beperking => ({
          value: beperking.BeperkingId,
          label: beperking.Naam
        }));
        setBeperkingen(options);
      })
      .catch(error => {
        console.error('Error fetching beperkingen:', error);
      });
    });

  const checkAvailability = () => {
      const trueDays = Object.entries(availability)
        .filter(([day, isAvailable]) => isAvailable)
        .map(([day]) => day);

      var resultString = `Available days: ${trueDays.join(', ')}`;
      return resultString
    };

  const handleRegister = async (e) => {
    
    e.preventDefault();
    checkPostal();
    checkPasswordMatch();
    var avai = checkAvailability();

    if (checkPW, checkPO){
      console.log('Saving user!')
      try {
        const response = await axios.get('http://20.199.89.238:3000/api/user/register', {
          params:{
            email: email,
            name: name,
            password: password,
            postal: postal,
            availability: avai,
            born: birthday,
            beperkingen: beperkingen,
            commercial: commercial,
            preference: preference
          }
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
      console.log('Helaas!')
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
                    <label htmlFor="dropdown">Selecteer uw beperking:</label>
                    <select id="dropdown1" value={beperking} onChange={(e) => setBeperking(e.target.checked)}>
                      {beperkingen.map((option) => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
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
                      placeholder="Herhaal uw wachtwoord in..."
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