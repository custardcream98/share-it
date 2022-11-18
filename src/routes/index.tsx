import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import Navbar from "components/Navbar";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import { navbarHeight } from "styles/styleConstants";
import PostNewPage from "./Post/New";
import { ROUTE_PATH } from "configs/router.config";
import LoginPage from "./Auth";
import CheckAuth from "routes/CheckAuth";

const Main = styled.main`
  margin-top: calc(${navbarHeight} + 10px);
  flex-grow: 1;
`;
const Footer = styled.footer``;

const AppRouter = () => {
  return (
    <>
      <Router>
        <Helmet>
          <title>
            Share it! : 멋사 FE 3기의 코드나누기
          </title>
        </Helmet>
        <Navbar />
        <Main>
          <Routes>
            <Route
              path={ROUTE_PATH.HOME}
              element={<HomePage />}
            />
            <Route
              path={ROUTE_PATH.PROFILE}
              element={
                <CheckAuth>
                  <Helmet>
                    <title>Share it! : 프로필</title>
                  </Helmet>
                  <ProfilePage />
                </CheckAuth>
              }
            />
            <Route path={ROUTE_PATH.POST}>
              <Route
                path={ROUTE_PATH.NEWPOST}
                element={
                  <CheckAuth>
                    <Helmet>
                      <title>Share it! : 포스트 작성</title>
                    </Helmet>
                    <PostNewPage />
                  </CheckAuth>
                }
              />
            </Route>
            <Route
              path={ROUTE_PATH.AUTH}
              element={
                <>
                  <Helmet>
                    <title>Share it! : 로그인</title>
                  </Helmet>
                  <LoginPage />
                </>
              }
            />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </Main>
        <Footer>footer</Footer>
      </Router>
    </>
  );
};

export default AppRouter;
