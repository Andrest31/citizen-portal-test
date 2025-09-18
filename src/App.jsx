import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { mockCitizens } from './data/citizens';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import CitizenCard from './pages/CitizenCard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <h2>Портал учета граждан</h2>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/catalog">Картотека</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard citizens={mockCitizens} />} />
            <Route path="/catalog" element={<Catalog citizens={mockCitizens} />} />
            <Route path="/catalog/:id" element={<CitizenCard citizens={mockCitizens} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;