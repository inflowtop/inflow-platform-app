import { View, Text } from 'react-native'

import { Check, Checks as DoubleCheck, Circle } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

type MessageProps = {
  message: string
  createdAt: number
}

type BallonMessageProps = {
  data: MessageProps
  isSender: boolean
  messageRead?: boolean
}

export const BallonMessage = ({
  data,
  isSender,
  messageRead,
}: BallonMessageProps) => {
  function secondsToDate() {
    const date = new Date(data.createdAt)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`

    return formattedDate
  }

  const sendedAt = secondsToDate()

  return (
    <View className={`mb-2 ${isSender ? 'self-end' : 'self-start'}`}>
      <View
        className={`flex-row rounded-lg px-4 py-3 ${
          isSender
            ? 'rounded-tr-none bg-blue-500'
            : 'rounded-tl-none bg-gray-300'
        }`}
      >
        <Text className={`${isSender ? 'text-gray-50' : 'text-gray-800'}`}>
          {data.message}
        </Text>
      </View>
      <View
        className={`mt-1 items-center space-x-1 ${
          !isSender ? 'flex-row-reverse self-start' : 'flex-row self-end'
        }`}
      >
        <Text className="ml-2 text-[10px] text-gray-600">{sendedAt}</Text>
        <Circle color={colors.gray[500]} size={6} weight="fill" />
        {messageRead ? (
          <DoubleCheck color={colors.blue[600]} size={14} weight="bold" />
        ) : (
          <Check color={colors.gray[500]} size={14} weight="bold" />
        )}
      </View>
    </View>
  )
}
