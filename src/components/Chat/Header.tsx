import { Text, View } from 'react-native'

import { ButtonGoBack } from '@components/common/Header/ButtonGoBack'

import { UserCircle } from 'phosphor-react-native'

type HeaderProps = {
  userName: string
}

export const Header = ({ userName }: HeaderProps) => {
  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center">
        <ButtonGoBack style="mr-2" />
        <UserCircle size={36} weight="duotone" />
        <Text className="ml-1 font-alt text-lg">{userName}</Text>
      </View>
    </View>
  )
}
