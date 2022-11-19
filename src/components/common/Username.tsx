import styled from "styled-components";
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
  font-size: 0.95rem;

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
