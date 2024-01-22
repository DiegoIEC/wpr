import './Navbar.css';
import { useAuth } from './globals/auth';
import { useNavigate } from 'react-router-dom';

const NavBarLO = () => {
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
                  <a href="/">Home</a>
                  <a href="./Onderzoeken">Onderzoeken</a>
                  <a href="/Login">Inloggen</a>
                  <a href="/Register">Registreer</a>
              </div>
            </div>
          </nav>
    );
}

export default NavBarLO;