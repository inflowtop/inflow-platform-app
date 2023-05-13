import { Chat } from "@screens/Chat";
import { Home } from "@screens/Home";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Chat" component={Chat} />
    </Navigator>
  );
};
