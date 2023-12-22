import './Navbar.css';
const NavBar = () => {
    return (
          <nav className="navbar">

            <div className="navbar-content">
              <h1 className="title">Accessibility</h1>
              <div className="navbar-right">
                  <a href="/">Home</a>
                  <a href="./Home_ALG_2">Home_2</a>
                  <a href="/account">Mijn account</a>
                  <a href="./Onderzoeken">Onderzoeken</a>
                  <a href="/settings">Instellingen</a>
                  <a href="/logout">Uitloggen</a>
                  <a href="/Organisaties">Organisaties</a>
                  <a href="./Login">Inloggen</a>
              </div>

            </div>
          </nav>
    );
}

export default NavBar;