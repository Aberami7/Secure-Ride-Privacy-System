import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ActiveRides from './pages/ActiveRides';
import History from './pages/History';
import Payments from './pages/Payments';
import Safety from './pages/Safety';
import Chat from './pages/Chat';
import Support from './pages/Support';
import SignIn from './pages/Signin';
import Settings from './pages/settings'; // ✅ New Import
import Profile from './pages/Profile';   // ✅ New Import

const globalStyles = `
  * { 
    box-sizing: border-box !important; 
    margin: 0; 
    padding: 0; 
  }
  body { 
    overflow: hidden !important; 
    background: #050505; 
    font-family: 'Inter', sans-serif;
    color: white;
  }
  ::-webkit-scrollbar { 
    display: none; 
  }
`;

function App() {
  return (
    <Router>
      <style>{globalStyles}</style>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/active-rides" element={<ActiveRides />} />
        <Route path="/history" element={<History />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;