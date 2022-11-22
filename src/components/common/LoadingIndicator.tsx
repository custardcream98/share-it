import styled, { css } from "styled-components";

type LoadingIndicatorStyleProps = {
  isForSmall: boolean;
};
const cssLoadingIndicatorCoverPage = css`
  position: absolute;
  left: 50vw;
  top: 50vh;

  width: 80px;
  height: 80px;

  border: 6px solid;
  border-color: ${({ theme }) => theme.borderColor}
    transparent ${({ theme }) => theme.borderColor}
    transparent;
`;
const cssLoadingIndicatorSmall = css`
  width: 25px;
  height: 25px;
  border: 3px solid;
  border-color: #fff transparent #fff transparent;

  margin: -5px 10px;
`;
const LoadingIndicatorStyle = styled.div<LoadingIndicatorStyleProps>`
  margin: 8px;
  border-radius: 50%;

  transform: translate(-50%, -50%);
  animation: lds-dual-ring 1.2s linear infinite;

  ${({ isForSmall }) =>
    isForSmall
      ? cssLoadingIndicatorSmall
      : cssLoadingIndicatorCoverPage}

  @keyframes lds-dual-ring {
    0% {
      transform: ${({ isForSmall }) =>
          isForSmall ? "" : "translate(-50%, -50%)"}
        rotate(0deg);
    }
    100% {
      transform: ${({ isForSmall }) =>
          isForSmall ? "" : "translate(-50%, -50%)"}
        rotate(360deg);
    }
  }
`;

type Props = {
  isForSmall?: boolean;
};
const LoadingIndicator = ({ isForSmall }: Props) => (
  <LoadingIndicatorStyle isForSmall={isForSmall ?? false} />
);

export default LoadingIndicator;
