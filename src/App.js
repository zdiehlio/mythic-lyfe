import React, { useEffect } from 'react';
import { Router, navigate } from '@reach/router'
import firebase from 'firebase'

// Components
import SignIn from './authentication/Signin'
import Dashboard from './dashboard'

// Modules
import { app } from './db/firebase'
import { currentUser } from './authentication/authService'

import './App.css';

function App() {

  useEffect(() => {
    const checkAuth = async () => {
      if(currentUser()) {
        navigate('/dashboard')
      } else if(firebase.auth(app).isSignInWithEmailLink(window.location.href)) {
        const email = localStorage.getItem('userEmail')
        if(!email) email = window.prompt('Please provide you email for verification')
        await firebase.auth().signInWithEmailLink(email, window.location.href)
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    }
    checkAuth()
  })

  console.log(currentUser())

  return (
    <Router className="app">
      <SignIn path='/' />
      {currentUser && <Dashboard path='/dashboard' />}
    </Router>
  );
}

export default App;
