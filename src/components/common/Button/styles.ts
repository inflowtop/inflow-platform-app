import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  max-width: 320px;
  border-radius: 6px;
  padding: 16px;
  background-color: #1d4ed8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #ffffff;
  text-transform: uppercase;
  font-size: 14px;
  font-family: "Inter_700Bold";
  text-align: center;
  margin-left: 8px;
`;