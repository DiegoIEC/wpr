const NavBar = () => {
    return (
          <nav className="navbar">
            <div className="navbar-content">
              <h1>Accessibility</h1>
              <div className="links">
                  <a href="/">Home</a>
                  <a href="/account">Mijn account</a>
                  <a href="/research">Onderzoeken</a>
                  <a href="/settings">Instellingen</a>
                  <a href="/logout">Uitloggen</a>
              </div>
            </div>
          </nav>
    );
}

export default NavBar;