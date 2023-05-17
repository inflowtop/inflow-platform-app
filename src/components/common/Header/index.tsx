import { TouchableOpacity, View } from "react-native";

import { Image } from "expo-image";

import { useAuth } from "@hooks/useAuth";

import { ButtonGoBack } from "./ButtonGoBack";

type HeaderProps = {
  buttonGoBack?: boolean;
};

export const Header = ({ buttonGoBack }: HeaderProps) => {
  const { userInfo } = useAuth();

  return (
    <View className="w-full flex-row items-center justify-between px-6 py-3">
      {buttonGoBack && <ButtonGoBack />}
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={userInfo.photoURL} className="h-10 w-10 rounded-full" />
      </TouchableOpacity>
    </View>
  );
};
