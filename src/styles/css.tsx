import { css } from "styled-components";
import { maxWidth } from "./styleConstants";

export const cssMaxWidth = css`
  width: min(${maxWidth}, calc(100% - 60px));
  margin: 0 auto;
`;
