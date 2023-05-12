import { ActivityIndicator } from "react-native";

import { Container } from "./styles";

export const Loading = () => {
  return (
    <Container>
      <ActivityIndicator color="#1d4ed8" />
    </Container>
  );
};