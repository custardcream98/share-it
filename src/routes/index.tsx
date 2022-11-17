import Navbar from "components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { navbarHeight } from "styles/styleConstants";

import Home from "./Home";
import Profile from "./Profile";

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
  );
};

export default AppRouter;
