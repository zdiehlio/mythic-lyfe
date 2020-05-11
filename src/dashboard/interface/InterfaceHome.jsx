import React, { useState } from 'react'
import { Link } from '@reach/router'

import { addQuest } from '../../db/firebase'

const InterfaceHome = ({
	currentTeam,
	updateQuestList,
	questList,
	toggleQuest
}) => {
	const [questNameState, setQuestNameState] = useState('')
	const [questDescriptionState, setQuestDescriptionState] = useState('')
	const [questExperienceState, setQuestExperienceState] = useState('')
	const [questRewardState, setQuestRewardState] = useState('')

	const handleSubmit = async event => {
		event.preventDefault()
		const newQuest = {
			id: questNameState,
			name: questNameState,
			description: questDescriptionState,
			experience: parseInt(questExperienceState),
			reward: parseInt(questRewardState),
			status: 'available'
		}
		await addQuest(newQuest, currentTeam)
		updateQuestList(newQuest)
	}

	return (
		<>
			Interface
			{questList.map((quest, index) => {
				return (
					<div key={quest.name}>
						<div onClick={() => toggleQuest({ index, ...quest })}>
							{quest.name}
						</div>
					</div>
				)
			})}
			<form onSubmit={handleSubmit}>
				<input
					placeholder='Name'
					onChange={event => setQuestNameState(event.target.value)}
				/>
				<input
					placeholder='Description'
					onChange={event => setQuestDescriptionState(event.target.value)}
				/>
				<input
					placeholder='Experience'
					type='number'
					onChange={event => setQuestExperienceState(event.target.value)}
				/>
				<input
					placeholder='Reward'
					type='number'
					onChange={event => setQuestRewardState(event.target.value)}
				/>
				<button type='submit'>Add Quest</button>
			</form>
		</>
	)
}

export default InterfaceHome
