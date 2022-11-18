import {
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  COLLECTION_NAME,
  fireAuth,
  firestore,
  newUserProfile,
} from "configs/firebase.config";
import GithubLogoImg from "imgs/Github-logo.svg";
import { ROUTE_PATH } from "configs/router.config";

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
      const ghProvider = new GithubAuthProvider();
      try {
        const { user: createdUser } = await signInWithPopup(
          fireAuth,
          ghProvider
        );

        const profileDocRef = doc(
          firestore,
          COLLECTION_NAME.PROFILE,
          createdUser.uid
        );

        const profileSnap = await getDoc(profileDocRef);

        if (!profileSnap.exists()) {
          await setDoc(
            doc(
              firestore,
              COLLECTION_NAME.PROFILE,
              createdUser.uid
            ),
            newUserProfile
          );
        }
      } catch (error) {
        console.log(error);
        return;
      }
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
