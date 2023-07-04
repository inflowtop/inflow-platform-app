import React from 'react'
import { Text, View } from 'react-native'

import { Check, Checks as DoubleCheck, Circle } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

type ReadMessageProps = {
  isSender: boolean
  messageRead?: boolean
  createdAt: number
}

export const ReadMessage = ({
  isSender,
  messageRead,
  createdAt,
}: ReadMessageProps) => {
  function secondsToDate() {
    const date = new Date(createdAt)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedDate = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`

    return formattedDate
  }

  const sendedAt = secondsToDate()

  return (
    <View
      className={`mt-1 items-center space-x-1 ${
        !isSender ? 'flex-row-reverse self-start' : 'flex-row self-end'
      }`}
    >
      <Text className="ml-2 text-[10px] text-gray-600">{sendedAt}</Text>
      {isSender && <Circle color={colors.gray[500]} size={6} weight="fill" />}
      {isSender &&
        (messageRead ? (
          <DoubleCheck color={colors.blue[600]} size={14} weight="bold" />
        ) : (
          <Check color={colors.gray[500]} size={14} weight="bold" />
        ))}
    </View>
  )
}
