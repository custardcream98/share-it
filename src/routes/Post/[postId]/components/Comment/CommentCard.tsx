import { useState } from "react";
import styled from "styled-components";

import MarkdownRenderer from "components/common/MarkdownRenderer";
import Username from "components/common/Username";
import StyledLink from "components/common/StyledLink";

import { deleteComment } from "utils/firebase/comments";
import useAuth from "hooks/useAuth";
import { CommentWithCommentId } from "interfaces";
import CommentEditor from "./CommentEditor";

type WrapperProps = {
  isLastCard: boolean;
};

const Wrapper = styled.li<WrapperProps>`
  padding: 15px 10px 10px 10px;

  border-top: 1px solid ${({ theme }) => theme.borderColor};

  ${(props) =>
    props.isLastCard
      ? `border-bottom: 1px solid ${props.theme.borderColor};`
      : ""}
`;
const UsernameWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .edit-comment-wrapper {
    > button + button {
      margin-left: 10px;
    }
  }
`;

const CommentRenderer = styled(MarkdownRenderer)`
  margin-top: 13px;
`;

type Props = {
  commentData: CommentWithCommentId;
  isLastCard: boolean;
};

const CommentCard = ({
  commentData,
  isLastCard,
}: Props) => {
  const auth = useAuth();
  const [isEditingComment, setIsEditingComment] =
    useState(false);

  const onDeleteCommentClick = () => {
    deleteComment(
      commentData.commentId,
      commentData.postId
    );
  };

  const onEditCommentClick = () =>
    setIsEditingComment(true);

  const onCancleEditClick = () => {
    setIsEditingComment(false);
  };

  return (
    <>
      <Wrapper isLastCard={isLastCard}>
        {!isEditingComment && (
          <>
            <UsernameWrapper>
              <Username
                username={commentData.username}
                profilePhotoURL={
                  commentData.profilePhotoURL
                }
                createdAt={commentData.createdAt}
                editedAt={commentData.editedAt}
              />
              {commentData.uid ===
                auth?.currentUser?.uid && (
                <div className="edit-comment-wrapper">
                  <StyledLink
                    as="button"
                    type="button"
                    onClick={onDeleteCommentClick}
                  >
                    삭제
                  </StyledLink>
                  <StyledLink
                    as="button"
                    type="button"
                    onClick={onEditCommentClick}
                  >
                    수정
                  </StyledLink>
                </div>
              )}
            </UsernameWrapper>
            <CommentRenderer>
              {commentData.content}
            </CommentRenderer>
          </>
        )}
        {commentData.uid === auth?.currentUser?.uid &&
          isEditingComment && (
            <CommentEditor
              initialCommentData={commentData}
              currentUser={auth.currentUser}
              postId={commentData.postId}
              hidden={!isEditingComment}
              focused={isEditingComment}
              onCancleEditClick={onCancleEditClick}
            />
          )}
      </Wrapper>
    </>
  );
};

export default CommentCard;
