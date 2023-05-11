import { Button } from "@components/Button";

import { GoogleLogo } from "phosphor-react-native";

import { Brand, Container, Span } from "./styles";

import BrandLogo from "@assets/logo.png";

export const Login = () => {
  return (
    <Container>
      <Brand source={BrandLogo} />
      <Button icon={<GoogleLogo color="#ffffff" size={20} weight="bold" />}>
        Entrar com o google
      </Button>
      <Span>
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
        de sua conta.
      </Span>
    </Container>
  );
};
