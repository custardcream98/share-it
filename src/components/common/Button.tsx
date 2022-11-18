import styled from "styled-components";

export default styled.button`
  display: inline-block;

  color: #fff;
  background-color: ${(props) => props.theme.accentColor};

  border-radius: 4px;
  padding: 12px 16px;

  transition: all 0.2s ease;

  :hover {
    scale: 1.1;
  }
`;
