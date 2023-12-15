import NavBar from './Navbar';
import Home_ED from './Home_ED';
import Home_ALG from './Home_ALG';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onderzoeken from './Onderzoeken';
import Onderzoek from './Onderzoek';

function App() {
  return (
    <Router>
    <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
        <Routes>
          <Route path="/" element={<Home_ALG />}></Route>
        </Routes>
        <Routes>
          <Route path="/onderzoeken" element={<Onderzoeken />}></Route>
        </Routes>
        <Routes>
          <Route path="/onderzoek" element={<Onderzoek />}></Route>
        </Routes>
          
        </main>
        <Footer />
      </div>
      </Router>
  );
}

export default App;
