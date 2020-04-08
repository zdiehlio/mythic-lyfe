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
      if(currentUser) {
        navigate('/')
      } else if(firebase.auth(app).isSignInWithEmailLink(window.location.href)) {
        const email = localStorage.getItem('userEmail')
        if(!email) email = window.prompt('Please provide you email for verification')
        await firebase.auth().signInWithEmailLink(email, window.location.href)
        navigate('/')
      } else {
        navigate('/signin')
      }
    }
    checkAuth()
  })
  return (
    <Router className="App">
      <Dashboard path='/' />
      <SignIn path='/signin' />
    </Router>
  );
}

export default App;
