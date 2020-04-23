import React, { useEffect, useState } from 'react'
import { useParams } from '@reach/router'

import Console from './console';
import Interface from './interface';
import Chat from './chat';

import { getTeam, getAllQuests } from '../db/firebase'

import './index.css'

const Dashboard = ({ currentUser }) => {

  const [ currentTeamState, setCurrentTeamState ] = useState({ name: '', user: {} })
  const [ questListState, setQuestListState] = useState([])
  const [ currentQuestState, setCurrentQuestState ] = useState({ name: '', description: '', experience: '', reward: ''})

  const params = useParams()

  useEffect(() => {
    const teamResults = async () => {
      if(currentUser) {
        const team = await getTeam(params.team, currentUser.email)
        setCurrentTeamState(team)

      }
    }
    const questResults = async () => {
      const quests = await getAllQuests(params.team)
      setQuestListState(quests)
    }
    teamResults()
    questResults()
  }, [currentUser])

  const updateQuestList = quest => {
    setQuestListState(questListState.concat(quest))
  }

  const handleQuest = quest => {
    setCurrentQuestState(quest)
  }

  return(
    <div className='dashboard'>
      <Console currentTeam={currentTeamState} />
      <Interface currentTeam={currentTeamState} questList={questListState} updateQuestList={updateQuestList} currentQuest={currentQuestState} handleQuest={handleQuest} />
      <Chat currentQuest={currentQuestState} currentTeam={currentTeamState} />
    </div>
  )
}

export default Dashboard