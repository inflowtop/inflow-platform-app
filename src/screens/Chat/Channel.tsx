import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@components/Chat/Header'
import { SendButton } from '@components/Chat/SendButton'
import { groupChannel } from '@src/config/groupChannel'
import { sb } from '@src/config/sendbird'
import { ChatHandlerMessage } from '@src/utils/chatHandleMessage'


export const Channel = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const chatHandler = new ChatHandlerMessage(sb, groupChannel)


  function handleSetMessage(text: string) {
    setMessage(text)
  }

  function sendMessage() {
    chatHandler.sendMessage(message)
    setMessages([...messages, message])
    setMessage('')
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="flex-1 bg-gray-300 px-4">
        {messages.map((msg) => (
          <Text key={msg}>{msg}</Text>
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
