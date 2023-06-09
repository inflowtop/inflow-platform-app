import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button, Header, Loading } from '@components/common/'
import { useAuth } from '@hooks/useAuth'
import { useChatContext } from '@hooks/useChatInfo'

import { useNavigation } from '@react-navigation/native'
import { ChatCircleDots } from 'phosphor-react-native'

export const Home = () => {
  const { user } = useAuth()
  const { navigate } = useNavigation()
  const { connectUserInChat, updateUserProfile } = useChatContext()

  if (!user.profileImage) {
    ;<Loading />
  }

  const handleButtonPress = async () => {
    await connectUserInChat(user.email)

    await updateUserProfile(user.name, user.profileImage).then(() =>
      navigate('Chat'),
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="flex-1 items-center justify-center">
        <Button
          icon={<ChatCircleDots color="white" size={20} weight="bold" />}
          onPress={handleButtonPress}
        >
          Acessar chat
        </Button>
      </View>
    </SafeAreaView>
  )
}
