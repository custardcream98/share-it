import styled from "styled-components";

import { PostWithPostId } from "interfaces";

import Username from "components/common/Username";
import Counter from "components/common/Counter";
import CategoryBadges from "components/common/Badge/CategoryBadges";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";

const TitleForPostList = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 10px;

  white-space: nowrap;
  overflow: auto;
  text-overflow: ellipsis;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.9rem;
    margin-bottom: 7px;
  }
`;
const TitleForPostByIdPage = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 20px;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

const PostInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;

  > ul {
    flex: 1;
  }

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-top: 10px;
  }
`;

type Props = {
  post: PostWithPostId;
  isForPostByIdPage?: boolean;
};

const PostCard = ({
  post,
  isForPostByIdPage = false,
}: Props) => {
  return (
    <>
      {isForPostByIdPage ? (
        <TitleForPostByIdPage>
          {post.title}
        </TitleForPostByIdPage>
      ) : (
        <TitleForPostList>{post.title}</TitleForPostList>
      )}
      <Username
        username={post.username}
        profilePhotoURL={post.profilePhotoURL}
        createdAt={post.createdAt}
        editedAt={post.editedAt}
      />
      <PostInfoWrapper>
        <CategoryBadges
          categories={post.category}
          postId={post.postId}
        />
        <Counter
          commentsCount={post.comments.length}
          likes={post.likes}
          isLikeClickable={isForPostByIdPage}
          postId={post.postId}
        />
      </PostInfoWrapper>
    </>
  );
};

export default PostCard;
