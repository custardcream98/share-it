import styled from "styled-components";

const Container = styled.footer`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 300;
  margin-top: 0.5rem;

  @media (max-width: 780px) {
    font-size: 11px;
  }

  address ul {
    display: flex;
  }
  address ul li {
    color: ${(props) => props.theme.borderColor};
    font-size: inherit;
    font-weight: inherit;
    padding-left: 0.3rem;
  }
  address ul li:nth-of-type(1) {
    padding-left: 0rem;
  }
  small {
    color: ${(props) => props.theme.borderColor};
    margin-bottom: 0.4rem;
  }
`;

const Footer = () => {
  return (
    <Container>
      <small>
        &copy; {new Date().getFullYear()} custardcream98.
        All rights reserved.
      </small>
      <address>
        <ul>
          <li>
            <a
              href="https://github.com/custardcream98"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/shi-woo-park-668b33147/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="mailto:custardcream@kakao.com"
              target="_blank"
              rel="noreferrer"
            >
              Email
            </a>
          </li>
        </ul>
      </address>
    </Container>
  );
};

export default Footer;
