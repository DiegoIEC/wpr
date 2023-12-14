import './Navbar.css';
const NavBar = () => {
    return (
          <nav className="navbar">
            <div className="navbar-content">
              <h1 className="title">Accessibility</h1>
              <div className="navbar-right">
                  <a href="/">Home</a>
                  <a href="/account">Mijn account</a>
                  <a href="./Onderzoeken.js">Onderzoeken</a>
                  <a href="/settings">Instellingen</a>
                  <a href="/logout">Uitloggen</a>
              </div>
            </div>
          </nav>
    );
}

export default NavBar;