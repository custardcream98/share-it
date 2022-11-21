import ProfileTitle from "components/Profile/Title";
import usePostsSnapshot from "hooks/usePostsSnapshot";
import PostsList from "components/common/PostsList";
import LoadingIndicator from "components/common/LoadingIndicator";

const MyPostsPage = () => {
  const posts = usePostsSnapshot(true);

  if (!posts) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <ProfileTitle>내가 쓴 글</ProfileTitle>
      <PostsList posts={posts} />
    </>
  );
};

export default MyPostsPage;
