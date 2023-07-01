import { SENDBIRD_APP_ID } from '@env'
import SendbirdChat, { SendbirdChatParams } from '@sendbird/chat'
import {
  GroupChannelModule,
  SendbirdGroupChat,
} from '@sendbird/chat/groupChannel'

export const params: SendbirdChatParams<[GroupChannelModule]> = {
  appId: SENDBIRD_APP_ID,
  modules: [new GroupChannelModule()],
}

export const sb = SendbirdChat.init(params) as SendbirdGroupChat
