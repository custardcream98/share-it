import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import Navbar from "components/Navbar";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import { navbarHeight } from "styles/styleConstants";
import PostNewPage from "./Post/New";

const Main = styled.main`
  margin-top: calc(${navbarHeight} + 10px);
  flex-grow: 1;
`;
const Footer = styled.footer``;

type Props = {
  isLoggedIn: boolean;
};

const AppRouter = ({ isLoggedIn }: Props) => {
  return (
    <>
      <Helmet>
        <title>Share it! : 멋사 FE 3기의 코드나누기</title>
      </Helmet>
      <Router>
        <Navbar />
        <Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="profile"
              element={<ProfilePage />}
            />
            <Route path="post">
              <Route path="new" element={<PostNewPage />} />
            </Route>
          </Routes>
        </Main>
        <Footer>footer</Footer>
      </Router>
    </>
  );
};

export default AppRouter;
