import { useState } from "react";
import styled, { css } from "styled-components";

import ThumbsUpIconImg from "imgs/thumbs-up-icon.svg";
import ThumbsUpIconActivatedImg from "imgs/thumbs-up-activated-icon.svg";
import CommentIconImg from "imgs/comment-icon.svg";
import getDateStringFromTimestamp from "utils/getDateStringFromTimestamp";
import { toggleLike } from "utils/firebase/likes";
import useCurrentUser from "hooks/useCurrentUser";

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
  text-align: right;

  .date {
    display: block;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .like-count,
  .comment-count {
    width: fit-content;
    display: inline-block;
    margin-top: 7px;
    padding-left: 15px;
    font-size: 0.9rem;
  }
  .like-count {
    background: ${({ isLikeActive }) =>
        isLikeActive
          ? `url(${ThumbsUpIconActivatedImg})`
          : `url(${ThumbsUpIconImg})`}
      no-repeat left center/13px;
    ${({ isLikeClickable }) =>
      isLikeClickable && cssLikeClickable};
  }
  .comment-count {
    margin-left: 15px;
    background: url(${CommentIconImg}) no-repeat left
      center/13px;
  }
`;

type Props = {
  createdAt: number;
  editedAt: number;
  likes: string[];
  commentsCount: number;
  isLikeClickable?: boolean;
  postId?: string;
};

const Counter = ({
  createdAt,
  editedAt,
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

  const lastEdited =
    createdAt === editedAt ? createdAt : editedAt;

  return (
    <CounterWrapper
      isLikeClickable={isLikeClickable}
      isLikeActive={likesState.includes(uid ?? "")}
    >
      <time
        className="date"
        dateTime={new Date(lastEdited).toISOString()}
      >
        {getDateStringFromTimestamp(lastEdited) +
          (lastEdited !== createdAt ? " (수정됨)" : "")}
      </time>
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
