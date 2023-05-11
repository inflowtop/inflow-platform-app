import { Children } from "@@types/Children";

import { Container, Title } from "./styles";

type Props = {
  icon?: JSX.Element;
} & Children;

export const Button = ({ children, icon }: Props) => {
  return (
    <Container style={{ borderRadius: 4 }} activeOpacity={0.8}>
      {icon && icon}
      <Title>{children}</Title>
    </Container>
  );
};
