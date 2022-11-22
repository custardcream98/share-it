import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import CheckAuth from "routes/CheckAuth";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { navbarHeight } from "styles/styleConstants";
import { ROUTE_PATH } from "configs/router.config";
import { lazy, Suspense } from "react";
import LoadingIndicator from "components/common/LoadingIndicator";

const Main = styled.main`
  margin-top: calc(${navbarHeight} + 10px);
  flex-grow: 1;
`;

const HomePage = lazy(() => import("./Home"));
const ProfilePage = lazy(() => import("./Profile"));
const PostNewPage = lazy(() => import("./Post/New"));
const LoginPage = lazy(() => import("./Auth"));
const PostByPostIdPage = lazy(
  () => import("./Post/[postId]")
);
const PostEditPage = lazy(() => import("./Post/Edit"));
const MyPostsPage = lazy(() => import("./Profile/Myposts"));

const AppRouter = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Main>
          <Suspense fallback={<LoadingIndicator />}>
            <Routes>
              <Route
                path={ROUTE_PATH.HOME}
                element={<HomePage />}
              />
              <Route path={ROUTE_PATH.PROFILE}>
                <Route
                  path={ROUTE_PATH.MYPOSTS}
                  element={
                    <CheckAuth>
                      <Helmet>
                        <title>Share it!: 내가 쓴 글</title>
                      </Helmet>
                      <MyPostsPage />
                    </CheckAuth>
                  }
                />
                <Route
                  path=""
                  element={
                    <CheckAuth>
                      <Helmet>
                        <title>Share it!: 프로필</title>
                      </Helmet>

                      <ProfilePage />
                    </CheckAuth>
                  }
                />
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Route>
              <Route path={ROUTE_PATH.POST}>
                <Route
                  path={ROUTE_PATH.NEWPOST}
                  element={
                    <CheckAuth>
                      <Helmet>
                        <title>
                          Share it!: 포스트 작성
                        </title>
                      </Helmet>
                      <PostNewPage />
                    </CheckAuth>
                  }
                />
                <Route
                  path={ROUTE_PATH.EDIT}
                  element={
                    <CheckAuth>
                      <PostEditPage />
                    </CheckAuth>
                  }
                />
                <Route
                  path=":postId"
                  element={<PostByPostIdPage />}
                />
                <Route
                  path="*"
                  element={<Navigate to="/" replace />}
                />
              </Route>
              <Route
                path={ROUTE_PATH.AUTH}
                element={
                  <>
                    <Helmet>
                      <title>Share it!: 로그인</title>
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
          </Suspense>
        </Main>
        <Footer />
      </Router>
    </>
  );
};

export default AppRouter;
