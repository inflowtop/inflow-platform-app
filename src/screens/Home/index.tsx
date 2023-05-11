import { Text } from "react-native";

import { Image } from "expo-image";

import { Button } from "@components/common/Button";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { ChatCircleText } from "phosphor-react-native";

import { Container, ContainerButton, HeaderStyled } from "./styles";

export const Home = () => {
  const { userInfo } = useAuth();
  const { navigate } = useNavigation();

  return (
    <Container>
      <HeaderStyled>
        <Image
          style={{ width: 48, height: 48, borderRadius: 999 }}
          source={userInfo.picture}
        />
        <Text>{userInfo.name}</Text>
      </HeaderStyled>
      <ContainerButton>
        <Button
          icon={<ChatCircleText color="#ffffff" weight="bold" size={20} />}
          onPress={() => navigate("Chat")}
        >
          Acessar chat
        </Button>
      </ContainerButton>
    </Container>
  );
};
