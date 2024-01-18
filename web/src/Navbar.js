import './Navbar.css';
const NavBar = () => {
    return (
          <nav className="navbar">
            <div className="navbar-content">
              <h1 className="title-nav">Accessibility</h1>
              <div className="navbar-right">
                  <a href="/">Home</a>
                  <a href="./Deelnames">Mijn Onderzoeken</a>
                  <a href="/home_ED">Home ED</a>              
                  <a href="/home_ORG">Home ORG</a>
                  <a href="./Onderzoeken">Onderzoeken</a>
                  <a href="/Instellingen">Instellingen</a>
                  <a href="/logout">Uitloggen</a>
                  <a href="/Register">Registreer</a>
                  <a href="./Login">Inloggen</a>
                  <a href="./Profiel">Profiel</a>
              </div>
            </div>
          </nav>
    );
}

export default NavBar;