import React, { useState, useEffect } from 'react'

import { addMessage } from '../../db/firebase'

import './index.css'

const Chat = ({ currentQuest, currentTeam }) => {

  const [ messageState, setMessageState ] = useState('')
  const [ messageListState, setMessageListState ] = useState([])

  useEffect(() => {
    if(currentQuest) {
      setMessageListState(currentQuest.messages)
    } else {
      setMessageListState([])
    }
  }, [currentQuest])

  const handleMessage = async event => {
    event.preventDefault()
    const newMessage = await addMessage(currentTeam, currentQuest, messageState, currentTeam.user.displayName)
    if(newMessage.success) {
      const updatedMessages = messageListState.concat({ message: messageState, user: currentTeam.user.displayName, time: 233 })
      setMessageListState(updatedMessages)
      setMessageState('')
    }
  }

  return(
    <div className='chat'>
      {messageListState && 
        messageListState.map(message => (
          <div>
            <span>{message.time}</span>
            <span>{message.user}</span>
            {message.message}
          </div>
        ))
      }
      <form onSubmit={handleMessage}>
        <input onChange={event => setMessageState(event.target.value)} value={messageState} placeholder='Enter Chat'/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Chat