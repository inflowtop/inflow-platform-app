import { View } from 'react-native'

import { Children } from '@@types/Children'

export const LoginFormRoot = ({ children }: Children) => {
  return <View className="w-72 space-y-4">{children}</View>
}
