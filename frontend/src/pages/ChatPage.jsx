import React from 'react'

import { useAuthStore } from '../store/useAuthStore'

function ChatPage() {
  const {login} = useAuthStore();
  return (
    <div>ChatPage
      <button onClick={login} className='text-white'>click</button>
    </div>
  )
}

export default ChatPage