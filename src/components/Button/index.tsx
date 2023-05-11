import { TouchableOpacityProps } from "react-native";

import { Children } from "@@types/Children";

import { Container, Title } from "./styles";

type Props = {
  icon?: JSX.Element;
} & Children &
  TouchableOpacityProps;

export const Button = ({ children, icon, ...rest }: Props) => {
  return (
    <Container activeOpacity={0.8} {...rest}>
      {icon && icon}
      <Title>{children}</Title>
    </Container>
  );
};
