import styled from "styled-components";
import { cssMaxWidth } from "styles/css";
import StyledLink from "components/common/StyledLink";
import Logo from "components/common/Logo";
import { navbarHeight } from "styles/styleConstants";
import useAuth from "hooks/useAuth";

const Header = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: ${navbarHeight};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(13px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  z-index: 100;
`;

const GlobalNavbar = styled.nav`
  ${cssMaxWidth}

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  const auth = useAuth();

  return (
    <Header>
      <GlobalNavbar>
        <Logo />
        <ul>
          {auth ? (
            <StyledLink to={"/profile"}>프로필</StyledLink>
          ) : (
            <StyledLink to={"/auth"}>로그인</StyledLink>
          )}
        </ul>
      </GlobalNavbar>
    </Header>
  );
};

export default Navbar;
