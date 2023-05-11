import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";
import { ChatCircleText } from "phosphor-react-native";

import { Container } from "./styles";

export const Home = () => {
  const { navigate } = useNavigation();

  return (
    <Container>
      <Button
        icon={<ChatCircleText color="#ffffff" weight="bold" size={20} />}
        onPress={() => navigate("Chat")}
      >
        Acessar chat
      </Button>
    </Container>
  );
};
