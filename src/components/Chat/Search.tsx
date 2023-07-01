import { TextInput, View } from 'react-native'

import { styled } from 'nativewind'

import { MagnifyingGlass } from 'phosphor-react-native'
import { twMerge } from 'tailwind-merge'
import colors from 'tailwindcss/colors'

type SearchProps = {
  search: string
  setSearch: (value: string) => void
  classNames?: string
}

const GlassIcon = styled(MagnifyingGlass)

export const Search = ({ setSearch, search, classNames }: SearchProps) => {
  return (
    <View className={twMerge('relative flex-row items-center', classNames)}>
      <GlassIcon
        className="absolute left-4 z-10 w-6"
        color={colors.gray[400]}
      />
      <TextInput
        className="h-11 flex-1 rounded bg-gray-200 py-2 pl-12 pr-4 text-base text-gray-950"
        placeholder="Search"
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholderTextColor={colors.gray[400]}
      />
    </View>
  )
}
