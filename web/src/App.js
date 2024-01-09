import NavBar from './Navbar';
import Home_ED from './Home_ED';
import Login from './Login';
import Home_ALG from './Home_ALG';
import Home_ALG_dark from './Home_ALG_dark';
import Home_ORG from './Home_ORG';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onderzoeken from './Onderzoeken';
import Onderzoek from './Onderzoek';
import ApiTest from './ApiTest';
import Organisaties from './Organisaties';
import DeskundigeEdit from './DeskundigeEdit';
import Register from './Register';


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
            <Route path="/home_Dark" element={<Home_ALG_dark />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/home_ED" element={<Home_ED />} />
            <Route path="/home_ORG" element={<Home_ORG />} />
            <Route path="/onderzoeken" element={<Onderzoeken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onderzoeken" element={<Onderzoeken />} />
            <Route path="/onderzoek/:id" element={<Onderzoek />} /> 
            <Route path="/Organisaties" element={<Organisaties />}/>
            <Route path="/apitest" element={<ApiTest />}/>
            <Route path="/deskundigeedit" element={<DeskundigeEdit />}/>
        </Routes>         
        </main>
        <Footer />
      </div>
      </Router>
  );
}

export default App;
