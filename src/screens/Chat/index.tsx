import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";

import { Container, Title } from "./styles";

export const Chat = () => {
  const { goBack } = useNavigation();
  return (
    <Container>
      <Title>FALA CHAT</Title>
      <Button onPress={() => goBack()}>Go Back</Button>
    </Container>
  );
};
