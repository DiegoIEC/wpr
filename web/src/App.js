import NavBar from './Navbar';
import Home_ED from './Home_ED';
import Login from './Login';
import Home_ALG from './Home_ALG';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onderzoeken from './Onderzoeken';
import Onderzoek from './Onderzoek';
import ApiTest from './ApiTest';
import Organisaties from './Organisaties';


function App() {
  return (
    <Router>
    <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
        <Routes>
            <Route path="/" element={<Home_ALG />} />
            <Route path="/home_ED" element={<Home_ED />} />
            <Route path="/onderzoeken" element={<Onderzoeken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onderzoek" element={<Onderzoek />} />
            <Route path="/onderzoeken" element={<Onderzoeken />}/>
            <Route path="/Organisaties" element={<Organisaties />}/>
            <Route path="/apitest" element={<ApiTest />}/>
        </Routes>         
        </main>
        <Footer />
      </div>
      </Router>
  );
}

export default App;
