import { View, Text } from 'react-native'

type MessageProps = {
  message: string
  createdAt: number
}

type BallonMessageProps = {
  data: MessageProps
  isFriend: boolean
}

export const BallonMessage = ({ data, isFriend }: BallonMessageProps) => {
  function secondsToDate() {
    const date = new Date(data.createdAt)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedDate = `${hours}:${minutes}`
    return formattedDate
  }

  const sendedAt = secondsToDate()
  console.log(isFriend)

  return (
    <View
      className={`mb-2 flex-row rounded p-4 ${
        isFriend
          ? 'self-start rounded-tl-none bg-gray-500'
          : 'self-end rounded-tr-none bg-blue-500'
      }`}
    >
      <Text className="text-gray-50">{data.message}</Text>
      <Text className="ml-2 mt-2 self-end text-[10px] text-gray-200/70">
        {sendedAt}
      </Text>
      {/* <Text>visto</Text> */}
    </View>
  )
}
