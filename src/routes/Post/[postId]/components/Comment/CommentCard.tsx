import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

import MarkdownRenderer from "components/common/MarkdownRenderer";
import Username from "components/common/Username";
import StyledLink from "components/common/StyledLink";
import ButtonGlanceMarkdown from "components/common/Buttons/ButtonGlanceMarkdown";
import LoadingIndicator from "components/common/LoadingIndicator";
import { ButtonForDisableable } from "components/common/Buttons/Button";

import {
  deleteComment,
  updateComment,
} from "utils/firebase/comments";
import useAuth from "hooks/useAuth";
import { CommentWithCommentId } from "interfaces";

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

const Form = styled.form`
  position: relative;

  width: 100%;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;

  margin: 10px 0;
`;

const EditorHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextareaCommentEditor = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 5px;
  padding: 5px;

  font-size: 1.1rem;
  font-family: "Pretendard";

  border: none;
  border-radius: 10px;
  resize: none;

  @media (max-width: 800px) {
    font-size: 0.95rem;
  }
`;

const RenderedComment = styled(MarkdownRenderer)`
  width: 100%;
  height: 100px;
  margin-top: 5px;
  padding: 5px;

  overflow-y: auto;
`;

const ButtonCommentSubmit = styled(ButtonForDisableable)`
  display: inline-block;
  padding: 10px 13px;
  margin-left: 10px;
  :hover {
    scale: 1.05;
  }
  ${({ isDisabled }) =>
    isDisabled && "pointer-events: none;"}
`;

const EditButtonWrapper = styled.div`
  margin-left: auto;
  width: fit-content;
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
  const [isWatchingMd, setIsWatchingMd] = useState(false);
  const toggleMarkdownWatchigState = () =>
    setIsWatchingMd((prev) => !prev);
  const [commentContent, setCommentContent] =
    useState<string>(commentData.content);
  const [isSubmitOngoing, setIsSubmitOngoing] =
    useState(false);
  const commentEditorRef =
    useRef<HTMLTextAreaElement>(null);

  const onDeleteCommentClick = () => {
    deleteComment(
      commentData.commentId,
      commentData.postId
    );
  };

  const onEditCommentClick = () => {
    setIsEditingComment(true);
    setIsWatchingMd(false);
  };

  const onCommentTextareaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentContent(event.target.value);
  };

  const onFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!commentContent || isSubmitOngoing) {
      return;
    }

    setIsSubmitOngoing(true);

    const result = await updateComment(
      commentData.commentId,
      commentContent
    );

    if (result) {
      setIsEditingComment(false);
      setIsWatchingMd(false);
    }

    setIsSubmitOngoing(false);
  };

  const onCancleEditClick = () => {
    setIsEditingComment(false);
    setIsWatchingMd(false);
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
            <Form onSubmit={onFormSubmit}>
              <EditorHeaderWrapper>
                <Username
                  username={commentData.username}
                  profilePhotoURL={
                    commentData.profilePhotoURL
                  }
                />
                <ButtonGlanceMarkdown
                  isWatchingMd={isWatchingMd}
                  toggleMarkdownWatchingState={
                    toggleMarkdownWatchigState
                  }
                />
              </EditorHeaderWrapper>
              <label
                className="sr-only"
                htmlFor="edit-comment"
              >
                댓글 입력란
              </label>
              <TextareaCommentEditor
                id="edit-comment"
                ref={commentEditorRef}
                spellCheck={false}
                placeholder="댓글을 입력해주세요. 댓글에서도 마크다운 문법을 사용할 수 있습니다. 변환 결과를 보려면 오른쪽 위 마크다운 아이콘을 클릭해주세요."
                hidden={isWatchingMd}
                value={commentContent}
                onChange={onCommentTextareaChange}
                required
              />
              {isWatchingMd && (
                <RenderedComment isForComment={true}>
                  {commentContent ?? ""}
                </RenderedComment>
              )}
              <EditButtonWrapper>
                <ButtonCommentSubmit
                  isDisabled={false}
                  type="button"
                  onClick={onCancleEditClick}
                >
                  취소
                </ButtonCommentSubmit>
                <ButtonCommentSubmit
                  isDisabled={isSubmitOngoing}
                >
                  {isSubmitOngoing ? (
                    <LoadingIndicator isForSmall={true} />
                  ) : (
                    "수정하기!"
                  )}
                </ButtonCommentSubmit>
              </EditButtonWrapper>
            </Form>
          )}
      </Wrapper>
    </>
  );
};

export default CommentCard;
