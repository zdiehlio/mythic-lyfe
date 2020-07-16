import React from 'react'

import SignIn from '../authentication/Signin'
import Teams from './Teams'

const MainMenu = ({ currentUser }) => {
	return (
		<div>{currentUser ? <Teams currentUser={currentUser} /> : <SignIn />}</div>
	)
}

export default MainMenu
