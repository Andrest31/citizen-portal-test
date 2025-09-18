import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { mockCitizens } from './data/citizens';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import './App.css'; // Добавим позже

console.log('Mock data loaded:', mockCitizens.length); // Чек

function App() {
  return (
    <Router>
      <div className="app" style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <nav style={{ width: '250px', background: '#1976d2', color: 'white', padding: '20px' }}>
          <h2>Портал учета граждан</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link></li>
            <li><Link to="/catalog" style={{ color: 'white', textDecoration: 'none' }}>Картотека</Link></li>
          </ul>
        </nav>
        {/* Main */}
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard citizens={mockCitizens} />} />
            <Route path="/catalog" element={<Catalog citizens={mockCitizens} />} />
            <Route path="/" element={<Link to="/dashboard">Перейти на Dashboard</Link>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;