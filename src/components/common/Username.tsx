import styled from "styled-components";

type WrapperProps = {
  profilePhotoURL: string;
};
const Wrapper = styled.span<WrapperProps>`
  position: relative;
  display: inline-flex;
  align-items: center;

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
};

const Username = ({ username, profilePhotoURL }: Props) => {
  return (
    <Wrapper profilePhotoURL={profilePhotoURL}>
      {username}
    </Wrapper>
  );
};

export default Username;
