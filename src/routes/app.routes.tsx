// import { Home } from '@screens/Platform'
import { ChatHome } from '@screens/Chat'
import { Channel } from '@screens/Chat/Channel'
import { FindContact } from '@screens/Chat/FindContact'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Group, Screen, Navigator } = createNativeStackNavigator()

export const AppRoutes = () => {
  return (
    <Navigator>
      {/* <Group screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
      </Group> */}
      <Group screenOptions={{ headerShown: false }}>
        <Screen name="Chat" component={ChatHome} />
        <Screen name="Channel" component={Channel} />
        <Screen name="FindContact" component={FindContact} />
      </Group>
    </Navigator>
  )
}
