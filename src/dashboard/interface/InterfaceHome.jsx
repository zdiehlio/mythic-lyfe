import React, { useState } from 'react'
import { Link } from '@reach/router'

import { addQuest } from '../../db/firebase';

const InterfaceHome = ({ currentTeam, updateQuestList, questList, toggleQuest}) => {

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
    const questResult = await addQuest(newQuest, currentTeam.name)
    if(questResult) updateQuestList(newQuest)
  }

  return(
    <>
      Interface
      {questList.map(quest => {
        return (
          <div key={quest.name}>
            <div onClick={() => toggleQuest(quest)} >{quest.name}</div>
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
    </>
  )
}

export default InterfaceHome