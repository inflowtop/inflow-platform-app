import { Image as ExpoImage } from "expo-image";

import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
  justify-content: space-between;
  align-items: center;
`;

export const Image = styled(ExpoImage)`
  width: 32px;
  height: 32px;
  border-radius: 999px;
`;
