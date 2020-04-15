import React, { useEffect, useState } from 'react'
import { useParams } from '@reach/router'

import Console from './console';
import Interface from './interface';
import Chat from './chat';

import { getTeam, getAllQuests } from '../db/firebase'

import './index.css'

const Dashboard = () => {

  const [ currentTeamState, setCurrentTeamState ] = useState({ name: '', members: [] })
  const [ questListState, setQuestListState] = useState([])
  const params = useParams()

  useEffect(() => {
    const teamResults = async () => {
      const team = await getTeam(params.team)
      setCurrentTeamState(team)
    }
    const questResults = async () => {
      const quests = await getAllQuests(params.team)
      setQuestListState(quests)
    }
    teamResults()
    questResults()
  }, [])

  const updateQuestList = quest => {
    setQuestListState(questListState.concat(quest))
  }

  return(
    <div className='dashboard'>
      <Console currentTeam={currentTeamState} />
      <Interface currentTeam={currentTeamState} questList={questListState} updateQuestList={updateQuestList} />
      <Chat />
    </div>
  )
}

export default Dashboard