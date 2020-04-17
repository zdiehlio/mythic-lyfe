import React from 'react'

import SignOut from '../../authentication/SignOut'

import './index.css'

const Console = ({ currentTeam }) => {
  return(
    <div className='console'>
      Console
      {currentTeam.name}
      {currentTeam.user.id}
      <SignOut />
    </div>
  )
}

export default Console