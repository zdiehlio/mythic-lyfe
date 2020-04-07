import React, { useState } from 'react'

import { signInWithLink } from './authService'

const SignIn = () => {

  const [ emailState, setEmailState ] = useState(localStorage.getItem('userEmail'))
  const [ emailSentState, setEmailSentState ] = useState(false)

  const handleSignIn = () => {
    const actionCodSettings = {
      url: 'http://localhost:3000/',
      handleCodeInApp: true
    }
    signInWithLink(emailState, actionCodSettings)
    setEmailSentState(true)
    console.log('handleSignIn', emailState)
  }
  return (
    <div>
      <input onChange={event => setEmailState(event.target.value)}placeholder='email' value={emailState} />
      <button onClick={handleSignIn}>Send Magic Link</button>
      {emailSentState && <div>Email Sent</div>}
    </div>
  )
}

export default SignIn