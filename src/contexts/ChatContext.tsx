import { createContext, useState } from 'react'

import { Children } from '@@types/Children'
import { sb } from '@src/config/sendbird'

import { User } from '@sendbird/chat'

type ChatDataProps = {
  userCred: User
  connectUserInChat: (userId: string) => void
}

export const ChatContext = createContext({} as ChatDataProps)

export const ChatContextProvider = ({ children }: Children) => {
  const [userCred, setUserCred] = useState({} as User)

  async function connectUserInChat(userId: string) {
    try {
      const user = await sb.connect(userId)
      setUserCred(user)
    } catch (err) {
      if (err) {
        console.error(err)
      }
    }
  }

  return (
    <ChatContext.Provider value={{ userCred, connectUserInChat }}>
      {children}
    </ChatContext.Provider>
  )
}
