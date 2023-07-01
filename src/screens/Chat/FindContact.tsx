import React, { useLayoutEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Search, Contact } from '@components/Chat'
import { Header, Loading } from '@components/common'
import { useAuth } from '@hooks/useAuth'
import { useChatContext } from '@hooks/useChatInfo'
import { api } from '@src/config/axios'

type ProfessionalsInfo = {
  isProfessional: boolean
}

export const FindContact = () => {
  const { usersInChat, userCred } = useChatContext()
  const { user } = useAuth()

  const [, setProfessionals] = useState<ProfessionalsInfo>()

  const [search, setSearch] = useState('')

  useLayoutEffect(() => {
    async function fetchProfessionals() {
      const { data } = await api.get<ProfessionalsInfo>(
        '/api/get-professionals',
      )
      setProfessionals(data)
    }

    fetchProfessionals()
  }, [])

  const filteredUsers =
    usersInChat.length > 0
      ? usersInChat
          .filter((userInChat) => {
            return userInChat.userId === user.email
          })
          .filter((userInChat) => userInChat.userId !== userCred.userId)
          .filter((userInChat) =>
            userInChat.nickname.toLowerCase().startsWith(search.toLowerCase()),
          )
      : []

  return (
    <SafeAreaView className="flex-1">
      <Header buttonGoBack />
      <View className="px-6 py-3">
        <Search search={search} setSearch={setSearch} />
        <ScrollView showsVerticalScrollIndicator={false} className="mb-4 mt-8">
          {filteredUsers ? (
            filteredUsers?.map((user) => (
              <Contact key={user.userId} user={user} />
            ))
          ) : (
            <Loading />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
