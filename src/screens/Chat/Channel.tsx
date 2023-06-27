import { useState, useEffect } from 'react'
import { ScrollView, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BallonMessage } from '@components/Chat/BallonMessage'
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
  // const [draftMessage, setDraftMessage] = useState('')
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
        const messageCollection = new MessageCollection()
        if (messageCollection.hasPrevious) {
          const loadedMessages = await messageCollection.loadPrevious()
          setMessages((prevMessages) => [...prevMessages, ...loadedMessages])
        }

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

  function handleSendMessage() {
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
      <Header userName={channel?.members[1].nickname || 'Patrick'} />

      {/* <FlatList
        data={message}
        inverted
        renderItem={({ msg }) => {
          if (msg instanceof UserMessage) {
            console.log(msg.sender)
            return <BallonMessage key={msg.messageId} message={msg.message} />
          } else if (msg instanceof FileMessage) {
            return <BallonMessage key={msg.messageId} message={msg.url} />
          } else {
            return null
          }
        }}
      /> */}

      <ScrollView className="bg-zinc-300 px-4 pt-2 last:pb-2">
        {messages.map((msg) => {
          if (msg instanceof UserMessage) {
            console.log(msg)
            return <BallonMessage key={msg.messageId} message={msg.message} />
          } else if (msg instanceof FileMessage) {
            return <BallonMessage key={msg.messageId} message={msg.url} />
          } else {
            return null
          }
        })}
      </ScrollView>

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
          sendMessage={handleSendMessage}
          noMessage={message.length === 0}
        />
      </View>
    </SafeAreaView>
  )
}
