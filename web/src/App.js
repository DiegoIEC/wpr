import NavBar from './Navbar';
import Home from './Home';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
          <Home/>
        </main>
        <Footer />
      </div>
  );
}

export default App;
