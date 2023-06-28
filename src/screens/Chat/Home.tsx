import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Contact, Search } from '@components/Chat'
import { Header, Loading } from '@components/common'
import { useChatContext } from '@hooks/useChatInfo'

export const ChatHome = () => {
  const { usersInChat, userCred } = useChatContext()
  const [search, setSearch] = useState('')

  const filteredUsers =
    usersInChat.length > 0
      ? usersInChat.filter((user) =>
          user.nickname.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  if (usersInChat.length < 1) {
    return <Loading />
  }

  return (
    <SafeAreaView className="flex-1">
      <Header buttonGoBack />
      <View className="px-6 py-3">
        <Search search={search} setSearch={setSearch} />
        <ScrollView className="mb-4 mt-8">
          {filteredUsers?.map((user) => {
            if (user.userId !== userCred.userId) {
              return <Contact key={user.userId} user={user} />
            } else {
              return null
            }
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
