import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Search, Contact } from '@components/Chat'
import { Header, Loading } from '@components/common'
import { useChatContext } from '@hooks/useChatInfo'

export const FindContact = () => {
  const { usersList, userCred, professionals } = useChatContext()

  const [search, setSearch] = useState('')

  const filteredProfessionals = []

  for (const professional of professionals) {
    const userMatched = usersList.find((user) => {
      return user.userId === professional.professionalId
    })
    if (userMatched) {
      filteredProfessionals.push(userMatched)
    }
  }

  const filteredUsers =
    filteredProfessionals.length > 0
      ? filteredProfessionals
          .filter((user) => user.userId !== userCred.userId)
          .filter((user) =>
            user.nickname.toLowerCase().startsWith(search.toLowerCase()),
          )
      : []

  return (
    <SafeAreaView className="flex-1">
      <Header buttonGoBack />
      <View className="px-6 py-3">
        <Search search={search} setSearch={setSearch} />
        <ScrollView showsVerticalScrollIndicator={false} className="mb-4 mt-8">
          {filteredUsers.length > 0 ? (
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
