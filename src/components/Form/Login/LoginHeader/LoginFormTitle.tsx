import { Text } from 'react-native'

type LoginFormTitleProps = {
  title: string
}

export const LoginFormTitle = ({ title }: LoginFormTitleProps) => {
  return <Text className="mt-2 text-center font-title text-xl">{title}</Text>
}
