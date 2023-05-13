import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts
} from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";

import { Loading } from "@components/common/Loading";

import { AuthContextProvider } from "@contexts/AuthContext";
import { Routes } from "@src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" translucent backgroundColor="transparent" />
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </View>
    </SafeAreaProvider>
  );
}
