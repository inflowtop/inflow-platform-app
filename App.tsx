import { useCallback } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  useFonts
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { Routes } from "@src/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="auto" translucent backgroundColor="transparent" />
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
