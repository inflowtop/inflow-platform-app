import { Text, View } from 'react-native'

import { Image } from 'expo-image'

import { ButtonGoBack } from '@components/common/Header/ButtonGoBack'
import { useAuth } from '@hooks/useAuth'

import { UserCircle } from 'phosphor-react-native'

type HeaderProps = {
  userName: string
}

export const Header = ({ userName }: HeaderProps) => {
  const { user } = useAuth()

  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center">
        <ButtonGoBack style="mr-3" />
        {user.profileImage ? (
          <Image source={user.profileImage} className="h-9 w-9 rounded-full" />
        ) : (
          <UserCircle size={36} weight="duotone" />
        )}
        <Text className="ml-2 font-alt text-lg">{userName}</Text>
      </View>
    </View>
  )
}
