import { useState, useEffect } from 'react'
import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@components/Chat/Header'
import { SendButton } from '@components/Chat/SendButton'
import { sb } from '@src/config/sendbird'

import { useRoute } from '@react-navigation/native'
import { GroupChannel, MessageCollection } from '@sendbird/chat/groupChannel'
import {
  UserMessage,
  UserMessageCreateParams,
  BaseMessage,
} from '@sendbird/chat/message'

export const Channel = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<BaseMessage[]>([])
  type ChannelRouteParams = {
    channelUrl: string
  }

  const route = useRoute()
  const { channelUrl } = route.params as ChannelRouteParams

  const [channel, setChannel] = useState<GroupChannel>()

  useEffect(() => {
    sb.groupChannel
      .getChannel(channelUrl)
      .then((groupChannel) => {
        setChannel(groupChannel)
        const messageCollection = new MessageCollection()
        if (messageCollection.hasPrevious) {
          messageCollection.loadPrevious().then((loadedMessages) => {
            setMessages((prevMessages) => [...prevMessages, ...loadedMessages])
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [channelUrl])

  function handleSetMessage(text: string) {
    setMessage(text)
  }

  function sendMessage() {
    if (!channel) return
    const params: UserMessageCreateParams = {
      message,
    }
    channel
      .sendUserMessage(params)
      .onPending((message: UserMessage) => {})
      .onFailed((err: Error, message: UserMessage) => {})
      .onSucceeded((message: UserMessage) => {
        setMessages([...messages, message])
      })
    setMessage('')
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="flex-1 bg-gray-300 px-4">
        {messages.map((msg) => (
          <Text key={msg.messageId}>{msg.message}</Text>
        ))}
      </View>
      <View className="flex-row items-center bg-gray-200 p-2">
        <TextInput
          className="flex-1 rounded bg-white px-4 py-2 text-lg"
          onChangeText={handleSetMessage}
          value={message}
        />
        <SendButton
          sendMessage={sendMessage}
          noMessage={message.length === 0}
        />
      </View>
    </SafeAreaView>
  )
}
