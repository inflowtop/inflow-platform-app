import { Image as ExpoImage } from "expo-image";

import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 12px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled(ExpoImage)`
  width: 40px;
  height: 40px;
  border-radius: 999px;
`;
