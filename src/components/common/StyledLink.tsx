import { Link } from "react-router-dom";
import styled from "styled-components";

export default styled(Link)`
  transition: color 0.2s ease;
  :hover {
    color: ${(props) => props.theme.accentColor};
  }
`;
