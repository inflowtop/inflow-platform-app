import { Button } from "@components/common/Button";

import { useAuth } from "@hooks/useAuth";
import { GoogleLogo } from "phosphor-react-native";

import { Brand, Container, Span } from "./styles";

import BrandLogo from "@assets/logo.png";

export const Login = () => {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Container>
      <Brand source={BrandLogo} />
      <Button
        icon={<GoogleLogo color="#ffffff" size={20} weight="bold" />}
        onPress={() => signIn()}
        disabled={isUserLoading}
        isLoading={isUserLoading}
      >
        Entre com o google
      </Button>
      <Span>
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
        de sua conta.
      </Span>
    </Container>
  );
};
