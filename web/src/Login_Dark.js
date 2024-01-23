import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import './Darkmode.css';
import { useAuth } from './globals/auth';
import SiteModeButton from './SiteModeButton';

function Login_Dark({ onLogin }) {
  const { user, login_user, logout_user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginCounter, setLoginCounter] = useState(4);
  const redirect = {url: ''};

  const HandleRole = (e) => {
    if (e.role == "ED" || e.role == "deskundige"){
      redirect.url = "/home_ED"
    }
    else if (e.role == "ORG"){
      redirect.url = "/home_ORG"
    }
    else if (e.role == "ADMIN"){
      redirect.url = "/"
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {

      const response = await axios.get('http://20.199.89.238:8088/api/user', {
        params:{
          email: email
        }
      })
      .then(async response => {
        var data = response.data;
        console.log(response)
        if (response.status == 200){
          if (password === data.password){
            login_user(data);
            HandleRole(data);
            navigate(redirect.url)
          }
          else{
            if (loginCounter === 1) {
              navigate('/');
            }
            else{
              setLoginCounter(loginCounter - 1);
              setLoginError(true);
              setEmail('');
              setPassword('');
            }
          }
        }
        else{
          if (loginCounter === 1) {
            navigate('/');
          }
          else{
            setLoginCounter(loginCounter - 1);
            setLoginError(true);
            setEmail('');
            setPassword('');
          }
        }
        
        console.log(response)})

    }
    catch (error) {
      console.error('An error occurred during login:', error);
    }
  };
    
    return (
        <div className="home">
            <SiteModeButton/>
            <section className="welcome section-background-dark text-color-white">
            <h2 className="center-text format-title-dark">Login</h2>
              <div className="contribution-stats-white block-middle-border-dark">
                <form className='form-dark' onSubmit={handleLogin}>
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
                      <label htmlFor='error' className="error">Incorrect email of wachtwoord. U heeft nog {loginCounter} pogingen.</label>
                      </div>
                  )}
                  <div>
                    <button type="submit" className="center-button button-white">
                      Login
                    </button>
                    <button type="button" className="center-button button-white">
                      Wachtwoord vergeten
                    </button>
                  </div>
                </form>
              </div>
             
        </section>
      </div>
    );
}
    

export default Login_Dark;