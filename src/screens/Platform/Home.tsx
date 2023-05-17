import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Header, Loading } from "@components/common/";
import { useAuth } from "@hooks/useAuth";

import { useNavigation } from "@react-navigation/native";
import { ChatCircleDots } from "phosphor-react-native";

export const Home = () => {
  const { userInfo } = useAuth();
  const { navigate } = useNavigation();

  if (!userInfo.photoURL) {
    <Loading />;
  }

  return (
    <SafeAreaView className="flex-1">
      <Header />
      <View className="flex-1 items-center justify-center">
        <Button
          icon={<ChatCircleDots color="white" size={20} weight="bold" />}
          onPress={() => navigate("Chat")}
        >
          Acessar chat
        </Button>
      </View>
    </SafeAreaView>
  );
};
