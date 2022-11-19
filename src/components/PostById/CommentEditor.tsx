import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { User } from "firebase/auth";

import MarkdownOutlineImg from "imgs/markdown-outline.svg";
import MarkdownFillImg from "imgs/markdown-fill.svg";

import Username from "components/common/Username";
import { ROUTE_PATH } from "configs/router.config";
import { ButtonForDisableable } from "components/common/Button";
import MarkdownRenderer from "components/common/MarkdownRenderer";
import useCreateContentMetaData from "hooks/useCreateContentMetaData";
import LoadingIndicator from "components/common/LoadingIndicator";
import { Comment } from "interfaces";
import { createComment } from "utils/firebase/comments";

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

const ButtonCommentEditorOpener = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 17px;
  border-radius: 10px;
`;

const ButtonCommentSubmit = styled(ButtonForDisableable)`
  display: block;
  padding: 10px 13px;
  margin-left: auto;
  :hover {
    scale: 1.05;
  }
  ${({ isDisabled }) =>
    isDisabled && "pointer-events: none;"}
`;

type ButtonGlanceMarkdownProps = {
  isWatchingMd: boolean;
};
const ButtonGlanceMarkdown = styled.button<ButtonGlanceMarkdownProps>`
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

type Props = {
  currentUser:
    | User
    | {
        uid: string;
      };
  postId: string;
};

const CommentEditor = ({ currentUser, postId }: Props) => {
  const navigate = useNavigate();

  const [isCommentEditorOpened, setIsCommentEditorOpened] =
    useState(false);
  const [isWatchingMd, setIsWatchingMd] = useState(false);
  const [commentContent, setCommentContent] =
    useState<string>("");
  const [isSubmitOngoing, setIsSubmitOngoing] =
    useState(false);
  const commentEditorRef =
    useRef<HTMLTextAreaElement>(null);

  const contentMetaData = useCreateContentMetaData();

  const onCommentEditorOpenerClick = () => {
    if (currentUser.uid !== "anon") {
      setIsCommentEditorOpened(true);
      return;
    }

    navigate(ROUTE_PATH.HOME, { replace: true });
  };
  const focusToCommentEditor = () =>
    isWatchingMd && commentEditorRef.current?.focus();
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

    const commentData: Comment = {
      content: commentContent,
      postId,
      ...contentMetaData,
    };

    const result = await createComment(commentData);

    if (result) {
      setCommentContent("");
      setIsWatchingMd(false);
    }

    setIsSubmitOngoing(false);
  };

  useEffect(() => {
    if (isCommentEditorOpened) {
      focusToCommentEditor();
    }
  }, [isCommentEditorOpened]);

  return (
    <>
      <Form
        hidden={!isCommentEditorOpened}
        onClick={focusToCommentEditor}
        onSubmit={onFormSubmit}
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
            type="button"
            onClick={toggleMarkdownWatchigState}
          >
            <span className="sr-only">
              마크다운 변환 결과{" "}
              {isWatchingMd ? "닫기" : "보기"}
            </span>
          </ButtonGlanceMarkdown>
        </EditorHeaderWrapper>
        <label className="sr-only" htmlFor="comment">
          댓글 입력란
        </label>
        <TextareaCommentEditor
          id="comment"
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
        <ButtonCommentSubmit isDisabled={isSubmitOngoing}>
          {isSubmitOngoing ? (
            <LoadingIndicator isForSmall={true} />
          ) : (
            "등록하기!"
          )}
        </ButtonCommentSubmit>
      </Form>
      <ButtonCommentEditorOpener
        type="button"
        onClick={onCommentEditorOpenerClick}
        hidden={isCommentEditorOpened}
      >
        댓글을 입력해주세요
      </ButtonCommentEditorOpener>
    </>
  );
};

export default CommentEditor;
