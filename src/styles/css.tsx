import { css } from "styled-components";
import { maxWidth } from "./styleConstants";

export const cssMaxWidth = css`
  width: min(${maxWidth}, calc(100% - 30px));
  margin: 0 auto;
`;

export const cssLinkStyle = css`
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

export type CategoryBadgeProps = {
  iconUrl: string;
};
export const cssCategoryBadgeNotColored = css<CategoryBadgeProps>`
  display: inline-block;

  padding: 5px;
  padding-left: 27px;

  font-size: 0.85rem;
  border-radius: 10px;

  cursor: pointer;

  background: url(${(props) => props.iconUrl}) no-repeat 6px
    center/18px 18px;
`;
