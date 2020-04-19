import React from 'react'

const Quest = ({ currentQuest }) => {
  return (
    <>
      <p>{currentQuest.name}</p>
      <p>{currentQuest.description}</p>
      <p>{currentQuest.experience}</p>
      <p>{currentQuest.reward}</p>
      <button >Accept Quest</button>
    </>
  )
}

export default Quest