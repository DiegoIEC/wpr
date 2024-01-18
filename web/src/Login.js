import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import './Home.css'
import { useAuth } from './globals/auth';

const Login = () => {
  const { user, login_user, logout_user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginCounter, setLoginCounter] = useState(4);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const redirect = {url: ''};

  const ValidatePassword = (e) => {
    if (e.userId > 5){
      setIsPasswordValid(bcrypt.compareSync(password, e.password));
    }
    else{
      setIsPasswordValid(password === e.password);
    }
  }

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
      .then(response => {
        var data = response.data;
        if (response.status == 200){
          ValidatePassword(data);
          if (isPasswordValid){
            login_user(data);
            HandleRole(data);
            //navigate(redirect.url)
            console.log(user)
            logout_user();
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
                      <label htmlFor='error' className="error">Incorrect email of wachtwoord. U heeft nog {loginCounter} pogingen.</label>
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