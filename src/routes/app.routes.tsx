import { ChatHome } from "@screens/Chat";
import { Home } from "@screens/Platform";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Chat" component={ChatHome} />
    </Navigator>
  );
};
