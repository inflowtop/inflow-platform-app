import { View } from 'react-native'

import { Children } from '@@types/Children'

export const SendMessageRoot = ({ children }: Children) => {
  return <View className="flex-row justify-between px-6 py-4">{children}</View>
}
