import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Contact, Search } from '@components/Chat'
import { Header, Loading } from '@components/common'
import { useChatContext } from '@hooks/useChatInfo'

export const ChatHome = () => {
  const { usersInChat } = useChatContext()

  console.log(usersInChat)

  if (usersInChat.length < 1) {
    return <Loading />
  }

  return (
    <SafeAreaView className="flex-1">
      <Header buttonGoBack />
      <View className="px-6 py-3">
        <Search />
        <View className="mt-8">
          {usersInChat?.map((user) => (
            <Contact key={user.userId} user={user} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
