import { Text, View } from 'react-native'

import { ButtonGoBack } from '@components/common/Header/ButtonGoBack'

export const Header = () => {
  return (
    <View className="w-full flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center space-x-4">
        <ButtonGoBack />
        <Text className="font-alt text-lg">Name</Text>
      </View>
    </View>
  )
}
