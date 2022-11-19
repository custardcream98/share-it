import { Link } from "react-router-dom";
import styled from "styled-components";

import ThumbsUpIconImg from "imgs/thumbs-up-icon.svg";
import CommentIconImg from "imgs/comment-icon.svg";
import { ROUTE_PATH } from "configs/router.config";
import getDateStringFromTimestamp from "utils/getDateStringFromTimestamp";
import CategoryBadge from "components/common/CategoryBadge";
import { PostWithPostId } from "interfaces";
import Username from "components/common/Username";

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
const PostCardInfoWrapper = styled.div`
  text-align: right;

  .date {
    display: block;
    font-size: 0.8rem;
  }

  .like-count,
  .comment-count {
    width: fit-content;
    display: inline-block;
    margin-top: 7px;
    padding-left: 15px;
    font-size: 0.9rem;
  }
  .like-count {
    background: url(${ThumbsUpIconImg}) no-repeat left
      center/13px;
  }
  .comment-count {
    margin-left: 15px;
    background: url(${CommentIconImg}) no-repeat left
      center/13px;
  }
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
      <PostCardInfoWrapper>
        <span className="date">
          {getDateStringFromTimestamp(post.createdAt)}
        </span>

        <em className="like-count">{post.likes.length}</em>
        <em className="comment-count">
          {post.comments.length}
        </em>
      </PostCardInfoWrapper>
    </PostCardLink>
  );
};

export default PostCard;
