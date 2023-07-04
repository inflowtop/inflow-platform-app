import { View, Text } from 'react-native'

import { ReadMessage } from './ReadMessage'

type MessageProps = {
  message: string
  createdAt: number
}

type BallonMessageProps = {
  data: MessageProps
  isSender: boolean
  messageRead?: boolean
}

export const BallonMessage = ({
  data,
  isSender,
  messageRead,
}: BallonMessageProps) => {
  return (
    <View className={`mb-2 ${isSender ? 'self-end' : 'self-start'}`}>
      <View
        className={`flex-row rounded-lg px-4 py-3 ${
          isSender
            ? 'rounded-tr-none bg-blue-500'
            : 'rounded-tl-none bg-gray-400/30'
        }`}
      >
        <Text className={`${isSender ? 'text-gray-50' : 'text-gray-800'}`}>
          {data.message}
        </Text>
      </View>
      <ReadMessage
        isSender={isSender}
        createdAt={data.createdAt}
        messageRead={messageRead}
      />
    </View>
  )
}
