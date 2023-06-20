import { TouchableOpacity } from 'react-native'

import { styled } from 'nativewind'

import { PaperPlaneTilt } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

type SendButtonProps = {
  noMessage?: boolean
  sendMessage: () => void
}

const PaperTilt = styled(PaperPlaneTilt)

export const SendButton = ({ noMessage, sendMessage }: SendButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={noMessage}
      className="rounded-full p-2"
      onPress={sendMessage}
    >
      <PaperTilt
        size={28}
        color={noMessage ? colors.blue[400] : colors.blue[600]}
      />
    </TouchableOpacity>
  )
}
