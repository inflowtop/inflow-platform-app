import { SENDBIRD_APP_ID } from '@env'
import SendbirdChat from '@sendbird/chat'
import { OpenChannelModule, SendbirdOpenChat } from '@sendbird/chat/openChannel'

export const sb = SendbirdChat.init({
  appId: SENDBIRD_APP_ID,
  modules: [new OpenChannelModule()],
}) as SendbirdOpenChat
