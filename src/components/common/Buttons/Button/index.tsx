import styled from "styled-components";

const Button = styled.button`
  display: inline-block;

  color: #fff;
  background-color: ${(props) => props.theme.accentColor};

  border-radius: 4px;
  padding: 8px 13px;

  transition: all 0.2s ease;

  :hover {
    scale: 1.1;
  }

  @media (max-width: 800px) {
    padding: 4px 9px;
    font-size: 0.8rem;
  }
`;

export default Button;

type Props = {
  isDisabled: boolean;
};
export const ButtonForDisableable = styled(Button)<Props>`
  ${({ isDisabled }) =>
    isDisabled && "pointer-events: none;"}
`;
