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
  FileMessage,
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
    async function loadPreviousMessages() {
      try {
        const groupChannel = await sb.groupChannel.getChannel(channelUrl)
        setChannel(groupChannel)
        console.log(groupChannel)
        const messageCollection = new MessageCollection(groupChannel)
        if (messageCollection.hasPrevious) {
          const loadedMessages = await messageCollection.loadPrevious()
          setMessages((prevMessages) => [...prevMessages, ...loadedMessages])
        }

        // Add a message collection handler to listen for new messages
        const eventHandler = {
          onChannelUpdated: (context: any, channel: GroupChannel) => {
            console.log(channel)
          },
          onChannelDeleted: (context: any, channelUrl: string) => {},
          onMessagesAdded: (
            context: any,
            channel: GroupChannel,
            messages: BaseMessage[],
          ) => {
            // update the state with the new messages
            console.log(messages)
            setMessages((prevMessages) => [...prevMessages, ...messages])
          },
          onMessagesUpdated: (
            context: any,
            channel: GroupChannel,
            messages: BaseMessage[],
          ) => {
            console.log(messages)
          },
          onMessagesDeleted: (
            context: any,
            channel: GroupChannel,
            messageIds: number[],
            messages: BaseMessage[],
          ) => {},
          onHugeGapDetected: () => {},
        }
        messageCollection.setMessageCollectionHandler(eventHandler)
      } catch (error) {
        console.error(error)
      }
    }

    loadPreviousMessages()
  }, [channelUrl, channel])

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
      .onPending(() => {})
      .onFailed((err: Error, message: BaseMessage) => {
        console.log(err, message)
      })
      .onSucceeded((message: BaseMessage) => {
        setMessages([...messages, message])
      })
    setMessage('')
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="flex-1 bg-gray-300 px-4">
        {messages.map((msg) => {
          if (msg instanceof UserMessage) {
            return <Text key={msg.messageId}>{msg.message}</Text>
          } else if (msg instanceof FileMessage) {
            return <Text key={msg.messageId}>{msg.url}</Text>
          } else {
            return null
          }
        })}
      </View>

      <View
        key={messages.length}
        className="flex-row items-center bg-gray-200 p-2"
      >
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
