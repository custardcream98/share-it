import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import Navbar from "components/Navbar";
import Home from "./Home";
import Profile from "./Profile";
import { navbarHeight } from "styles/styleConstants";

const Main = styled.main`
  margin-top: ${navbarHeight};
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
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Main>
        <Footer>footer</Footer>
      </Router>
    </>
  );
};

export default AppRouter;
