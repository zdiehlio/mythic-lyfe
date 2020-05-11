import React, { useState, useEffect } from 'react'

import SignOut from '../../authentication/SignOut'

import { updateProfile, updateAvatar } from '../../db/firebase'

import './index.css'

const Console = ({ currentTeam, userQuests, toggleQuest }) => {

  const [ userProfileState, setUserProfileState ] = useState({ displayName: '', id: '' })
  const [ editProfileState, setEditProfileState ] = useState(false)
  const [ displayNameState, setDisplayNameState ] = useState('')
  const [ activeQuestsState, setActiveQuestState ] = useState([])
  const [ pendingQuestsState, setPendingQuestsState ] = useState([])
  const [ completedQuestsState, setCompletedQuestsState ] = useState([])

  useEffect(() => {
    setUserProfileState(currentTeam.user)
    const active = []
    const pending = []
    const completed = []
    userQuests.map(quest => {
      if(quest.status === 'active') {
        active.push(quest)
      } else if(quest.status === 'pending') {
        pending.push(quest)
      } else if(quest.status === 'completed') {
        completed.push(quest)
      }
    })
    setActiveQuestState(active)
    setPendingQuestsState(pending)
    setCompletedQuestsState(completed)
  }, [currentTeam.user, userQuests])

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
      <h4>Active Quests</h4>
      {activeQuestsState.map((quest, index) => {
        return (
          <div onClick={() => toggleQuest({ index, ...quest })} key={quest.id}>{quest.name}</div>
        )
      })}
      <h4>Pending Quests</h4>
      {pendingQuestsState.map((quest, index) => {
        return (
          <div onClick={() => toggleQuest({ index, ...quest })} key={quest.id}>{quest.name}</div>
        )
      })}
      <h4>Completed Quests</h4>
      {completedQuestsState.map((quest, index) => {
        return (
          <div onClick={() => toggleQuest({ index, ...quest })} key={quest.id}>{quest.name}</div>
        )
      })}

    </div>
  )
}

export default Console