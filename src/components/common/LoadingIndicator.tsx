import styled from "styled-components";

const LoadingIndicator = styled.div`
  position: absolute;
  left: 50vw;
  top: 50vh;

  transform: translate(-50%, -50%);

  width: 80px;
  height: 80px;

  :after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.borderColor};
    border-color: ${({ theme }) => theme.borderColor}
      transparent ${({ theme }) => theme.borderColor}
      transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingIndicator;
