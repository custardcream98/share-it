import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const linkStyle = css`
  position: relative;
  color: ${(props) => props.theme.accentColor};
  transition: linear 0.3s;
  -webkit-transition: linear 0.3s;
  -moz-transition: linear 0.3s;
  z-index: 10;
  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.bgColor};
  }
  &::before {
    content: " ";
    position: absolute;
    width: calc(100% + 0.6rem);
    height: calc(100% + 0.3rem);
    top: -0.1rem;
    left: -0.3rem;
    border-radius: 4px;
    background-color: transparent;
    transition: linear 0.3s;
    -webkit-transition: linear 0.3s;
    -moz-transition: linear 0.3s;
    z-index: -1;
  }
  &:hover::before {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

export default styled(Link)`
  ${linkStyle}
`;
