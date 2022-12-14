import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { User } from "firebase/auth";

import Username from "components/common/Username";
import { ButtonForDisableable } from "components/common/Buttons/Button";
import MarkdownRenderer from "components/common/MarkdownRenderer";
import useCreateContentMetaData from "hooks/useCreateContentMetaData";
import LoadingIndicator from "components/common/LoadingIndicator";
import { Comment, CommentWithCommentId } from "interfaces";
import {
  createComment,
  updateComment,
} from "utils/firebase/comments";
import ButtonGlanceMarkdown from "components/common/Buttons/ButtonGlanceMarkdown";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";

const Form = styled.form`
  position: relative;

  width: 100%;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 10px;
`;
const EditorHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonCommentSubmit = styled(ButtonForDisableable)`
  display: inline-block;
  margin-left: 10px;

  :hover {
    scale: 1.05;
  }
  ${({ isDisabled }) =>
    isDisabled && "pointer-events: none;"}
`;

const TextareaCommentEditor = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: calc(100% - 5px);
  padding: 5px;

  font-size: 1.1rem;
  line-height: 1.4;
  font-family: "Pretendard";

  border: none;
  border-radius: 10px;
  resize: none;

  ::placeholder {
    line-height: 1.4;
    font-size: 1.1rem;
    font-family: "Pretendard";
    @media (max-width: ${MOBILE_BREAK_POINT}) {
      font-size: 0.95rem;
    }
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.95rem;
  }
`;
const RenderedComment = styled(MarkdownRenderer)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: 5px;

  overflow-y: auto;
`;

const FakeRender = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100px;
  margin-top: 5px;
  padding: 5px;

  font-size: 1.1rem;

  white-space: pre;

  color: transparent;
  background-color: transparent;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.95rem;
  }
`;

const CommentEditorTextareaWrapper = styled.div`
  position: relative;
`;

const EditButtonWrapper = styled.div`
  margin-left: auto;
  width: fit-content;
`;

type Props = {
  initialCommentData?: CommentWithCommentId;
  currentUser:
    | User
    | {
        uid: string;
      };
  postId: string;
  postUserEmail?: string;
  postTitle?: string;
  hidden?: boolean;
  focused?: boolean;
  onCancleEditClick?: () => void;
};

const CommentEditor = ({
  initialCommentData,
  currentUser,
  postId,
  postUserEmail,
  postTitle,
  hidden = false,
  focused = false,
  onCancleEditClick,
}: Props) => {
  const [isWatchingMd, setIsWatchingMd] = useState(false);
  const [commentContent, setCommentContent] =
    useState<string>(
      initialCommentData ? initialCommentData.content : ""
    );
  const [isSubmitOngoing, setIsSubmitOngoing] =
    useState(false);
  const commentEditorRef =
    useRef<HTMLTextAreaElement>(null);

  const contentMetaData = useCreateContentMetaData();

  const toggleMarkdownWatchigState = () =>
    setIsWatchingMd((prev) => !prev);
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

    if (
      !contentMetaData ||
      !commentContent ||
      isSubmitOngoing
    ) {
      return;
    }

    setIsSubmitOngoing(true);

    let result;
    if (!initialCommentData) {
      if (
        !postUserEmail ||
        !postTitle ||
        !contentMetaData
      ) {
        setCommentContent("");
        setIsWatchingMd(false);
        setIsSubmitOngoing(false);
        throw Error("CommentEditor ????????? ??????");
      }

      const commentData: Comment = {
        content: commentContent,
        postId,
        ...contentMetaData,
      };

      result = await createComment({
        postUserEmail,
        postTitle,
        commentData,
        authToken: await (currentUser as User).getIdToken(
          true
        ),
      });
    } else {
      if (!onCancleEditClick) {
        setCommentContent("");
        setIsWatchingMd(false);
        setIsSubmitOngoing(false);
        throw Error("CommentEditor ????????? ??????");
      }
      result = await updateComment(
        initialCommentData.commentId,
        commentContent
      );
      onCancleEditClick();
    }

    if (result) {
      setCommentContent("");
      setIsWatchingMd(false);
    }

    setIsSubmitOngoing(false);
  };

  const focusToCommentEditor = () =>
    commentEditorRef.current?.focus();

  useEffect(() => {
    if (focused) {
      focusToCommentEditor();
    }
  }, [focused]);

  return (
    <>
      <Form
        onClick={focusToCommentEditor}
        onSubmit={onFormSubmit}
        hidden={hidden}
      >
        <EditorHeaderWrapper>
          <Username
            // eslint-disable-next-line
            username={(currentUser as User).displayName!}
            profilePhotoURL={
              // eslint-disable-next-line
              (currentUser as User).photoURL!
            }
          />
          <ButtonGlanceMarkdown
            isWatchingMd={isWatchingMd}
            toggleMarkdownWatchingState={
              toggleMarkdownWatchigState
            }
          />
        </EditorHeaderWrapper>
        <label className="sr-only" htmlFor="comment">
          ?????? ?????????
        </label>
        <CommentEditorTextareaWrapper>
          <FakeRender>{commentContent}</FakeRender>
          <TextareaCommentEditor
            id="comment"
            ref={commentEditorRef}
            spellCheck={false}
            placeholder="????????? ??????????????????. ??????????????? ???????????? ????????? ????????? ??? ????????????. ?????? ????????? ????????? ????????? ??? ???????????? ???????????? ??????????????????."
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
        </CommentEditorTextareaWrapper>
        <EditButtonWrapper>
          {initialCommentData && onCancleEditClick && (
            <ButtonCommentSubmit
              type="button"
              isDisabled={false}
              onClick={(
                event: MouseEvent<HTMLButtonElement>
              ) => {
                onCancleEditClick();
                event.stopPropagation();
              }}
            >
              ??????
            </ButtonCommentSubmit>
          )}
          <ButtonCommentSubmit isDisabled={isSubmitOngoing}>
            {isSubmitOngoing ? (
              <LoadingIndicator isForSmall={true} />
            ) : (
              "????????????!"
            )}
          </ButtonCommentSubmit>
        </EditButtonWrapper>
      </Form>
    </>
  );
};

export default CommentEditor;
