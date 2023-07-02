import { Text, View } from 'react-native'

import { Image } from 'expo-image'

import { ButtonGoBack } from '@components/common/Header/ButtonGoBack'

import { UserCircle } from 'phosphor-react-native'

type HeaderProps = {
  data: {
    userName: string
    profileImage: string
  }
}

export const Header = ({ data }: HeaderProps) => {
  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center">
        <ButtonGoBack style="mr-3" />
        {data?.profileImage ? (
          <Image source={data.profileImage} className="h-9 w-9 rounded-full" />
        ) : (
          <UserCircle size={36} weight="duotone" />
        )}
        <Text className="ml-2 font-alt text-lg">{data.userName}</Text>
      </View>
    </View>
  )
}
