import styled from "styled-components";

import MarkdownRenderer from "components/common/MarkdownRenderer";
import Username from "components/common/Username";
import { CommentWithCommentId } from "interfaces";

import CrossmarkImg from "imgs/crossmark.svg";
import { deleteComment } from "utils/firebase/comments";
import useAuth from "hooks/useAuth";
import StyledLink from "components/common/StyledLink";

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

  const onDeleteCommentClick = () => {
    deleteComment(
      commentData.commentId,
      commentData.postId
    );
  };

  // const onEditCommentClick = () => {

  // }

  return (
    <Wrapper isLastCard={isLastCard}>
      <UsernameWrapper>
        <Username
          username={commentData.username}
          profilePhotoURL={commentData.profilePhotoURL}
          createdAt={commentData.createdAt}
          editedAt={commentData.editedAt}
        />
        {commentData.uid === auth?.currentUser?.uid && (
          <StyledLink
            as="button"
            type="button"
            onClick={onDeleteCommentClick}
          >
            삭제
          </StyledLink>
          // <StyledLink
          //   as="button"
          //   type="button"
          //   onClick={onEditCommentClick}
          // >
          //   수정
          // </StyledLink>
        )}
      </UsernameWrapper>
      <CommentRenderer>
        {commentData.content}
      </CommentRenderer>
    </Wrapper>
  );
};

export default CommentCard;
