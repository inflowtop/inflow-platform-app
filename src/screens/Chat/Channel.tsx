import { useState, useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BallonMessage, Header, Typing } from '@components/Chat'
import { ImageMessage } from '@components/Chat/ImageMessage'
import { SendMessage } from '@components/Chat/SendMessageArea'
import { useChatContext } from '@hooks/useChatInfo'
import { sb } from '@src/config/sendbird'
import { uploadImageToFirebaseStorage } from '@src/utils/upload-image-to-database'

import { useNavigation, useRoute } from '@react-navigation/native'
import { BaseChannel } from '@sendbird/chat'
import { GroupChannel, GroupChannelHandler } from '@sendbird/chat/groupChannel'
import {
  UserMessage,
  UserMessageCreateParams,
  BaseMessage,
  FileMessageCreateParams,
  FileMessage,
} from '@sendbird/chat/message'

type ChannelRouteParams = {
  channelUrl: string
}

export const Channel = () => {
  const { userCred } = useChatContext()
  const navigation = useNavigation()
  const route = useRoute()

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<(BaseMessage | FileMessage)[]>([])
  const [channel, setChannel] = useState<GroupChannel>()
  const [isTyping, setIsTyping] = useState(false)
  const [readReceipts, setReadReceipts] = useState<Record<string, boolean>>({})

  const scrollViewRef = useRef<ScrollView>(null)

  const { channelUrl } = route.params as ChannelRouteParams

  const UNIQUE_HANDLER_ID = 'UNIQUE_HANDLER_ID'

  useEffect(() => {
    async function loadPreviousMessages() {
      try {
        const groupChannel = await sb.groupChannel.getChannel(channelUrl)
        setChannel(groupChannel)

        function updateReadReceipts() {
          const newReadReceipts: Record<string, boolean> = {}
          messages.forEach((message) => {
            const readStatus = groupChannel.getReadStatus()
            newReadReceipts[message.messageId] = Object.entries(readStatus)
              .filter(([userId]) => userId !== sb.currentUser.userId)
              .every(([_, status]) => {
                console.log('Read at:', status.readAt)
                return status.readAt >= message.createdAt
              })
          })
          setReadReceipts(newReadReceipts)
        }

        if (messages.length === 0) {
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

            updateReadReceipts()
          }
        }

        const groupChannelHandler: GroupChannelHandler =
          new GroupChannelHandler({
            onMessageReceived: async (
              channel: BaseChannel,
              message: BaseMessage,
            ) => {
              setMessages((prevMessages) => [...prevMessages, message])
              await groupChannel.markAsRead()
            },
            onTypingStatusUpdated: (channel: GroupChannel) => {
              const typingMembers = channel.getTypingUsers()
              setIsTyping(typingMembers.length > 0)
            },
            onChannelChanged: async (channel) => {
              updateReadReceipts()
            },
          })

        sb.groupChannel.addGroupChannelHandler(
          UNIQUE_HANDLER_ID,
          groupChannelHandler,
        )

        scrollViewRef.current?.scrollToEnd({ animated: false })
      } catch (error) {
        console.error(error, 'Channel screen')
      }
    }

    loadPreviousMessages()
  }, [channelUrl, channel, navigation, isTyping, messages, readReceipts])

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

  function handleSendTextMessage() {
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
        channel.endTyping()
      })
    setMessage('')
  }

  async function handleSendImage(fileName: string, type: string, uri: string) {
    if (!channel) return

    try {
      const fileUrl = await uploadImageToFirebaseStorage(uri, fileName)

      const params: FileMessageCreateParams = {
        fileUrl,
        fileName,
        customType: type,
        thumbnailSizes: [{ maxWidth: 200, maxHeight: 200 }],
      }

      channel
        .sendFileMessage(params)
        .onPending(() => {})
        .onFailed((err) => {
          console.log(err)
        })
        .onSucceeded((file) => {
          setMessages([...messages, file])
        })
    } catch (err) {
      console.log(err)
    }
  }

  const currentMember = channel?.members.find(
    (member) => member.userId !== userCred.userId,
  )

  return (
    <SafeAreaView className="flex-1">
      <Header
        data={{
          userName: currentMember?.nickname!,
          profileImage: currentMember?.profileUrl!,
        }}
      />
      <ScrollView
        ref={scrollViewRef}
        className="border-b border-t border-gray-300/50 bg-gray-300 px-4 pt-2"
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
          } else if (msg instanceof FileMessage) {
            return (
              <ImageMessage
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
        <SendMessage.Actions>
          <SendMessage.ImageUpload handleSendImage={handleSendImage} />
          <SendMessage.SendButton
            sendMessage={handleSendTextMessage}
            noMessage={message.length === 0}
          />
        </SendMessage.Actions>
      </SendMessage.Root>
    </SafeAreaView>
  )
}
