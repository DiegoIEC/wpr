import { Navigate } from 'react-router-dom';
import './Login.css';

function Loes() {
  return <Navigate to="/home_ED" />;
}

const Login = () => {
  const handleLogin = () => {
    Loes();
  };
    
    return (
        <div className="home">
            <section className="welcome section-background-blue text-color-green">
            <h2 className="center-text format-title">Login</h2>
              <div className="contribution-stats-green block-middle-border-blue">
                <form>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder='Voer hier uw email in'/>
                  </div>
                  <div className="input-group">
                    <label htmlFor="password">Wachtwoord</label>
                    <input type="password" id="password" placeholder='Voer hier uw wachtwoord in'/>
                  </div>
                  <div>
                    <button type="button" className="center-button button-blue" onClick={handleLogin}>
                      Login
                    </button>
                    <button type="submit" className="center-button button-blue">
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