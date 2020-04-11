import React, { useEffect, useState } from 'react';
import { Router, navigate } from '@reach/router'
import firebase from 'firebase'

// Components
import SignIn from './authentication/Signin'
import Dashboard from './dashboard'

// Modules
import { app } from './db/firebase'
import { authState } from './authentication/authService'

import './App.css';

function App() {

  const [ currentUser, setCurrentUser ] = useState()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUser(user))
    const checkAuth = async () => {
      if(currentUser) {
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


  return (
    <Router className="app">
      <SignIn path='/' />
      <Dashboard path='/dashboard' />
    </Router>
  );
}

export default App;
