import { View, Text } from 'react-native'

type MessageProps = {
  message: string
  createdAt: number
}

type BallonMessageProps = {
  data: MessageProps
  isSender: boolean
}

export const BallonMessage = ({ data, isSender }: BallonMessageProps) => {
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
      <Text
        className={`ml-2 mt-1 text-[10px] text-gray-600 ${
          isSender && 'self-end'
        }`}
      >
        {sendedAt}
      </Text>
    </View>
  )
}
