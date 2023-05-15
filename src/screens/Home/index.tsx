import { Button } from "@components/common/Button";
import { Header } from "@components/common/Header";
import { Loading } from "@components/common/Loading";

import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { ChatCircleDots } from "phosphor-react-native";

import { Container, Content } from "./styles";

export const Home = () => {
  const { userInfo } = useAuth();
  const { navigate } = useNavigation();

  if (!userInfo.photoURL) {
    <Loading />;
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button
          icon={<ChatCircleDots color="white" size={20} weight="bold" />}
          onPress={() => navigate("Chat")}
        >
          Acessar chat
        </Button>
      </Content>
    </Container>
  );
};
