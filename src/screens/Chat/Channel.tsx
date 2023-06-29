import { useState, useEffect, useRef } from 'react'
import { ScrollView, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BallonMessage } from '@components/Chat/BallonMessage'
import { Header } from '@components/Chat/Header'
import { SendButton } from '@components/Chat/SendButton'
import { useChatContext } from '@hooks/useChatInfo'
import { sb } from '@src/config/sendbird'

import { useNavigation, useRoute } from '@react-navigation/native'
import { BaseChannel } from '@sendbird/chat'
import { GroupChannel, GroupChannelHandler } from '@sendbird/chat/groupChannel'
import {
  UserMessage,
  UserMessageCreateParams,
  BaseMessage,
} from '@sendbird/chat/message'

export const Channel = () => {
  type ChannelRouteParams = {
    channelUrl: string
  }

  const { userCred } = useChatContext()
  const navigation = useNavigation()
  const route = useRoute()

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<BaseMessage[]>([])
  const [channel, setChannel] = useState<GroupChannel>()
  const scrollViewRef = useRef<ScrollView>(null)

  const { channelUrl } = route.params as ChannelRouteParams

  const UNIQUE_HANDLER_ID = 'UNIQUE_HANDLER_ID'

  useEffect(() => {
    const onFocus = () => {
      if (!channel) return
      channel.markAsRead()
    }

    const unsubscribe = navigation.addListener('focus', onFocus)

    return unsubscribe
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
            onMessageUpdated: (
              channel: BaseChannel,
              message: BaseMessage,
            ) => { },
            onMessageDeleted: (channel: BaseChannel, messageId: number) => { },
            onUndeliveredMemberStatusUpdated: (channel: GroupChannel) => { },
            onUnreadMemberStatusUpdated: (channel: GroupChannel) => { 
              console.log(channel.unreadMessageCount)
            },
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
  }, [channelUrl, channel, navigation])

  function handleSetMessage(text: string) {
    setMessage(text)
    if (channel) console.log(channel.startTyping())
  }

  function handleSendMessage() {
    if (!channel) return
    const params: UserMessageCreateParams = {
      message,
    }
    channel
      .sendUserMessage(params)
      .onPending(() => { })
      .onFailed((err: Error, message: BaseMessage) => {
        console.log(err, message)
      })
      .onSucceeded((message: BaseMessage) => {
        setMessages([...messages, message])
        channel.endTyping()
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
