import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from './components/Layout/Header';
import {Menu} from './components/Layout/Menu';
import { Home } from './components/Layout/Home';
import {Sidebar} from './components/Layout/Sidebar';
import { Login } from './components/Auth/Login';
import {Footer } from './components/Layout/Footer';



function App() {
  return (
      <div className="App">
        <Header />
        <Menu />
        <Home />
        <Sidebar />
        <Login />
        <Footer />
      </div>
  );
}

export default App;
