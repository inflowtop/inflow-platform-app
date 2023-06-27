import { View, Text } from 'react-native'

type BallonMessageProps = {
  message: string
}

export const BallonMessage = ({ message }: BallonMessageProps) => {
  return (
    <View className="mb-2 self-end rounded rounded-e-none bg-blue-500 p-4">
      <Text className="text-gray-50">{message}</Text>
      {/* <span>01:00</span> */}
      {/* <span>visto</span> */}
    </View>
  )
}
