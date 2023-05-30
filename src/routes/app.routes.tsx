import { ChatContextProvider } from '@contexts/ChatContext'
import { ChatHome } from '@screens/Chat'
import { Home } from '@screens/Platform'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export const AppRoutes = () => {
  return (
    <ChatContextProvider>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="Chat" component={ChatHome} />
      </Navigator>
    </ChatContextProvider>
  )
}
