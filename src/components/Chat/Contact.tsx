import { Text, View } from 'react-native'

import { Image } from 'expo-image'

import { styled } from 'nativewind'

import { User } from '@sendbird/chat'
import { Circle } from 'phosphor-react-native'

type ContactProps = {
  user: User
  status?: 'ONLINE' | 'OFFLINE'
}

const BulletIndicator = styled(Circle)

export const Contact = ({ status, user }: ContactProps) => {
  return (
    <View className="relative flex-row items-center gap-4 pb-6">
      {status && (
        <BulletIndicator
          weight="fill"
          className="absolute -top-2 left-10 z-10 h-3 w-3"
        />
      )}
      <Image source={user.profileUrl} className="h-14 w-14 rounded-lg" />
      <View className="h-14 justify-evenly">
        <Text className="font-title text-base">{user.nickname}</Text>
        <Text className="text-gray-500">Online</Text>
      </View>
    </View>
  )
}
