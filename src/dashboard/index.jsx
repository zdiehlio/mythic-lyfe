import React, { useEffect, useState } from 'react'
import { useParams } from '@reach/router'

import Console from './console'
import Interface from './interface'
import Chat from './chat'

import {
	teamsRef,
	getTeam,
	getAllQuests,
	acceptQuest,
	finishQuest,
	archiveQuest
} from '../db/firebase'

import './index.css'

const Dashboard = ({ currentUser }) => {
	const [currentTeamState, setCurrentTeamState] = useState({
		name: '',
		user: {}
	})
	const [questListState, setQuestListState] = useState([])
	const [userQuestsState, setUsersQuestState] = useState([])
	const [currentQuestState, setCurrentQuestState] = useState()

	const params = useParams()

	useEffect(() => {
		const teamResults = async () => {
			if (currentUser) {
				const team = await getTeam(params.team, currentUser.email)
				setCurrentTeamState(team)
				const [quests, userQuests] = await getAllQuests(team)
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
		const filteredQuests = questListState.filter(
			questState => questState.name !== quest.name
		)
		setQuestListState(filteredQuests)
		toggleQuest()
		const updatedUserQuests = userQuestsState.concat(quest)
		setUsersQuestState(updatedUserQuests)
	}

	const completeQuest = quest => {
		finishQuest(quest, currentTeamState)
		const usersQuestsCopy = userQuestsState
		usersQuestsCopy[quest.index].status = 'pending'
		setUsersQuestState(usersQuestsCopy)
		toggleQuest()
	}

	const approveQuest = quest => {
		archiveQuest(quest, currentTeamState)
		const filteredQuests = userQuestsState.filter(
			q => q.name !== currentQuestState.name
		)
		setUsersQuestState(filteredQuests)
		toggleQuest()
	}

	return (
		<div className='dashboard'>
			<Console
				currentTeam={currentTeamState}
				userQuests={userQuestsState}
				toggleQuest={toggleQuest}
			/>
			<Interface
				handleQuest={handleQuest}
				currentTeam={currentTeamState}
				questList={questListState}
				updateQuestList={updateQuestList}
				currentQuest={currentQuestState}
				toggleQuest={toggleQuest}
				completeQuest={completeQuest}
				approveQuest={approveQuest}
			/>
			<Chat currentQuest={currentQuestState} currentTeam={currentTeamState} />
		</div>
	)
}

export default Dashboard
