import React, { useState, useEffect } from 'react'
import { Link } from '@reach/router'

import { addTeam, getAllTeams } from '../db/firebase'

const Teams = ({ currentUser }) => {

  const [ teamsState, setTeamsState ] = useState([])
  const [ newTeamNameState, setNewTeamNameState ] = useState('')
  const [ newTeamMemberState, setNewTeamMemberState ] = useState('')
  const [ allTeamMembersState, setAllTeamMembersState ] = useState([])

  useEffect(() => {
    const fetchTeams = async () => {
      const teams = await getAllTeams(currentUser.email)
      setTeamsState(teams)
    }
    fetchTeams()
  }, [currentUser.email])

  const handleNewTeamMember = event => {
    event.preventDefault()
    const teamMembers = allTeamMembersState.concat(newTeamMemberState)
    setAllTeamMembersState(teamMembers)
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newTeam = { name: newTeamNameState, members: allTeamMembersState.concat(currentUser.email) }
    const teamAdded = addTeam(newTeam)
    teamAdded && setTeamsState(teamsState.concat(newTeam))
  }

  return (
    <div>
      <ul>
        {teamsState.length ?
          teamsState.map(team => {
            return (
              <li>
                <Link to={`/dashboard/${team.name}`} key={team.name}>
                  {team.name}
                </Link>
              </li>
            )
          }) :
          <p>No Teams</p>
        }
      </ul>
      <form onSubmit={handleSubmit}>
      <input placeholder='Team Name' onChange={event => setNewTeamNameState(event.target.value)}></input>
      <input placeholder='Add Member' onChange={event => setNewTeamMemberState(event.target.value)}></input>
      <button onClick={handleNewTeamMember}>Add Member</button>
      {allTeamMembersState.length && 
        <ul>
          {allTeamMembersState.map(member => <li key={member}>{member}</li>)}
        </ul>
      }
      <button type='submit'>Add Team</button>
      </form>
    </div>
  )
}

export default Teams