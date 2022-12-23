import React from "react";
import Main from './Main/Main.js'
import Navbar from "./Navbar/Navbar.js";
import Footer from "./Footer/Footer.js";
import './App.css'

export default function App() {
  return (
    <div className='app'>
      <Navbar />
      <Main />
    </div> 
  );
}