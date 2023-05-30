import { Text, View } from 'react-native'

import { Image } from 'expo-image'

import BrandLogo from '@assets/logo.png'
import { Button } from '@components/common'
import { useAuth } from '@hooks/useAuth'

import { GoogleChromeLogo } from 'phosphor-react-native'

export const Login = () => {
  const { signIn, isUserLoading } = useAuth()

  return (
    <View className="flex-1 items-center justify-center space-y-4">
      <Image source={BrandLogo} className="mb-6 h-16 w-56" />
      <Button
        icon={<GoogleChromeLogo color="#ffffff" size={24} weight="bold" />}
        onPress={() => signIn()}
        disabled={isUserLoading}
        isLoading={isUserLoading}
      >
        Entre com o google
      </Button>
      <Text className="text-center text-sm text-gray-500">
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação
        de sua conta.
      </Text>
    </View>
  )
}
