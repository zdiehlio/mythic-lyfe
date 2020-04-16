import React, { useState } from 'react'
import { Router } from '@reach/router'

import './index.css'
import InterfaceHome from './InterfaceHome';
import Quest from './Quest';

const Interface = ({ questList, updateQuestList, currentTeam }) => {

  const [ currentQuest, setCurrentQuest ] = useState({ name: '', description: '', experience: '', reward: ''})

  const handleQuest = quest => {
    setCurrentQuest(quest)
  }


  return(
    <div className='interface'>
      {/* <InterfaceHome handleQuest={handleQuest} questList={questList} updateQuestList={updateQuestList} currentTeam={currentTeam} />
      <Quest currentQuest={currentQuest} /> */}
      
      <Router>
      <InterfaceHome path='/' handleQuest={handleQuest} questList={questList} updateQuestList={updateQuestList} currentTeam={currentTeam} />
      <Quest path=':quest' currentQuest={currentQuest} />
      </Router>
    </div>
  )
}

export default Interface