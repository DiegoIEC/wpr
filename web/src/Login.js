import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginCounter, setLoginCounter] = useState(4);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    if (email === 'test@test.nl' && password === 'test') {
      navigate('/home_ED');
    }
    else{
      if (loginCounter == 1){
        navigate('/')
      }
      else{
      console.log('Incorrect email or password');
      setLoginCounter(loginCounter - 1);
      setLoginError(true);
      setEmail('');
      setPassword('');
      }
    }
  };
    
    return (
        <div className="home">
            <section className="welcome section-background-blue text-color-green">
            <h2 className="center-text title">Login</h2>
            </section>
            <section className="welcome section-background-blue text-color-green">
              <div className="contribution-stats-green block-middle-border-blue">
                <form>
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
                    <label htmlFor="password">Wachtwoord</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Voer hier uw wachtwoord in..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {loginError && (
                    <div className="error-message">
                      <label htmlFor='error' className="error">Incorrecte email of wachtwoord. U heeft nog {loginCounter} pogingen.</label>
                      </div>
                  )}
                  <div>
                    <button type="button" className="center-button button-blue" onClick={handleLogin}>
                      Login
                    </button>
                    <button type="button" className="center-button button-blue">
                      Wachtwoord vergeten
                    </button>
                  </div>
                </form>
              </div>
             
        </section>
      </div>
    );
}
    

export default Login;