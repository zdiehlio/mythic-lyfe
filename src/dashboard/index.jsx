import React, { useEffect, useState } from 'react'
import { useParams } from '@reach/router'

import Console from './console';
import Interface from './interface';
import Chat from './chat';

import { getTeam, getAllQuests, acceptQuest } from '../db/firebase'

import './index.css'

const Dashboard = ({ currentUser }) => {

  const [ currentTeamState, setCurrentTeamState ] = useState({ name: '', user: {} })
  const [ questListState, setQuestListState] = useState([])
  const [ userQuestsState, setUsersQuestState ] = useState([])
  const [ currentQuestState, setCurrentQuestState ] = useState()

  const params = useParams()

  useEffect(() => {
    const teamResults = async () => {
      if(currentUser) {
        const team = await getTeam(params.team, currentUser.email)
        setCurrentTeamState(team)
        const [ quests, userQuests ] = await getAllQuests(team)
        setQuestListState(quests)
        setUsersQuestState(userQuests)
      }
    }
    teamResults()
  }, [currentUser])

  const updateQuestList = quest => {
    setQuestListState(questListState.concat(quest))
  }

  const toggleQuest = quest => {
    setCurrentQuestState(quest)
  }

  const handleQuest = quest => {
    acceptQuest(quest, currentTeamState)
    const filteredQuests = questListState.filter(questState => questState.name !== quest.name)
    setQuestListState(filteredQuests)
    toggleQuest(undefined)
    const updatedUserQuests = userQuestsState.concat(quest)
    setUsersQuestState(updatedUserQuests)
  }

  return(
    <div className='dashboard'>
      <Console currentTeam={currentTeamState} userQuests={userQuestsState} />
      <Interface  handleQuest={handleQuest} currentTeam={currentTeamState} questList={questListState} updateQuestList={updateQuestList} currentQuest={currentQuestState} toggleQuest={toggleQuest} />
      <Chat currentQuest={currentQuestState} currentTeam={currentTeamState} />
    </div>
  )
}

export default Dashboard