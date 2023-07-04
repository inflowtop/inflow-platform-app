import SendbirdChat, { SendbirdChatParams } from '@sendbird/chat'
import {
  GroupChannelModule,
  SendbirdGroupChat,
} from '@sendbird/chat/groupChannel'

export const params: SendbirdChatParams<[GroupChannelModule]> = {
  appId: 'D0AD5D38-6A13-4052-92D8-C9D4137AD2D4',
  modules: [new GroupChannelModule()],
}

export const sb = SendbirdChat.init(params) as SendbirdGroupChat
