import styled from "styled-components";

import MarkdownRenderer from "components/common/MarkdownRenderer";
import Username from "components/common/Username";
import { CommentWithCommentId } from "interfaces";

import CrossmarkImg from "imgs/crossmark.svg";
import { deleteComment } from "utils/firebase/comments";
import useAuth from "hooks/useAuth";

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
`;

const CommentRenderer = styled(MarkdownRenderer)`
  margin-top: 13px;
`;

const ButtonDeleteComment = styled.button`
  display: inline-block;
  width: 30px;
  height: 30px;

  margin-left: 10px;

  background: url(${CrossmarkImg}) no-repeat center/30px;
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
          <ButtonDeleteComment
            type="button"
            onClick={onDeleteCommentClick}
          />
        )}
      </UsernameWrapper>
      <CommentRenderer>
        {commentData.content}
      </CommentRenderer>
    </Wrapper>
  );
};

export default CommentCard;
