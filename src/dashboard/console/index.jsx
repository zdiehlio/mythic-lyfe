import React from 'react'

import SignOut from '../../authentication/SignOut'

import './index.css'

const Console = ({ currentTeam }) => {
  return(
    <div className='console'>
      Console
      {currentTeam.name}
      {currentTeam.members.map(member => <div>{member}</div>)}
      <SignOut />
    </div>
  )
}

export default Console