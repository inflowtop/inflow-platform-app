import { ElementType } from 'react'
import { Text, TextInput, View } from 'react-native'

import { WarningCircle } from 'phosphor-react-native'

type Error = {
  isError: boolean
  message: string
}

type LoginFormInputProps = {
  icon: ElementType
  name: string
  onChange: (value: string) => void
  value: string
  error: Error
  secureText?: boolean
}

export const LoginFormInput = ({
  name,
  onChange,
  value,
  icon: Icon,
  error,
  secureText,
}: LoginFormInputProps) => {
  return (
    <View>
      <View className="relative">
        <Icon size={20} className="absolute bottom-2 left-3 z-50" />
        <TextInput
          className="h-10 w-auto rounded-md border border-gray-400 pl-10 transition-all duration-300 focus:border-2 focus:border-gray-800 focus:bg-transparent focus:shadow-md"
          placeholder={name}
          value={value}
          id={name}
          onChangeText={(text: string) => onChange(text)}
          secureTextEntry={secureText}
        />
      </View>
      {error.isError && (
        <View className="mt-2 w-72 flex-row items-center justify-start rounded-lg bg-red-500 px-3 py-2 shadow-lg">
          <WarningCircle
            size={20}
            style={{ marginRight: 8 }}
            color="white"
            weight="fill"
          />
          <Text className="font-alt text-sm text-white">{error.message}</Text>
        </View>
      )}
    </View>
  )
}
