import NavBar from './Navbar';
import Home_ED from './Home_ED';
import Login from './Login';
import Home_ALG from './Home_ALG';
import Home_ALG_dark from './Home_ALG_dark';
import Home_ED_Dark from './Home_ED_dark';
import Home_ORG_Dark from './Home_ORG_dark';
import Home_ORG from './Home_ORG';
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onderzoeken from './Onderzoeken';
import Onderzoek from './Onderzoek';
import ApiTest from './ApiTest';
import DeskundigeEdit from './DeskundigeEdit';
import Instellingen from './Instellingen';
import Register from './Register';
import Deelnames from './Deelnames';
import OnderzoekPost from './PostOnderzoek';
import { AuthProvider } from './globals/auth';


function App() {
  return (
    <AuthProvider>
    <Router>
    <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <main>
        <Routes>
            <Route path="/" element={<Home_ALG />} />
            <Route path="/home_Dark" element={<Home_ALG_dark />} />
            <Route path="/home_ED_Dark" element={<Home_ED_Dark />} />
            <Route path="/home_ORG_Dark" element={<Home_ORG_Dark />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/home_ED" element={<Home_ED />} />
            <Route path="/home_ORG" element={<Home_ORG />} />
            <Route path="/onderzoeken" element={<Onderzoeken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onderzoeken" element={<Onderzoeken />} />
            <Route path="/onderzoek/:id" element={<Onderzoek />} /> 
            <Route path="/instellingen" element={<Instellingen />} />
            <Route path="/apitest" element={<ApiTest />}/>
            <Route path="/deskundigeedit" element={<DeskundigeEdit />}/>
            <Route path="/deelnames" element={<Deelnames />}/>
            <Route path="/postonderzoek" element={<OnderzoekPost />}/>
        </Routes>         
        </main>
        <Footer />
      </div>
      </Router>
      </AuthProvider>
  );
}

export default App;
