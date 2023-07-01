import { Text } from 'react-native'

type LoginFormSubtitleProps = {
  subtitle: string
}

export const LoginFormSubtitle = ({ subtitle }: LoginFormSubtitleProps) => {
  return (
    <Text className="text-center text-xs leading-5 text-gray-600">
      {subtitle}
    </Text>
  )
}
