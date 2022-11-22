import { PostWithPostId } from "interfaces";
import styled from "styled-components";
import PostCard from "../PostCard";

const SectionPosts = styled.section`
  margin-top: 10px;
`;

type Props = {
  posts: PostWithPostId[];
};
const PostsList = ({ posts }: Props) => {
  return (
    <SectionPosts>
      <h2 className="sr-only">포스트 리스트</h2>
      <ol>
        {posts.map((post, i) => (
          <li key={post.uid + post.createdAt}>
            <PostCard
              post={post}
              isLastCard={i === posts.length - 1}
            />
          </li>
        ))}
      </ol>
      {/* TODO: 페이지네이션 구현 */}
    </SectionPosts>
  );
};

export default PostsList;
