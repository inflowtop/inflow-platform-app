import React from 'react'
import { View } from 'react-native'

import { Children } from '@@types/Children'

export const SendMessageActionsRoot = ({ children }: Children) => {
  return <View className="flex-row items-center">{children}</View>
}
