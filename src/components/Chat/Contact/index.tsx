import { useAuth } from "@hooks/useAuth";

import {
  BulletIndicator,
  ContactImage,
  ContactInfo,
  ContactName,
  ContactStatus,
  Container
} from "./styles";

type ContactProps = {
  status?: "ONLINE" | "OFFLINE";
};

export const Contact = ({ status }: ContactProps) => {
  const { userInfo } = useAuth();
  return (
    <Container>
      {status && <BulletIndicator weight="fill" color="green" />}
      <ContactImage source={userInfo.photoURL} />
      <ContactInfo>
        <ContactName>{userInfo.displayName}</ContactName>
        <ContactStatus>Online</ContactStatus>
      </ContactInfo>
    </Container>
  );
};
