import { Button } from "@components/common/Button";

import { useNavigation } from "@react-navigation/native";
import { GoogleLogo } from "phosphor-react-native";

import { Brand, Container, Span } from "./styles";

import BrandLogo from "@assets/logo.png";

export const Login = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Brand source={BrandLogo} />
      <Button
        icon={<GoogleLogo color="#ffffff" size={20} weight="bold" />}
        onPress={() => navigation.navigate("Home")}
      >
        Entrar com o google
      </Button>
      <Span>
        Não utilizamos nenhuma informação além {"\n"} do seu e-mail para criação
        de sua conta.
      </Span>
    </Container>
  );
};
