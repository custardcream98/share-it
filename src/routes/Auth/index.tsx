import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import GithubLogoImg from "imgs/Github-logo.svg";
import { ROUTE_PATH } from "configs/router.config";
import { loginGithubUser } from "utils/firebase/login";
import useAuth from "hooks/useAuth";

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
  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      navigate(ROUTE_PATH.HOME, { replace: true });
    }
  }, [auth]);

  const onGithubLoginClick = async () => {
    if (!auth) {
      await loginGithubUser();
    }

    if (auth) {
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
