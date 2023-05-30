import { ActivityIndicator, View } from 'react-native'

export const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator color="#1d4ed8" />
    </View>
  )
}
