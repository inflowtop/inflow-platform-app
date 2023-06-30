import { TextInput } from 'react-native'

type SendMessageInputProps = {
  handler: (value: string) => void
  value: string
}

export const SendMessageInput = ({ handler, value }: SendMessageInputProps) => {
  return (
    <TextInput
      className="mr-2 flex-1"
      onChangeText={handler}
      value={value}
      placeholder="Mensagem..."
    />
  )
}
