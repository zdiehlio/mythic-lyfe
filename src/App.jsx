import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router'
import firebase from 'firebase'

// Components
import Dashboard from './dashboard'

// Modules
import { app } from './db/firebase'

import './App.css';
import MainMenu from './mainMenu';

function App() {

  const [ currentUser, setCurrentUser ] = useState()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUser(user))
    const checkAuth = async () => {
      if(firebase.auth(app).isSignInWithEmailLink(window.location.href)) {
        const email = localStorage.getItem('userEmail')
        if(!email) email = window.prompt('Please provide you email for verification')
        await firebase.auth().signInWithEmailLink(email, window.location.href)
      }
    }
    checkAuth()
  })


  return (
    <Router className="app">
      <MainMenu currentUser={currentUser} path='/' />
      <Dashboard currentUser={currentUser} path='/dashboard' />
    </Router>
  );
}

export default App;
