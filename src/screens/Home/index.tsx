import { Text, TouchableOpacity } from "react-native";

import { Image } from "expo-image";

import { Button } from "@components/common/Button";
import { Loading } from "@components/common/Loading";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { ChatCircleText, SignOut } from "phosphor-react-native";

import {
  ButtonContainer,
  Container,
  HeaderStyled,
  SignOutContainer,
  UserInfoContainer
} from "./styles";

export const Home = () => {
  const { userInfo, signOut } = useAuth();
  const { navigate } = useNavigation();

  if (!userInfo.photoURL) {
    <Loading />;
  }

  return (
    <Container>
      <HeaderStyled>
        <UserInfoContainer>
          <Image
            style={{ width: 48, height: 48, borderRadius: 999 }}
            source={userInfo.photoURL}
          />
          <Text>{userInfo.displayName}</Text>
        </UserInfoContainer>
        <SignOutContainer as={TouchableOpacity} onPress={() => signOut()}>
          <Text>Sair</Text>
          <SignOut color="#121214" weight="bold" size={24} />
        </SignOutContainer>
      </HeaderStyled>
      <ButtonContainer>
        <Button
          icon={<ChatCircleText color="#ffffff" weight="bold" size={20} />}
          onPress={() => navigate("Chat")}
        >
          Acessar chat
        </Button>
      </ButtonContainer>
    </Container>
  );
};
