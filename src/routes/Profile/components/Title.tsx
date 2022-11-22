import styled from "styled-components";

const ProfileTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.accentColor};
`;

export default ProfileTitle;
