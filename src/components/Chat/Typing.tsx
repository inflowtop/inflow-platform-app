import { View } from 'react-native'

import { Circle } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

export const Typing = () => {
  return (
    <View className="mb-2 flex-row items-center self-start rounded-lg rounded-tl-none bg-gray-300 px-4 py-3">
      <Circle size={10} color={colors.gray[400]} weight="fill" />
      <Circle size={10} color={colors.gray[400]} weight="fill" />
      <Circle size={10} color={colors.gray[400]} weight="fill" />
    </View>
  )
}
