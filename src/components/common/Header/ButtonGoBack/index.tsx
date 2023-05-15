import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native";

import { Button } from "./styles";

export const ButtonGoBack = () => {
  const { goBack } = useNavigation();

  return (
    <Button activeOpacity={0.8} onPress={() => goBack()}>
      <CaretLeft size={28} weight="bold" />
    </Button>
  );
};
