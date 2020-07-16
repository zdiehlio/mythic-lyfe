import React from 'react'

const Quest = ({
	handleQuest,
	currentQuest,
	toggleQuest,
	completeQuest,
	approveQuest
}) => {
	const renderQuestButton = () => {
		if (currentQuest.status === 'available')
			return (
				<button onClick={() => handleQuest(currentQuest)}>Accept Quest</button>
			)
		if (currentQuest.status === 'active')
			return (
				<button onClick={() => completeQuest(currentQuest)}>
					Complete Quest
				</button>
			)
		if (currentQuest.status === 'pending')
			return (
				<button onClick={() => approveQuest(currentQuest)}>
					Approve Quest
				</button>
			)
	}
	return (
		<>
			<button onClick={() => toggleQuest(undefined)}>X</button>
			<p>{currentQuest.name}</p>
			<p>{currentQuest.description}</p>
			<p>{currentQuest.experience}</p>
			<p>{currentQuest.reward}</p>
			{renderQuestButton()}
		</>
	)
}

export default Quest
