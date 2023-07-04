import { useState, useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Image } from 'expo-image'
import { ImagePickerAsset } from 'expo-image-picker'

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

  const scrollViewRef = useRef<ScrollView>(null)

  const { channelUrl } = route.params as ChannelRouteParams

  const UNIQUE_HANDLER_ID = 'UNIQUE_HANDLER_ID'

  useEffect(() => {
    const onFocus = () => {
      if (!channel) return
      channel.markAsRead()
    }

    const unsubscribe = navigation.addListener('focus', onFocus)

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
            ) => {},
            onMessageDeleted: (channel: BaseChannel, messageId: number) => {},
            onUndeliveredMemberStatusUpdated: (channel: GroupChannel) => {},
            onUnreadMemberStatusUpdated: (channel: GroupChannel) => {},
            onTypingStatusUpdated: (channel: GroupChannel) => {
              const typingMembers = channel.getTypingUsers()
              setIsTyping(typingMembers.length > 0)
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

    return unsubscribe
  }, [channelUrl, channel, navigation, isTyping])

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

  function handleSendImage(imageAssets: ImagePickerAsset) {
    if (!channel) return

    const uriSplit = imageAssets.uri.split('.')
    const fileNameSplit = uriSplit[uriSplit.length - 2].split('/')

    const fileExtension = uriSplit[uriSplit.length - 1]
    const fileName = fileNameSplit[fileNameSplit.length - 1]
    const type = imageAssets.type

    const params: FileMessageCreateParams = {
      fileUrl:
        'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png',
      fileName,
      customType: `${type}/${fileExtension}`,
      thumbnailSizes: [{ maxWidth: 200, maxHeight: 200 }],
    }

    channel
      .sendFileMessage(params)
      .onPending(() => {})
      .onFailed((err) => {
        console.log(`${err.name} ==>> ${err.message}`)
      })
      .onSucceeded((file: FileMessage) => {
        setMessages([...messages, file])
      })
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
              />
            )
          } else if (msg instanceof FileMessage) {
            console.log(msg)
            return (
              <Image
                key={msg.messageId}
                source={msg.url}
                className="h-auto w-32"
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
