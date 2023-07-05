import Constants from 'expo-constants'

import SendbirdChat, { SendbirdChatParams } from '@sendbird/chat'
import {
  GroupChannelModule,
  SendbirdGroupChat,
} from '@sendbird/chat/groupChannel'

const sendbirdAppId = Constants.expoConfig?.extra?.sendbirdAppId

export const params: SendbirdChatParams<[GroupChannelModule]> = {
  appId: sendbirdAppId,
  modules: [new GroupChannelModule()],
}

export const sb = SendbirdChat.init(params) as SendbirdGroupChat
