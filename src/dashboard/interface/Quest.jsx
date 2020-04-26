import React from 'react'

const Quest = ({ handleQuest, currentQuest, toggleQuest }) => {
  return (
    <>
      <button onClick={() => toggleQuest(undefined)}>X</button>
      <p>{currentQuest.name}</p>
      <p>{currentQuest.description}</p>
      <p>{currentQuest.experience}</p>
      <p>{currentQuest.reward}</p>
      <button onClick={() => handleQuest(currentQuest)} >Accept Quest</button>
    </>
  )
}

export default Quest