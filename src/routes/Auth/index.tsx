import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { fireAuth } from "configs/firebase.config";
import GithubLogoImg from "imgs/Github-logo.svg";
import { ROUTE_PATH } from "configs/router.config";
import { loginGithubUser } from "lib/firebase/login";

const ButtonGithubLogin = styled.button`
  padding: 10px;
  padding-left: 30px;
  color: #fff;
  background: url(${GithubLogoImg}) no-repeat 7px
    center/18px 18px;
  background-color: #161b22;
  border-radius: 10px;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  const onGithubLoginClick = async () => {
    if (!fireAuth.currentUser) {
      await loginGithubUser();
    }

    if (fireAuth.currentUser) {
      navigate(ROUTE_PATH.HOME, { replace: true });
    }
  };
  return (
    <ButtonGithubLogin
      type="button"
      onClick={onGithubLoginClick}
    >
      Github 로그인
    </ButtonGithubLogin>
  );
};

export default LoginPage;
