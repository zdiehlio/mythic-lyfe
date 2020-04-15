import React, { useState } from 'react'
import { Link } from '@reach/router'

import './index.css'
import { addQuest } from '../../db/firebase';

const Interface = ({ questList, updateQuestList, currentTeam }) => {

  const [ questNameState, setQuestNameState ] = useState('')
  const [ questDescriptionState, setQuestDescriptionState ] = useState('')
  const [ questExperienceState, setQuestExperienceState ] = useState('')
  const [ questRewardState, setQuestRewardState ] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const newQuest = {
      name: questNameState,
      description: questDescriptionState,
      experience: questExperienceState,
      reward: questRewardState
    }
    const questResult = await addQuest(newQuest, currentTeam)
    if(questResult) updateQuestList(newQuest)
  }
  console.log('quests', questList)
  return(
    <div className='interface'>
      Interface
      {questList.map(quest => {
        return (
          <div>
            <Link to={`/dashboard/${currentTeam.name}/${quest.name}`}>{quest.name}</Link>
          </div>
        )
      })}
      <form onSubmit={handleSubmit}>
        <input placeholder='Name' onChange={event => setQuestNameState(event.target.value)}/>
        <input placeholder='Description' onChange={event => setQuestDescriptionState(event.target.value)} />
        <input placeholder='Experience' onChange={event => setQuestExperienceState(event.target.value)} />
        <input placeholder='Reward' onChange={event => setQuestRewardState(event.target.value)} />
        <button type='submit'>Add Quest</button>
      </form>
    </div>
  )
}

export default Interface