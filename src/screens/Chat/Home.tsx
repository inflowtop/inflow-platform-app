import { useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Contact, Search } from '@components/Chat'
import { Header, Loading } from '@components/common'
import { useChatContext } from '@hooks/useChatInfo'

import { styled } from 'nativewind'

import { useNavigation } from '@react-navigation/native'
import { UserPlus } from 'phosphor-react-native'

const AddUser = styled(UserPlus)

export const ChatHome = () => {
  const { usersInChat, userCred } = useChatContext()
  const { navigate } = useNavigation()

  const [search, setSearch] = useState('')

  const filteredUsers =
    usersInChat.length > 0
      ? usersInChat
          .filter((user) => user.userId !== userCred.userId)
          .filter((user) =>
            user.nickname.toLowerCase().startsWith(search.toLowerCase()),
          )
      : []

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="px-6 py-3">
        <View className="flex-row items-center pr-4">
          <Search search={search} setSearch={setSearch} classNames="mr-6" />
          <TouchableOpacity
            onPress={() => navigate('FindContact')}
            activeOpacity={0.7}
            className="-ml-2"
          >
            <AddUser size={28} />
          </TouchableOpacity>
        </View>
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
