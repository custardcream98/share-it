import { Link } from "react-router-dom";
import styled from "styled-components";

import { ROUTE_PATH } from "configs/router.config";
import usePostsSnapshot from "hooks/usePostsSnapshot";

import Button from "components/common/Button";
import Pagination from "components/common/Pagination";
import PostCard from "components/PostCard";
import LoadingIndicator from "components/common/LoadingIndicator";

const ButtonCreatePost = styled(Button)`
  display: block;
  width: fit-content;
  margin-left: auto;
`;

const SectionPosts = styled.section`
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostWrapper = styled.div`
  flex: 1;
`;

const HomePage = () => {
  const posts = usePostsSnapshot();

  if (!posts) {
    return <LoadingIndicator />;
  }

  return (
    <Wrapper>
      <PostWrapper>
        <ButtonCreatePost
          as={Link}
          to={`${ROUTE_PATH.POST}/${ROUTE_PATH.NEWPOST}`}
        >
          글 작성하기
        </ButtonCreatePost>
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
        </SectionPosts>
      </PostWrapper>
      {/* TODO: 페이지네이션 구현 */}
      <Pagination />
    </Wrapper>
  );
};

export default HomePage;
