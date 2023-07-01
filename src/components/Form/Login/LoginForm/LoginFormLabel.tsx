import { Text } from 'react-native'

type LoginFormLabelProps = {
  label: string
}

export const LoginFormLabel = ({ label }: LoginFormLabelProps) => {
  return (
    <Text className="mb-1 mt-2 font-alt text-sm text-gray-600">{label}</Text>
  )
}
