import React from 'react'
import Console from './console';
import Interface from './interface';
import Chat from './chat';

import './index.css'

const Dashboard = () => {
  return(
    <div className='dashboard'>
      <Console />
      <Interface />
      <Chat />
    </div>
  )
}

export default Dashboard