import { RectButton } from "react-native-gesture-handler";

import styled from "styled-components/native";

export const Container = styled(RectButton)`
  width: 100%;
  max-width: 320px;
  padding: 16px;
  background-color: #1d4ed8;
  border-radius: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.Text`
  color: #ffffff;
  text-transform: uppercase;
  font-size: 14px;
  font-family: "Inter_700Bold";
  text-align: center;
`;
