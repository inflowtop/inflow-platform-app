import { TouchableOpacity } from "react-native";

import { useAuth } from "@hooks/useAuth";
import { CaretLeft } from "phosphor-react-native";

import { Container, Image } from "./styles";

type HeaderProps = {
  buttonGoBack?: boolean;
};

export const Header = ({ buttonGoBack }: HeaderProps) => {
  const { userInfo } = useAuth();

  return (
    <Container>
      {buttonGoBack && <CaretLeft />}
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={userInfo.photoURL} />
      </TouchableOpacity>
    </Container>
  );
};
