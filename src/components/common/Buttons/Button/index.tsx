import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";

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

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    padding: 7px 9px;
    font-size: 0.9rem;
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
