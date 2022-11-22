import { Link } from "react-router-dom";
import styled from "styled-components";

import PostCard from "./PostCard";

import { MOBILE_BREAK_POINT } from "styles/styleConstants";
import { ROUTE_PATH } from "configs/router.config";
import { PostWithPostId } from "interfaces";

const SectionPosts = styled.section`
  margin-top: 10px;
`;

type PostCardLinkProps = {
  isLastCard: boolean;
};
const PostCardLink = styled(Link)<PostCardLinkProps>`
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

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    padding: 12px;
  }
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
            <PostCardLink
              to={`/${ROUTE_PATH.POST}/${post.postId}`}
              isLastCard={i === posts.length - 1}
            >
              <PostCard post={post} />
            </PostCardLink>
          </li>
        ))}
      </ol>
      {/* TODO: 페이지네이션 구현 */}
    </SectionPosts>
  );
};

export default PostsList;
