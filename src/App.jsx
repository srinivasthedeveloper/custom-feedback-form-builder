import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './screens/Dashboard';
import { Login } from './screens/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
