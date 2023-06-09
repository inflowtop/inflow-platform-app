import { Text, TouchableOpacity, View } from 'react-native'

import { Image } from 'expo-image'

import { useChatContext } from '@hooks/useChatInfo'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import { User } from '@sendbird/chat'

type ConnectionProps = {
  user: User
}

type RootStackParamList = {
  Channel: {
    channelUrl: string
  }
}

export const Contact = ({ user }: ConnectionProps) => {
  const { createOneToOneChannel, userCred } = useChatContext()

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  async function handlePushToChannel() {
    try {
      const channel = await createOneToOneChannel(userCred.userId, user.userId)
      navigation.navigate('Channel', { channelUrl: channel.url })
    } catch (err) {
      console.error(err, 'Contact component')
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => handlePushToChannel()}
      className="relative flex-row items-center gap-4 pb-6"
    >
      <Image source={user.profileUrl} className="h-14 w-14 rounded-full" />
      <View className="h-14 justify-evenly">
        <Text className="font-title text-base">{user.nickname}</Text>
        <Text className="text-gray-500">{user.connectionStatus}</Text>
      </View>
    </TouchableOpacity>
  )
}
