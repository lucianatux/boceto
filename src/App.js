import React, { useContext } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from './components/Layout/Header';
import { Menu } from './components/Layout/Menu';
import { Home } from './components/Layout/Home';
import { Sidebar } from './components/Layout/Sidebar';
import { New } from './components/Layout/New.js';
import { Card } from './components/Layout/Card';
import { Login } from './components/Auth/Login';
import { ArticleForm } from './components/Articles/ArticleForm';
import { Footer } from './components/Layout/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from "./components/Auth/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/articleform" 
          element={
            <RequireAuth>
              <ArticleForm />
            </RequireAuth>
          } 
        />
      </Routes>
      <Card/>
      <New/>
      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;

