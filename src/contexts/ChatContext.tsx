import { createContext, useState } from 'react'

import { Children } from '@@types/Children'
import { sb } from '@src/config/sendbird'

import {
  ApplicationUserListQueryParams,
  User,
  UserUpdateParams,
} from '@sendbird/chat'
import {
  GroupChannel,
  GroupChannelCreateParams,
} from '@sendbird/chat/groupChannel'

type ChatDataProps = {
  userCred: User
  usersInChat: User[]
  connectUserInChat: (userId: string) => Promise<void>
  updateUserProfile: (nickname: string, profileImage: string) => Promise<void>
  disconnectUser: () => void
  createOneToOneChannel: (
    userId: string,
    friendId: string,
  ) => Promise<GroupChannel>
}

export const ChatContext = createContext({} as ChatDataProps)

export const ChatContextProvider = ({ children }: Children) => {
  const [userCred, setUserCred] = useState({} as User)
  const [usersInChat, setUsersInChat] = useState<User[]>([])

  async function createOneToOneChannel(
    userId: string,
    friendId: string,
  ): Promise<GroupChannel> {
    const params: GroupChannelCreateParams = {
      invitedUserIds: [userId, friendId],
      isDistinct: true,
    }

    return sb.groupChannel.createChannel(params)
  }

  async function getActiveUsers() {
    const queryParams: ApplicationUserListQueryParams = {
      limit: 20,
    }
    const query = sb.createApplicationUserListQuery(queryParams)

    return query.next()
  }

  async function connectUserInChat(userId: string) {
    try {
      await sb.connect(userId)
      const users = await getActiveUsers()
      setUsersInChat(users)
    } catch (err) {
      if (err) {
        console.error(`Sendbird connection error =>> ${err}`)
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

    const user = await sb.updateCurrentUserInfo(params)

    setUserCred(user)

    const users = await getActiveUsers()
    setUsersInChat(users)
  }

  return (
    <ChatContext.Provider
      value={{
        userCred,
        connectUserInChat,
        updateUserProfile,
        disconnectUser,
        usersInChat,
        createOneToOneChannel,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
