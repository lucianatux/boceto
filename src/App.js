import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from './components/Layout/Header';
import {Menu} from './components/Layout/Menu';
import { Home } from './components/Layout/Home';
import {Sidebar} from './components/Layout/Sidebar';
import { Login } from './components/Auth/Login';
import { ArticleForm } from './components/Articles/ArticleForm';
import {Footer } from './components/Layout/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
//import { AuthContext } from "./context/AuthContext";



function App() {

  const currentUser = false;

  const RequireAuth = ({children}) => {
    return currentUser ? (children):<Navigate to="/login"/>
  }

  return (
      <div className="App">
        <Header />
        <Menu />
        <Home />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/articleform"
        index
                element={
                  <RequireAuth>
                    <ArticleForm />
                  </RequireAuth>
                } />
        </Routes>
        <Sidebar />
        <Footer />
      </div>
  );
}

export default App;
