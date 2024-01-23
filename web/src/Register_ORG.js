import './Home.css';
import SiteModeButton from './SiteModeButton';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';
import { useAuth } from './globals/auth';

const Register_ORG = () => {
    const navigate = useNavigate();
      
      return (
          <div className="home">
            <SiteModeButton/>
            <section className="contribution remove-margins section-background text-color-black">
              <h2 className="center-text format-title">Registreren</h2>
              <p className="center-text">Vul het onderstaande formulier in om uw organisatie aan te melden.</p>
              <div className="contribution-stats-black block-middle-border">
                <h2 className="center-text smaller-text title-black">Registratieformulier</h2>
                <form className='form'>
                  <div className="input-group">
                    <label htmlFor="name">Naam organisatie</label>
                    <input type="text" id="name" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="text">Locatie hoofdvestiging</label>
                    <input type="text" id="location" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="text">Link naar website (optioneel)</label>
                    <input type="text" id="url" />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                  </div>
                  <button type="submit" className="center-button button-black">
                    Verstuur
                  </button>
              </form>
            </div>
          </section>
  
  
  
        </div>
      );
  }
      
  
  
  
  export default Register_ORG;