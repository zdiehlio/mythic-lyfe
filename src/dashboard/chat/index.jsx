import React, { useState, useEffect } from 'react'

import { addMessage, teamsRef } from '../../db/firebase'

import './index.css'

const Chat = ({ currentQuest, currentTeam }) => {
	const [messageState, setMessageState] = useState('')
	const [messageListState, setMessageListState] = useState([])

	useEffect(() => {
		const getMessages = async () => {
			if (currentQuest) {
				teamsRef
					.doc(currentTeam.name)
					.collection('messages')
					.doc(currentQuest.id)
					.onSnapshot(
						doc => doc.data() && setMessageListState(Object.values(doc.data()))
					)
			}
		}
		getMessages()
	}, [currentQuest])

	const handleMessage = async event => {
		event.preventDefault()
		await addMessage(
			currentTeam,
			currentQuest,
			messageState,
			currentTeam.user.displayName
		)
		setMessageState('')
	}

	return (
		<div className='chat'>
			{messageListState &&
				messageListState.map(message => (
					<div>
						<span>{message.time}</span>
						<span>{message.user}</span>
						{message.message}
					</div>
        ))}
      {currentQuest &&
        <form onSubmit={handleMessage}>
          <input
            onChange={event => setMessageState(event.target.value)}
            value={messageState}
            placeholder='Enter Chat'
          />
          <button type='submit'>Send</button>
        </form>
      }
		</div>
	)
}

export default Chat
