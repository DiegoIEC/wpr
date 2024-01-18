import './Navbar.css';
import { useAuth } from './globals/auth';
import { useNavigate } from 'react-router-dom';

const NavBarED = () => {
  const { user, login_user, logout_user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout_user();
    navigate('/');
  };

    return (
          <nav className="navbar">
            <div className="navbar-content">
              <h1 className="title-nav">Accessibility</h1>
              <div className="navbar-right">
                  <a href="/home_ED">Home</a>
                  <a href="./Deelnames">Mijn Onderzoeken</a>
                  <a href="/Instellingen">Instellingen</a>
                  <button className="button-trans" onClick={handleLogout}>Uitloggen</button>
              </div>
            </div>
          </nav>
    );
}

export default NavBarED;