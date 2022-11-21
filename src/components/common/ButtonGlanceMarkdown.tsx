import styled from "styled-components";

import MarkdownOutlineImg from "imgs/markdown-outline.svg";
import MarkdownFillImg from "imgs/markdown-fill.svg";
import { MouseEventHandler } from "react";

type ButtonGlanceMarkdownProps = {
  isWatchingMd: boolean;
};
const ButtonGlanceMarkdownStyle = styled.button<ButtonGlanceMarkdownProps>`
  width: 32px;
  height: 32px;
  margin-right: 5px;

  background: ${({ isWatchingMd }) =>
      isWatchingMd
        ? `url(${MarkdownFillImg})`
        : `url(${MarkdownOutlineImg})`}
    no-repeat center/32px;
  transition: all 0.2s ease;
  :hover {
    scale: 1.05;
  }
`;

type Props = {
  className?: string;
  isWatchingMd: boolean;
  toggleMarkdownWatchingState: MouseEventHandler<HTMLButtonElement>;
};

const ButtonGlanceMarkdown = ({
  className,
  isWatchingMd,
  toggleMarkdownWatchingState,
}: Props) => {
  return (
    <ButtonGlanceMarkdownStyle
      isWatchingMd={isWatchingMd}
      type="button"
      onClick={toggleMarkdownWatchingState}
      className={className}
    >
      <span className="sr-only">
        마크다운 변환 결과 {isWatchingMd ? "닫기" : "보기"}
      </span>
    </ButtonGlanceMarkdownStyle>
  );
};

export default ButtonGlanceMarkdown;
