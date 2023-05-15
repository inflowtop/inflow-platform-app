import { Contact } from "@components/Chat/Contact";
import { Search } from "@components/Chat/Search";
import { Header } from "@components/common/Header";

import { ContactContainer, Container, Content } from "./styles";

export const Chat = () => {
  return (
    <Container>
      <Header buttonGoBack />
      <Content>
        <Search />
        <ContactContainer>
          <Contact status="ONLINE" />
          <Contact />
          <Contact />
        </ContactContainer>
      </Content>
    </Container>
  );
};
