import { Link } from "react-router-dom";
import styled from "styled-components";

import { ROUTE_PATH } from "configs/router.config";
import usePostsSnapshot from "hooks/usePostsSnapshot";

import Button from "components/common/Button";
import LoadingIndicator from "components/common/LoadingIndicator";
import PostsList from "components/common/PostsList";

const ButtonCreatePost = styled(Button)`
  display: block;
  width: fit-content;
  margin-left: auto;
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
        <PostsList posts={posts} />
      </PostWrapper>
    </Wrapper>
  );
};

export default HomePage;
