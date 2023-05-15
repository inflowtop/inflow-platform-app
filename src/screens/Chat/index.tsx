import { Button } from "@components/common/Button";

import { useNavigation } from "@react-navigation/native";

import { Container } from "./styles";

export const Chat = () => {
  const { goBack } = useNavigation();
  // const { userInfo } = useAuth();

  return (
    <Container>
      {/* <Title>FALA {userInfo.name}</Title> */}
      {/* <Text style={{ fontSize: 20 }}>Seu email é {userInfo.email}</Text> */}

      <Button onPress={() => goBack()}>Go Back</Button>
    </Container>
  );
};
