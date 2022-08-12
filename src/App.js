// import Navbar from './Components/Navbar';
// import React, { useState } from "react";

import './App.css';
import AddNote from "./Components/AddNote";
import Notes from "./Components/Notes";
// import { Link } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './Components/About';
import NoteState from './context/Notes/NoteState';
import  Alert  from './Components/Alert';



function App() {
  

  return (

    <NoteState>
    <Router>
      <Navbar />
      <Alert />

      <div className="container">
      <div className="container flex my-3">
        <div className="row justify-content-between">
      <Routes>
      
          

      
          
        <Route exact path="*" element={<Notes />} />
        <Route exact path="/addnote" element={<AddNote heading='Add a note' />} />
        <Route exact path="/editnote" element={<AddNote heading='Edit note'/>} /> 
        

        
        <Route exact path="/about" element={< About/>} />
        <Route exact path="/login" element={< Login/>} />
        <Route exact path="/createuser" element={< Signup/>} />
          
      </Routes>
      </div>
      </div>
      </div>
    </Router>
    </NoteState>

  );
}

export default App;
