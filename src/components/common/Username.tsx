import styled from "styled-components";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";
import TimeIndicator from "./TimeIndicator";

type UsernameStyledProps = {
  profilePhotoURL: string;
};
const UsernameStyled = styled.span<UsernameStyledProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 34px;
  margin-right: 10px;
  font-size: 0.8rem;

  padding-left: 38px;

  ::before {
    content: " ";
    position: absolute;
    left: 0;
    width: 30px;
    height: 30px;

    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.borderColor};

    background: url(${(props) => props.profilePhotoURL})
      no-repeat center/cover;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    height: 28px;
    padding-left: 32px;
    font-size: 0.7rem;
    ::before {
      width: 24px;
      height: 24px;
      border: 1px solid
        ${(props) => props.theme.borderColor};
    }
  }
`;

type Props = {
  username: string;
  profilePhotoURL: string;
  createdAt?: number;
  editedAt?: number;
};

const Username = ({
  username,
  profilePhotoURL,
  createdAt,
  editedAt,
}: Props) => {
  return (
    <UsernameStyled profilePhotoURL={profilePhotoURL}>
      {username}
      {createdAt && editedAt && (
        <TimeIndicator
          createdAt={createdAt}
          editedAt={editedAt}
        />
      )}
    </UsernameStyled>
  );
};

export default Username;
