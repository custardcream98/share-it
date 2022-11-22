import styled from "styled-components";

import LoadingIndicator from "components/common/LoadingIndicator";
import CommentEditor from "../Comment/CommentEditor";
import CommentCard from "routes/Post/[postId]/components/Comment/CommentCard";
import useCommentsData from "hooks/useCommentsData";
import useCurrentUser from "hooks/useCurrentUser";

import SpeechBalloonImg from "public/imgs/speech-balloon.png";
import "styles/D2Coding.css";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";

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
  const commentsData = useCommentsData(postId);
  const currentUser = useCurrentUser(false);

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
      />
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
