import { useState, useEffect, useRef, useCallback } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BallonMessage, Header, Typing } from '@components/Chat'
import { SendMessage } from '@components/Chat/SendMessageArea'
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

type ChannelRouteParams = {
  channelUrl: string
}

export const Channel = () => {
  const { userCred } = useChatContext()
  const navigation = useNavigation()
  const route = useRoute()

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<BaseMessage[]>([])
  const [channel, setChannel] = useState<GroupChannel>()
  const [isTyping, setIsTyping] = useState(false)
  const [readReceipts, setReadReceipts] = useState<Record<string, boolean>>({})

  const scrollViewRef = useRef<ScrollView>(null)

  const { channelUrl } = route.params as ChannelRouteParams

  const UNIQUE_HANDLER_ID = 'UNIQUE_HANDLER_ID'

  const updateReadReceipts = useCallback(() => {
    if (!channel) return
    const newReadReceipts: Record<string, boolean> = {}
    messages.forEach((message) => {
      const readStatus = channel.getReadStatus()
      for (const memberId in readStatus) {
        if (memberId !== sb.currentUser.userId) {
          newReadReceipts[message.messageId] =
            readStatus[memberId].readAt <= message.createdAt
        }
      }
    })
    setReadReceipts(newReadReceipts)
  }, [channel, messages])

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
            onUnreadMemberStatusUpdated: (channel: GroupChannel) => { },
            onTypingStatusUpdated: (channel: GroupChannel) => {
              const typingMembers = channel.getTypingUsers()
              setIsTyping(typingMembers.length > 0)
            },
            onChannelChanged: (channel) => {
              if (channel instanceof GroupChannel) {
                updateReadReceipts()
              }
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
  }, [channelUrl, channel, navigation, isTyping, messages, updateReadReceipts])

  function handleSetMessage(text: string) {
    setMessage(text)
    if (channel) {
      channel
        .startTyping()
        .then(() => {
          setIsTyping(true)
        })
        .catch((err) => console.log(err))
        .finally(() => setIsTyping(false))
    }
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
        channel.markAsRead()
        setMessages([...messages, message])
        channel.endTyping()
      })
    setMessage('')
  }

  const currentMember = channel?.members.find(
    (member) => member.userId !== userCred.userId,
  )
  const userName = currentMember?.nickname
  return (
    <SafeAreaView className="flex-1">
      <Header userName={userName || ''} />
      <ScrollView
        ref={scrollViewRef}
        className="border-b border-t border-gray-300/50 bg-gray-200 px-4 pt-2"
      >
        {messages.map((msg) => {
          if (msg instanceof UserMessage) {
            return (
              <BallonMessage
                key={msg.messageId}
                data={msg}
                isSender={userCred.userId === msg.sender.userId}
                messageRead={readReceipts[msg.messageId]}
              />
            )
          } else {
            return null
          }
        })}
        {isTyping && <Typing />}
        <View className="h-2 w-full" />
      </ScrollView>
      <SendMessage.Root>
        <SendMessage.Input handler={handleSetMessage} value={message} />
        <SendMessage.Actions handler={handleSendMessage} message={message} />
      </SendMessage.Root>
    </SafeAreaView>
  )
}
