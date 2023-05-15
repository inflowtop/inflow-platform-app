import { ActivityIndicator, TouchableOpacityProps } from "react-native";

import { Children } from "@@types/Children";

import { Container, Title } from "./styles";

type Props = {
  icon?: JSX.Element;
  isLoading?: boolean;
} & Children &
  TouchableOpacityProps;

export const Button = ({ children, isLoading, icon, ...rest }: Props) => {
  return (
    <Container activeOpacity={0.8} {...rest}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          {icon && icon}
          <Title>{children}</Title>
        </>
      )}
    </Container>
  );
};
