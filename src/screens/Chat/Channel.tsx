import { useState, useEffect, useRef } from 'react'
import { ScrollView, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BallonMessage } from '@components/Chat/BallonMessage'
import { Header } from '@components/Chat/Header'
import { SendButton } from '@components/Chat/SendButton'
import { useChatContext } from '@hooks/useChatInfo'
import { sb } from '@src/config/sendbird'

import { useRoute } from '@react-navigation/native'
import { BaseChannel } from '@sendbird/chat'
import { GroupChannel, GroupChannelHandler } from '@sendbird/chat/groupChannel'
import {
  UserMessage,
  UserMessageCreateParams,
  BaseMessage,
} from '@sendbird/chat/message'

export const Channel = () => {
  const { userCred } = useChatContext()

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<BaseMessage[]>([])

  type ChannelRouteParams = {
    channelUrl: string
  }

  const route = useRoute()

  const { channelUrl } = route.params as ChannelRouteParams

  const [channel, setChannel] = useState<GroupChannel>()
  const UNIQUE_HANDLER_ID = 'UNIQUE_HANDLER_ID'

  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    async function loadPreviousMessages() {
      try {
        const groupChannel = await sb.groupChannel.getChannel(channelUrl)
        setChannel(groupChannel)

        const messageCollection = groupChannel.createMessageCollection()

        if (messageCollection.hasPrevious) {
          const loadedMessages = await messageCollection.loadPrevious()
          setMessages((prevMessages) => [
            ...prevMessages,
            ...loadedMessages.filter(
              (newMessage) =>
                !prevMessages.find(
                  (msg) => msg.messageId === newMessage.messageId,
                ),
            ),
          ])
        }

        const groupChannelHandler: GroupChannelHandler =
          new GroupChannelHandler({
            onMessageReceived: (channel: BaseChannel, message: BaseMessage) => {
              setMessages((prevMessages) => [...prevMessages, message])
            },
            onMessageUpdated: (channel: BaseChannel, message: BaseMessage) => {
              console.log(message)
            },
            onMessageDeleted: (channel: BaseChannel, messageId: number) => {},
            onUndeliveredMemberStatusUpdated: (channel: GroupChannel) => {},
            onUnreadMemberStatusUpdated: (channel: GroupChannel) => {},
            onTypingStatusUpdated: (channel: GroupChannel) => {},
          })

        sb.groupChannel.addGroupChannelHandler(
          UNIQUE_HANDLER_ID,
          groupChannelHandler,
        )

        scrollViewRef.current?.scrollToEnd({ animated: false })
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
    console.log(messages)

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
    <SafeAreaView className="flex-1 divide-y divide-gray-300/50">
      <Header userName={'Patrick'} />
      <ScrollView ref={scrollViewRef} className="px-4 pt-2">
        {messages.map((msg) => {
          if (msg instanceof UserMessage) {
            return (
              <BallonMessage
                key={msg.messageId}
                data={msg}
                isSender={userCred.userId === msg.sender.userId}
              />
            )
          } else {
            return null
          }
        })}
      </ScrollView>
      <View
        key={messages.length}
        className="mt-2 flex-row justify-between px-6 py-4"
      >
        <TextInput
          className="mr-2 flex-1"
          onChangeText={handleSetMessage}
          value={message}
          placeholder="Mensagem..."
        />
        <SendButton
          sendMessage={handleSendMessage}
          noMessage={message.length === 0}
        />
      </View>
    </SafeAreaView>
  )
}
