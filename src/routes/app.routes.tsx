import { ChatHome } from '@screens/Chat'
import { Channel } from '@screens/Chat/Channel'
import { Home } from '@screens/Platform'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Group, Screen, Navigator } = createNativeStackNavigator()

export const AppRoutes = () => {
  return (
    <Navigator>
      <Group screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
      </Group>
      <Group screenOptions={{ headerShown: false }}>
        <Screen name="Chat" component={ChatHome} />
        <Screen name="Channel" component={Channel} />
      </Group>
    </Navigator>
  )
}
