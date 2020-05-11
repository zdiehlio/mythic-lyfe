import React from 'react'

import './index.css'
import InterfaceHome from './InterfaceHome';
import Quest from './Quest';

const Interface = ({ handleQuest, questList, updateQuestList, currentTeam, toggleQuest, currentQuest, completeQuest, approveQuest }) => {
  return(
    <div className='interface'>
      {currentQuest ? 
        <Quest  handleQuest={handleQuest} currentQuest={currentQuest} toggleQuest={toggleQuest} completeQuest={completeQuest} approveQuest={approveQuest} /> :
        <InterfaceHome toggleQuest={toggleQuest} questList={questList} updateQuestList={updateQuestList} currentTeam={currentTeam} />
      }
    </div>
  )
}

export default Interface