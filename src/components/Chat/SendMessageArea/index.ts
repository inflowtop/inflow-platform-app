import { SendMessageActionsRoot } from './SendMessageActionsRoot'
import { SendMessageButton } from './SendMessageButton'
import { SendMessageImageUpload } from './SendMessageImageUpload'
import { SendMessageInput } from './SendMessageInput'
import { SendMessageRoot } from './SendMessageRoot'

export const SendMessage = {
  Root: SendMessageRoot,
  Input: SendMessageInput,
  Actions: SendMessageActionsRoot,
  SendButton: SendMessageButton,
  ImageUpload: SendMessageImageUpload,
}
