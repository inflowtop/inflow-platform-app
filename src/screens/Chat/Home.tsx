import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Contact, Search } from "@components/Chat";
import { Header } from "@components/common";

export const ChatHome = () => {
  return (
    <SafeAreaView className="flex-1">
      <Header buttonGoBack />
      <View className="px-6 py-3">
        <Search />
        <View className="mt-8">
          <Contact status="ONLINE" />
          <Contact />
          <Contact />
        </View>
      </View>
    </SafeAreaView>
  );
};
