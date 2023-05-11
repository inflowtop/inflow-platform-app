import { Button } from "@components/Button";

import { Chat } from "phosphor-react-native";

import { Container } from "./styles";

export const Home = () => {
  return (
    <Container>
      <Button>
        <Chat color="#ffffff" weight="bold" size={20} />
        Acessar chat
      </Button>
    </Container>
  );
};
