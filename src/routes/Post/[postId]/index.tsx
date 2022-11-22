import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

import usePostData from "hooks/usePostData";
import MarkdownRenderer from "components/common/MarkdownRenderer";
import PostTitle from "routes/Post/[postId]/components/PostTitle";
import PostComments from "routes/Post/[postId]/components/PostComments";
import LoadingIndicator from "components/common/LoadingIndicator";

import "styles/D2Coding.css";

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
          post={{
            ...postData,
            postId,
          }}
        />
        <MarkdownRenderer>
          {postData.content}
        </MarkdownRenderer>
      </section>
      <PostComments
        postId={postId}
        postUserEmail={postData.email}
        postTitle={postData.title}
      />
    </>
  );
};

export default PostByPostIdPage;
