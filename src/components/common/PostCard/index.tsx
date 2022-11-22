import { Link } from "react-router-dom";
import styled from "styled-components";

import { PostWithPostId } from "interfaces";
import { ROUTE_PATH } from "configs/router.config";

import Username from "components/common/Username";
import Counter from "components/common/Counter";
import CategoryBadges from "components/common/Badge/CategoryBadges";

type PostCardLinkProps = {
  isLastCard: boolean;
};

const PostCardLink = styled(Link)<PostCardLinkProps>`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  display: block;

  padding: 15px;

  border-top: 1px solid ${({ theme }) => theme.borderColor};

  ${(props) =>
    props.isLastCard
      ? `border-bottom: 1px solid ${props.theme.borderColor};`
      : ""}

  transition: all 0.2s ease;

  :hover {
    background-color: ${(props) =>
      props.theme.accentColor}20;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
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
  post: PostWithPostId;
  isLastCard: boolean;
};

const PostCard = ({ post, isLastCard }: Props) => {
  return (
    <PostCardLink
      to={`${ROUTE_PATH.POST}/${post.postId}`}
      isLastCard={isLastCard}
    >
      <Title>{post.title}</Title>
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
          isLikeClickable={false}
          postId={post.postId}
        />
      </PostInfoWrapper>
    </PostCardLink>
  );
};

export default PostCard;
