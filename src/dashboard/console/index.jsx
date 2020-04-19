import React, { useState, useEffect } from 'react'

import SignOut from '../../authentication/SignOut'

import { updateProfile, updateAvatar } from '../../db/firebase'

import './index.css'

const Console = ({ currentTeam }) => {

  const [ userProfileState, setUserProfileState ] = useState({ displayName: '', id: '' })
  const [ editProfileState, setEditProfileState ] = useState(false)
  const [ displayNameState, setDisplayNameState ] = useState('')

  useEffect(() => {
    setUserProfileState(currentTeam.user)
  }, [currentTeam.user])

  const handleSubmit = async event => {
    event.preventDefault()
    const updatedProfile = { displayName: displayNameState }
    await updateProfile(currentTeam, updatedProfile)
    setEditProfileState(false)
    setUserProfileState(updatedProfile)
  }

  return(
    <div className='console'>
      Console
      {currentTeam.name}
      {userProfileState.displayName}
      <SignOut />
      <img className='avatar' src={currentTeam.user.avatar}/>
      <input type='file' onChange={event => updateAvatar(currentTeam, event.target.files[0])}/>
      {!editProfileState ?
        <button onClick={() => setEditProfileState(true)}>
          EditProfile
        </button> :
        <form onSubmit={handleSubmit}>
          <input placeholder='Display Name' onChange={event => setDisplayNameState(event.target.value)}/>
          <button onClick={() => setEditProfileState(false)}>Cancel</button>
          <button type='submit'>Save</button>
        </form>
      }

    </div>
  )
}

export default Console