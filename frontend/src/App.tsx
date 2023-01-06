
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AutoTrading } from './pages/AutoTrading.page';
import { Login } from './pages/Login.page';
import { SignUp} from './pages/SignUp.page';
import { CobokNavbar } from './components/CobokNavbar.component'
function App() {
  return (
    <div className="App background-gradient" style={{ backgroundColor: 'black', height: '100vh' }}>

      <div>
        <CobokNavbar />
      </div>
      <Routes>
        <Route path="/AutoTrading" element={<AutoTrading />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </div>
  );
}



export default App;
