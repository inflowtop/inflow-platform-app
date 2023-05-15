import { Image } from "expo-image";

import { Circle } from "phosphor-react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding-bottom: 24px;
  position: relative;
`;

export const ContactImage = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

export const ContactInfo = styled.View`
  justify-content: space-evenly;
  height: 56px;
`;

export const ContactName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const ContactStatus = styled.Text`
  color: #adb5bd;
`;

export const BulletIndicator = styled(Circle).attrs({ weight: "fill" })`
  width: 12px;
  height: 12px;
  position: absolute;
  top: -8px;
  left: 40px;
  z-index: 1;
`;
