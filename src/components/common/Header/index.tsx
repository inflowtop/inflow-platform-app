import { TouchableOpacity, View } from 'react-native'

import { Image } from 'expo-image'

import BrandLogo from '@assets/logo.png'
import { useAuth } from '@hooks/useAuth'

import { ButtonGoBack } from './ButtonGoBack'

type HeaderProps = {
  buttonGoBack?: boolean
}

export const Header = ({ buttonGoBack }: HeaderProps) => {
  const { user } = useAuth()

  return (
    <View className="w-full flex-row items-center justify-between px-6 py-3">
      {buttonGoBack && <ButtonGoBack />}
      <Image source={BrandLogo} className="h-10 w-36" />
      {user.profileImage && (
        <TouchableOpacity activeOpacity={0.8}>
          <Image
            source={user.profileImage}
            className="h-10 w-10 rounded-full"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
