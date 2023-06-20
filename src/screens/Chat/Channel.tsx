import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@components/Chat/Header'
import { SendButton } from '@components/Chat/SendButton'

export const Channel = () => {
  const [message, setMessage] = useState('')

  function handleSetMessage(text: string) {
    setMessage(text)
  }

  function sendMessage() {
    setMessage('')
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="flex-1 bg-gray-300 px-4">
        <Text>Messages...</Text>
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
