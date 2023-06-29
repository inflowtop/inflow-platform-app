import { TouchableOpacity } from 'react-native'

import { styled } from 'nativewind'

import { CaretCircleRight } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

type SendButtonProps = {
  noMessage?: boolean
  sendMessage: () => void
}

const SendIcon = styled(CaretCircleRight)

export const SendButton = ({ noMessage, sendMessage }: SendButtonProps) => {
  return (
    <TouchableOpacity
      className="ml-1"
      activeOpacity={0.8}
      disabled={noMessage}
      onPress={sendMessage}
    >
      <SendIcon
        size={40}
        weight="fill"
        color={noMessage ? colors.blue[400] : colors.blue[600]}
      />
    </TouchableOpacity>
  )
}
