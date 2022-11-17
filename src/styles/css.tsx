import { css } from "styled-components";
import { maxWidth } from "./styleConstants";

export const cssSrOnly = css`
  overflow: hidden;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
`;

export const cssMaxWidth = css`
  width: min(${maxWidth}, calc(100% - 60px));
  margin: 0 auto;
`;
