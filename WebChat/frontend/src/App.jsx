import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginApp from "../src/pages/login";
import RegisterApp from "../src/pages/RegisterApp";
import ChatPage from "../src/pages/ChatPage";

function ResetCacheAndRedirect() {
  useEffect(() => {
    if (sessionStorage.getItem("reloaded")) return;

    localStorage.clear();
    sessionStorage.clear();
    caches.keys().then((names) => names.forEach((name) => caches.delete(name)));

    sessionStorage.setItem("reloaded", "true");

    window.location.replace("/");
  }, []);

  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <ResetCacheAndRedirect />
      <Routes>
        <Route 
          path="/" 
          element={!isAuthenticated ? <LoginApp onLogin={handleLogin} /> : <Navigate to="/chat" />}
        />
        <Route 
          path="/register" 
          element={!isAuthenticated ? <RegisterApp onRegister={handleRegister} /> : <Navigate to="/chat" />} 
        />
        <Route 
          path="/chat" 
          element={isAuthenticated ? <ChatPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
