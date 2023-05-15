import { MagnifyingGlass } from "phosphor-react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  color: #121214;
  background-color: #f7f7fc;
  padding: 8px 16px 8px 52px;
  border-radius: 4px;
`;

export const Icon = styled(MagnifyingGlass)`
  width: 24px;
  position: absolute;
  z-index: 1;
  left: 16px;
`;
