import { Text, TouchableOpacity, View } from 'react-native'

import { Image } from 'expo-image'

import { useAuth } from '@hooks/useAuth'
import { useChatContext } from '@hooks/useChatInfo'

import { styled } from 'nativewind'

import { useNavigation } from '@react-navigation/native'
import { User } from '@sendbird/chat'
import { Circle } from 'phosphor-react-native'

import {
  GroupChannel
} from '@sendbird/chat/groupChannel'

type ContactProps = {
  user: User
  status?: 'ONLINE' | 'OFFLINE'
}

const BulletIndicator = styled(Circle)

export const Contact = ({ status, user }: ContactProps) => {
  const { createOneToOneChannel, userCred } = useChatContext()
  const { userInfo } = useAuth()
  const { navigate } = useNavigation()

  async function handlePushToChannel() {
    console.log(userInfo.uid, user.userId)
    try {
      await createOneToOneChannel(userCred.userId, user.userId)
    } catch (err) {
      console.error(err)
    }

    navigate('Channel')
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => handlePushToChannel()}
      className="relative flex-row items-center gap-4 pb-6"
    >
      {status && (
        <BulletIndicator
          weight="fill"
          className="absolute -top-2 left-10 z-10 h-3 w-3"
        />
      )}
      <Image
        source={user.profileUrl || 'https://github.com/patricks-js.png'}
        className="h-14 w-14 rounded-lg"
      />
      <View className="h-14 justify-evenly">
        <Text className="font-title text-base">{user.nickname}</Text>
        <Text className="text-gray-500">
          {user.isActive ? 'Online' : 'Offline'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
