import { useState } from "react";
import styled, { css } from "styled-components";

import { toggleLike } from "utils/firebase/likes";
import useCurrentUser from "hooks/useCurrentUser";

import ThumbsUpImg from "public/imgs/thumbs-up.png";
import SpeechBalloonImg from "public/imgs/speech-balloon.png";

type CounterStyleProps = {
  isLikeClickable: boolean;
  isLikeActive?: boolean;
};

const cssLikeClickable = css<CounterStyleProps>`
  transition: all 0.2s ease;

  :hover {
    scale: 1.1;
  }

  color: ${({ isLikeActive, theme }) =>
    isLikeActive ? theme.accentColor : theme.textColor};
`;

const CounterWrapper = styled.div<CounterStyleProps>`
  .like-count,
  .comment-count {
    width: fit-content;
    display: inline-block;
    padding-left: 25px;
    font-size: 0.9rem;
    height: 18px;
    line-height: 18px;
  }
  .like-count {
    background: url(${ThumbsUpImg}) no-repeat left
      center/18px;
    ${({ isLikeClickable }) =>
      isLikeClickable && cssLikeClickable};
  }
  .comment-count {
    margin-left: 18px;
    background: url(${SpeechBalloonImg}) no-repeat left
      center/18px;
  }
`;

type Props = {
  likes: string[];
  commentsCount: number;
  isLikeClickable?: boolean;
  postId?: string;
};

const Counter = ({
  likes,
  commentsCount,
  isLikeClickable = false,
  postId,
}: Props) => {
  const [likesState, setlikesState] = useState(likes);
  const { uid } = useCurrentUser(false);

  if (isLikeClickable && !postId) {
    throw Error(
      "Counter 컴포넌트의 사용이 올바르지 않습니다."
    );
  }

  const onLikeClick = () => {
    if (postId) {
      toggleLike(postId, likesState);
      setlikesState((prev) =>
        prev.includes(uid)
          ? prev.filter((e) => e !== uid)
          : [...prev, uid]
      );
    }
  };

  return (
    <CounterWrapper
      isLikeClickable={isLikeClickable}
      isLikeActive={likesState.includes(uid ?? "")}
    >
      {isLikeClickable ? (
        <button
          type="button"
          className="like-count"
          onClick={onLikeClick}
        >
          {likesState.length}
        </button>
      ) : (
        <em className="like-count">{likes.length}</em>
      )}
      <em className="comment-count">{commentsCount}</em>
    </CounterWrapper>
  );
};

export default Counter;
