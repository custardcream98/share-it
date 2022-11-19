import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import usePostData from "hooks/usePostData";
import MarkdownRenderer from "components/common/MarkdownRenderer";
import PostTitle from "components/PostById/PostTitle";

const PostByPostIdPage = () => {
  const { postId } = useParams();
  const postData = usePostData(postId);

  if (!postId) {
    throw Error("잘못된 접근입니다.");
  }
  if (!postData) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <Helmet>
        <title>Share it! : {postData.title}</title>
      </Helmet>
      <section>
        <PostTitle
          title={postData.title}
          username={postData.username}
          createdAt={postData.createdAt}
          profilePhotoURL={postData.profilePhotoURL}
          commentsCount={postData.comments.length}
          likes={postData.comments}
          postId={postId}
          authorUid={postData.uid}
        />
        <MarkdownRenderer>
          {postData.content}
        </MarkdownRenderer>
      </section>
    </>
  );
};

export default PostByPostIdPage;
