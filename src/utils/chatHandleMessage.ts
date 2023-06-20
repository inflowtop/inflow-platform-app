import {
  GroupChannel,
  GroupChannelCreateParams,
  SendbirdGroupChat,
} from '@sendbird/chat/groupChannel'
import { UserMessageCreateParams } from '@sendbird/chat/message'

export class ChatHandlerMessage {
  private sb: SendbirdGroupChat
  private groupChannel: GroupChannel

  constructor(sb: SendbirdGroupChat, groupChannel: GroupChannel) {
    this.sb = sb
    this.groupChannel = groupChannel
  }

  async createOneToOneChannel(userId: string, friendId: string) {
    const params: GroupChannelCreateParams = {
      invitedUserIds: [userId, friendId],
      isDistinct: true,
    }

    await this.sb.groupChannel.createChannel(params)
  }

  async sendMessage(message: string) {
    const params: UserMessageCreateParams = {
      message,
    }

    this.groupChannel
      .sendUserMessage(params)
      .onSucceeded((message) => message.messageId)
  }
}
