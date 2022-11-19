import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import usePostData from "hooks/usePostData";
import MarkdownRenderer from "components/common/MarkdownRenderer";
import PostTitle from "components/PostById/PostTitle";
import LoadingIndicator from "components/common/LoadingIndicator";
import PostComments from "components/PostById/PostComments";

const PostByPostIdPage = () => {
  const { postId } = useParams();
  const postData = usePostData(postId);

  if (!postId) {
    throw Error("잘못된 접근입니다.");
  }
  if (!postData) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Helmet>
        <title>Share it!: {postData.title}</title>
      </Helmet>
      <section>
        <PostTitle
          title={postData.title}
          username={postData.username}
          createdAt={postData.createdAt}
          editedAt={postData.editedAt}
          profilePhotoURL={postData.profilePhotoURL}
          categories={postData.category}
          commentsCount={postData.comments.length}
          likes={postData.likes}
          postId={postId}
          authorUid={postData.uid}
        />
        <MarkdownRenderer>
          {postData.content}
        </MarkdownRenderer>
      </section>
      <PostComments postId={postId} />
    </>
  );
};

export default PostByPostIdPage;
