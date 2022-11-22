import styled from "styled-components";
import {
  generatePath,
  useNavigate,
} from "react-router-dom";

import Counter from "components/common/Counter";
import Username from "components/common/Username";
import useCurrentUser from "hooks/useCurrentUser";
import { deletePost } from "utils/firebase/posts";
import { ROUTE_PATH } from "configs/router.config";
import CategoryBadges from "components/common/Badge/CategoryBadges";
import StyledLink from "components/common/StyledLink";

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
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 10px;

    > ul + div {
      align-self: flex-end;
    }
  }
`;

type Props = {
  title: string;
  createdAt: number;
  editedAt: number;
  username: string;
  profilePhotoURL: string;
  categories: string[];
  commentsCount: number;
  likes: string[];
  postId: string;
  authorUid: string;
};

const PostTitle = ({
  title,
  createdAt,
  editedAt,
  username,
  profilePhotoURL,
  categories,
  commentsCount,
  likes,
  postId,
  authorUid,
}: Props) => {
  const { uid } = useCurrentUser(false);
  const navigate = useNavigate();

  const onDeletePostClick = async () => {
    if (uid !== authorUid) {
      throw Error("잘못된 접근입니다.");
    }

    await deletePost(postId);
    navigate(ROUTE_PATH.HOME);
  };

  return (
    <Wrapper>
      {uid === authorUid && (
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
              { postId }
            )}
          >
            수정하기
          </StyledLink>
        </EditNav>
      )}
      <Title>{title}</Title>
      <Username
        username={username}
        profilePhotoURL={profilePhotoURL}
        createdAt={createdAt}
        editedAt={editedAt}
      />
      <PostInfoWrapper>
        <CategoryBadges
          categories={categories}
          postId={postId}
        />
        <Counter
          commentsCount={commentsCount}
          likes={likes}
          isLikeClickable={true}
          postId={postId}
        />
      </PostInfoWrapper>
    </Wrapper>
  );
};

export default PostTitle;
