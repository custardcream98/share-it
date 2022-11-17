import { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1024px;
`;

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
