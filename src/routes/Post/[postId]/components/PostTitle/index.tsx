import styled from "styled-components";
import {
  generatePath,
  useNavigate,
} from "react-router-dom";

import StyledLink from "components/common/StyledLink";
import PostCard from "components/common/PostsList/PostCard";

import useCurrentUser from "hooks/useCurrentUser";
import { deletePost } from "utils/firebase/posts";
import { ROUTE_PATH } from "configs/router.config";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";
import { PostWithPostId } from "interfaces";

const Wrapper = styled.header`
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid
    ${(props) => props.theme.borderColor};
`;

const EditNav = styled.nav`
  margin-bottom: 10px;
  text-align: right;
  > button + a {
    margin-left: 15px;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-bottom: 5px;
  }
`;

type Props = {
  post: PostWithPostId;
};

const PostTitle = ({ post }: Props) => {
  const { uid } = useCurrentUser(false);
  const navigate = useNavigate();

  const onDeletePostClick = async () => {
    if (uid !== post.uid) {
      throw Error("잘못된 접근입니다.");
    }

    await deletePost(post.postId);
    navigate(ROUTE_PATH.HOME);
  };

  return (
    <Wrapper>
      {uid === post.uid && (
        <EditNav>
          <StyledLink
            as="button"
            type="button"
            onClick={onDeletePostClick}
          >
            삭제하기
          </StyledLink>
          <StyledLink
            to={generatePath(
              `/${ROUTE_PATH.POST}/${ROUTE_PATH.EDIT}?postId=:postId`,
              { postId: post.postId }
            )}
          >
            수정하기
          </StyledLink>
        </EditNav>
      )}
      <PostCard post={post} isForPostByIdPage={true} />
    </Wrapper>
  );
};

export default PostTitle;
