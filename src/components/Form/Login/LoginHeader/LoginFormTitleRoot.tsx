import { View } from 'react-native'

import { Children } from '@@types/Children'

export const LoginFormTitleRoot = ({ children }: Children) => {
  return <View className="mb-4 space-y-2">{children}</View>
}
