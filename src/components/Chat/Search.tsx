import { TextInput, View } from 'react-native'

import { styled } from 'nativewind'

import { MagnifyingGlass } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

const GlassIcon = styled(MagnifyingGlass)

export const Search = () => {
  return (
    <View className="relative flex-row items-center">
      <GlassIcon
        className="absolute left-4 z-10 w-6"
        color={colors.gray[400]}
      />
      <TextInput
        className="w-full rounded bg-gray-200 py-2 pl-12 pr-4 text-base text-gray-950"
        placeholder="Search"
        placeholderTextColor={colors.gray[400]}
      />
    </View>
  )
}
