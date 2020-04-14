import React, { useEffect, useState } from 'react'
import { useParams } from '@reach/router'

import Console from './console';
import Interface from './interface';
import Chat from './chat';

import { getTeam } from '../db/firebase'

import './index.css'

const Dashboard = () => {

  const [ currentTeam, setCurrentTeam ] = useState({ name: '', members: [] })
  const params = useParams()

  useEffect(() => {
    const teamResults = async () => {
      const team = await getTeam(params.team)
      console.log('team', team)
      setCurrentTeam(team)
    }
    teamResults()
  }, [])

  return(
    <div className='dashboard'>
      <Console currentTeam={currentTeam} />
      <Interface />
      <Chat />
    </div>
  )
}

export default Dashboard