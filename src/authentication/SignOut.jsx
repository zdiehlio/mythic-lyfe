import React from 'react'
import { navigate } from '@reach/router'

import { signOut } from './authService'

const SignOut = () => {

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return(
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default SignOut