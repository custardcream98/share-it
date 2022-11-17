import { Link } from "react-router-dom";
import styled from "styled-components";

const HeadingLogo = styled(Link)`
  font-weight: 800;
  font-size: 1.3rem;
  background-image: linear-gradient(
    45deg,
    #fff710,
    #e47c0d
  );
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const Logo = () => {
  return <HeadingLogo to={"/"}>Share it!</HeadingLogo>;
};

export default Logo;
