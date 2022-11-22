import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "components/common/Buttons/Button";
import StyledLink from "components/common/StyledLink";

import { fireAuth } from "configs/firebase.config";
import { ROUTE_PATH } from "configs/router.config";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    width: fit-content;
    + * {
      margin-top: 15px;
    }
  }
`;

const LogoutButton = () => {
  const navigate = useNavigate();
  const onLogoutClick = async () => {
    await fireAuth.signOut();
    navigate(ROUTE_PATH.HOME, { replace: true });
  };
  return <Button onClick={onLogoutClick}>로그아웃</Button>;
};

const ProfilePage = () => {
  return (
    <Wrapper>
      <LogoutButton />
      <StyledLink to={ROUTE_PATH.MYPOSTS}>
        내가 쓴 글
      </StyledLink>
    </Wrapper>
  );
};

export default ProfilePage;
