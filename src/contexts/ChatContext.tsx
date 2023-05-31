import { createContext, useState } from 'react'

import { Children } from '@@types/Children'
import { sb } from '@src/config/sendbird'

import { User, UserUpdateParams } from '@sendbird/chat'

type ChatDataProps = {
  userCred: User
  connectUserInChat: (userId: string) => Promise<void>
  updateUserProfile: (nickname: string, profileImage: string) => Promise<void>
  disconnectUser: () => void
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

  async function disconnectUser() {
    await sb.disconnect()
  }

  async function updateUserProfile(nickname: string, profileUrl: string) {
    const params: UserUpdateParams = {
      nickname,
      profileUrl,
    }

    await sb.updateCurrentUserInfo(params)
  }

  return (
    <ChatContext.Provider
      value={{ userCred, connectUserInChat, updateUserProfile, disconnectUser }}
    >
      {children}
    </ChatContext.Provider>
  )
}
