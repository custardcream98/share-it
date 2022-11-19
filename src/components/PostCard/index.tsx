import { Link } from "react-router-dom";
import styled from "styled-components";

import { PostWithPostId } from "interfaces";
import { ROUTE_PATH } from "configs/router.config";

import Username from "components/common/Username";
import Counter from "components/common/Counter";
import CategoryBadges from "components/common/CategoryBadges";

type PostCardLinkProps = {
  islast: boolean;
};

const PostCardLink = styled(Link)<PostCardLinkProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;

  border-top: 1px solid
    ${(props) => props.theme.borderColor};

  ${(props) =>
    props.islast
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

type Props = {
  post: PostWithPostId;
  islast: boolean;
};

const PostCard = ({ post, islast }: Props) => {
  return (
    <PostCardLink
      to={`${ROUTE_PATH.POST}/${post.postId}`}
      islast={islast}
    >
      <div>
        <strong className="title">{post.title}</strong>
        <Username
          username={post.username}
          profilePhotoURL={post.profilePhotoURL}
        />
        {post.category.length !== 0 && (
          <CategoryBadges
            categories={post.category}
            postId={post.postId}
          />
        )}
      </div>
      <Counter
        createdAt={post.createdAt}
        editedAt={post.editedAt}
        likes={post.likes}
        commentsCount={post.comments.length}
      />
    </PostCardLink>
  );
};

export default PostCard;
