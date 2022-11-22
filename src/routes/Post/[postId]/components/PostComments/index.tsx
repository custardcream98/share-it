import styled from "styled-components";

import LoadingIndicator from "components/common/LoadingIndicator";
import CommentEditor from "../Comment/CommentEditor";
import CommentCard from "routes/Post/[postId]/components/Comment/CommentCard";
import useCommentsData from "hooks/useCommentsData";
import useCurrentUser from "hooks/useCurrentUser";

import SpeechBalloonImg from "public/imgs/speech-balloon.png";
import "styles/D2Coding.css";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "configs/router.config";

const Wrapper = styled.section`
  margin-top: 30px;
  border-top: 2px solid ${({ theme }) => theme.borderColor};

  h2 {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 25px;

    font-size: 1.3rem;
    font-weight: 600;

    background: url(${SpeechBalloonImg}) no-repeat left
      center/20px;

    @media (max-width: 800px) {
      font-size: 1rem;
      background-size: 18px;
      padding-left: 22px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }
`;

const ListComments = styled.ol`
  margin-top: 20px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-top: 15px;
  }
`;

const ButtonCommentEditorOpener = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 17px;
  border-radius: 10px;
  text-align: left;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    padding: 14px;
  }
`;

type Props = {
  postId: string;
  postUserEmail: string;
  postTitle: string;
};

const PostComments = ({
  postId,
  postUserEmail,
  postTitle,
}: Props) => {
  const navigate = useNavigate();
  const commentsData = useCommentsData(postId);
  const currentUser = useCurrentUser(false);

  const [isCommentEditorOpened, setIsCommentEditorOpened] =
    useState(false);

  const onCommentEditorOpenerClick = () => {
    if (currentUser.uid !== "anon") {
      setIsCommentEditorOpened(true);
      return;
    }

    alert("댓글을 남기려면 로그인해주세요.");
    navigate("/" + ROUTE_PATH.AUTH, { replace: true });
  };

  if (!commentsData) {
    return <LoadingIndicator isForSmall={true} />;
  }
  return (
    <Wrapper>
      <h2>댓글이 {commentsData.length}개 있어요</h2>
      <CommentEditor
        currentUser={currentUser}
        postId={postId}
        postUserEmail={postUserEmail}
        postTitle={postTitle}
        hidden={!isCommentEditorOpened}
        focused={isCommentEditorOpened}
      />
      <ButtonCommentEditorOpener
        type="button"
        onClick={onCommentEditorOpenerClick}
        hidden={isCommentEditorOpened}
      >
        댓글을 입력해주세요
      </ButtonCommentEditorOpener>
      {commentsData.length !== 0 && (
        <ListComments>
          {commentsData.map((commentData, i) => (
            <CommentCard
              key={commentData.commentId}
              commentData={commentData}
              isLastCard={i === commentsData.length - 1}
            />
          ))}
        </ListComments>
      )}
    </Wrapper>
  );
};

export default PostComments;
