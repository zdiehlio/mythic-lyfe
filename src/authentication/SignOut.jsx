import React from 'react'

import { signOut } from './authService'

const SignOut = () => {

  return(
    <div>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

export default SignOut