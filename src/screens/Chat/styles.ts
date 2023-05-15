import { SafeAreaView } from "react-native-safe-area-context";

import { MagnifyingGlass } from "phosphor-react-native";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #ffffff;
`;

export const Content = styled.View`
  padding: 12px 24px;
`;

export const Icon = styled(MagnifyingGlass)`
  width: 24px;
  color: #adb5bd;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  color: #121214;
  background-color: #f7f7fc;
  padding: 8px 16px 8px 60px;
  border-radius: 4px;
`;

export const ContactContainer = styled.View`
  margin-top: 32px;
`;
