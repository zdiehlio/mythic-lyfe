import React, { useEffect } from 'react';
import firebase from 'firebase'

// Components
import SignIn from './authentication/Signin';

// Modules
import { app } from './db/firebase'
import { currentUser } from './authentication/authService'

import './App.css';

function App() {

  useEffect(() => {
    const checkAuth = () => {
      if(firebase.auth(app).isSignInWithEmailLink(window.location.href)) {
        const email = localStorage.getItem('userEmail')
        if(!email) email = window.prompt('Please provide you email for verification')
        firebase.auth().signInWithEmailLink(email, window.location.href)
      }
    }
  })
  return (
    <div className="App">
      { currentUser ? <div>Signed In</div> : <SignIn /> }
    </div>
  );
}

export default App;
