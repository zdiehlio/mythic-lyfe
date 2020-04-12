import React from 'react'

import SignIn from '../authentication/Signin'

const MainMenu = ({ currentUser }) => {
  return (
    <div>
      {currentUser ?
        <div>Main Menu</div> :
        <SignIn />
      }
    </div>
  )
}

export default MainMenu