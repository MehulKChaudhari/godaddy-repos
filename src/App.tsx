import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { RepositoryDetails } from './pages/RepositoryDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/repository/:id" element={<RepositoryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
