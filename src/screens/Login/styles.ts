import { Image } from "expo-image";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Brand = styled(Image).attrs({ contentFit: "contain" })`
  width: 288px;
  height: 80px;
  margin-bottom: 48px;
`;

export const Span = styled.Text`
  font-size: 14px;
  text-align: center;
  color: #6b7280;
  margin-top: 16px;
`;
