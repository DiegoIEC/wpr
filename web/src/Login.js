import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
//import LoginModel from '../../webapi/Models/LoginModel.cs'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginCounter, setLoginCounter] = useState(4);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get('http://localhost:8088/api/user', {
        params:{
          email: email
        }
      })
      .then(response => {
        var data = response.data;
        console.log(response)})
    }
    catch (error) {
      console.error('An error occurred during login:', error);
    }
      /*
      const response = await fetch('http://localhost:8088/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response)
      

      if (response.ok) {
        // Login successful, navigate to the desired page
        console.log(response);
        navigate('/home_ED');
      } else {
        // Login failed, handle the error
        const errorMessage = await response.text();
        console.error(errorMessage);

        if (loginCounter === 1) {
          navigate('/');
        } else {
          setLoginCounter(loginCounter - 1);
          setLoginError(true);
          setEmail('');
          setPassword('');
        }
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
    */
  };
    
    return (
        <div className="home">
            <section className="welcome section-background text-color-black">
            <h2 className="center-text format-title">Login</h2>
            </section>
            <section className="welcome section-background text-color-black">
              <div className="contribution-stats-black block-middle-border">
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="center-button button-black">
                      Login
                    </button>
                    <button type="button" className="center-button button-black">
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