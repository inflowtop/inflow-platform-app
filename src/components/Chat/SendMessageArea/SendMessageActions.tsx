import { View } from 'react-native'

import { ImageUpload } from '../ImageUpload'
import { SendButton } from '../SendButton'

type SendMessageActionsProps = {
  handler: () => void
  message: string
}

export const SendMessageActions = ({
  handler,
  message,
}: SendMessageActionsProps) => {
  return (
    <View className="flex-row items-center">
      <ImageUpload />
      <SendButton sendMessage={handler} noMessage={message.length === 0} />
    </View>
  )
}
