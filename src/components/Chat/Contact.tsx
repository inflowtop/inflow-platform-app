import { Text, View } from 'react-native'

import { Image } from 'expo-image'

import { useAuth } from '@hooks/useAuth'

import { styled } from 'nativewind'

import { Circle } from 'phosphor-react-native'

type ContactProps = {
  status?: 'ONLINE' | 'OFFLINE'
}

const BulletIndicator = styled(Circle)

export const Contact = ({ status }: ContactProps) => {
  const { userInfo } = useAuth()
  return (
    <View className="relative flex-row items-center gap-4 pb-6">
      {status && (
        <BulletIndicator
          weight="fill"
          className="absolute -top-2 left-10 z-10 h-3 w-3"
        />
      )}
      <Image source={userInfo.photoURL} className="h-14 w-14 rounded-lg" />
      <View className="h-14 justify-evenly">
        <Text className="font-title text-base">{userInfo.displayName}</Text>
        <Text className="text-gray-500">Online</Text>
      </View>
    </View>
  )
}
