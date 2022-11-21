import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImgSrc from "public/imgs/LogoImg.svg";

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

  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  fill: ${({ theme }) => theme.accentColor};
  width: 1.4rem;
  height: 1.4rem;

  margin-left: 3px;
`;

const Logo = () => {
  return (
    <HeadingLogo to={"/"}>
      Share it!
      <LogoImg src={LogoImgSrc} />
    </HeadingLogo>
  );
};

export default Logo;
