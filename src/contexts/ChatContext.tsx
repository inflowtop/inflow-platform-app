import React, { createContext, useState } from 'react'

import { Children } from '@@types/Children'
import { api } from '@src/config/axios'
import { sb } from '@src/config/sendbird'

import {
  ApplicationUserListQueryParams,
  User,
  UserUpdateParams,
} from '@sendbird/chat'
import {
  GroupChannel,
  GroupChannelCreateParams,
  GroupChannelFilter,
  GroupChannelListOrder,
} from '@sendbird/chat/groupChannel'

type ProfessionalsInfo = {
  isProfessional: boolean
  professionalId: string
}

type ChatDataProps = {
  userCred: User
  usersList: User[]
  professionals: ProfessionalsInfo[]
  friendList: User[]
  setFriendList: (value: User[]) => void
  getFriendList: () => Promise<User[]>
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
  const [usersList, setUsersList] = useState<User[]>([])
  const [friendList, setFriendList] = useState<User[]>([])
  const [professionals, setProfessionals] = useState<ProfessionalsInfo[]>([])

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

  async function getProfessionals() {
    const { data } = await api.get<ProfessionalsInfo[]>(
      '/api/get-professionals',
    )
    return data
  }

  async function getListOfActiveChannels() {
    const groupChannelFilter = new GroupChannelFilter()

    const params = {
      filter: groupChannelFilter,
      order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
    }

    const collection = sb.groupChannel.createGroupChannelCollection(params)

    if (collection.hasMore) {
      return await collection.loadMore()
    }

    return []
  }

  async function getActiveUsers() {
    const queryParams: ApplicationUserListQueryParams = {
      limit: 20,
    }
    const query = sb.createApplicationUserListQuery(queryParams)
    return query.next()
  }

  async function getFriendList() {
    const activeChannels = await getListOfActiveChannels()

    if (activeChannels.length === 0) {
      return []
    }

    return activeChannels
      .map((channel) =>
        channel.members.filter((member) => member.userId !== userCred.userId),
      )
      .flatMap((friend) => friend)
  }

  async function connectUserInChat(userId: string) {
    try {
      await sb.connect(userId)
      const users = await getActiveUsers()
      const professionals = await getProfessionals()
      const friends = await getFriendList()
      setFriendList(friends)
      setProfessionals(professionals)
      setUsersList(users)
    } catch (err) {
      if (err) {
        console.error(`Sendbird connection error =>> ${err}`, 'chatContext')
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
    setUsersList(users)
  }

  return (
    <ChatContext.Provider
      value={{
        userCred,
        setFriendList,
        getFriendList,
        friendList,
        usersList,
        professionals,
        connectUserInChat,
        updateUserProfile,
        disconnectUser,
        createOneToOneChannel,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
