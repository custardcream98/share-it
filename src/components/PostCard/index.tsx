import { Link } from "react-router-dom";
import styled from "styled-components";

import { PostWithPostId } from "interfaces";
import { ROUTE_PATH } from "configs/router.config";

import CategoryBadge from "components/common/CategoryBadge";
import Username from "components/common/Username";
import Counter from "components/common/Counter";

type PostCardLinkProps = {
  isLast: boolean;
};

const PostCardLink = styled(Link)<PostCardLinkProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;

  border-top: 1px solid
    ${(props) => props.theme.borderColor};

  ${(props) =>
    props.isLast
      ? `border-bottom: 1px solid ${props.theme.borderColor};`
      : ""}

  transition: all 0.2s ease;

  .title {
    display: block;
    font-weight: 600;
    font-size: 1.2rem;
  }

  :hover {
    background-color: ${(props) =>
      props.theme.accentColor}20;
  }
`;

const CategoryBadgeWrapper = styled.ul`
  display: inline-block;
`;

type Props = {
  post: PostWithPostId;
  isLast: boolean;
};

const PostCard = ({ post, isLast }: Props) => {
  return (
    <PostCardLink
      to={`${ROUTE_PATH.POST}/${post.postId}`}
      isLast={isLast}
    >
      <div>
        <strong className="title">{post.title}</strong>
        <Username
          username={post.username}
          profilePhotoURL={post.profilePhotoURL}
        />
        <CategoryBadgeWrapper>
          {post.category.map((cate) => (
            <CategoryBadge
              key={post.uid + post.createdAt + cate}
              categoryKey={cate}
            />
          ))}
        </CategoryBadgeWrapper>
      </div>
      <Counter
        createdAt={post.createdAt}
        likes={post.likes}
        commentsCount={post.comments.length}
      />
    </PostCardLink>
  );
};

export default PostCard;
