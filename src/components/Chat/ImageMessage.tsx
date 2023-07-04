import { View } from 'react-native'

import { Image } from 'expo-image'

import { ReadMessage } from './ReadMessage'

type MessageImageProps = {
  url: string
  createdAt: number
}

type ImageMessageProps = {
  data: MessageImageProps
  isSender: boolean
  messageRead?: boolean
}

export const ImageMessage = ({
  data,
  isSender,
  messageRead,
}: ImageMessageProps) => {
  return (
    <View className={`mb-2 ${isSender ? 'self-end' : 'self-start'}`}>
      <Image source={{ uri: data.url }} className="h-32 w-32" />
      <ReadMessage
        isSender={isSender}
        createdAt={data.createdAt}
        messageRead={messageRead}
      />
    </View>
  )
}
