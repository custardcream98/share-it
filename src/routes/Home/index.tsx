import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "components/common/Button";
import { ROUTE_PATH } from "configs/router.config";
import usePostsSnapshot from "hooks/usePostsSnapshot";
import getDateStringFromTimestamp from "utils/getDateStringFromTimestamp";

import ThumbsUpIconImg from "imgs/thumbs-up-icon.svg";
import CommentIconImg from "imgs/comment-icon.svg";
import Pagination from "components/common/Pagination";
import CategoryBadge from "components/common/CategoryBadge";

const ButtonCreatePost = styled(Button)`
  display: block;
  width: fit-content;
  margin-left: auto;
`;

const SectionPosts = styled.section`
  margin-top: 10px;
`;

type PostCardProps = {
  isLast: boolean;
};

const PostCard = styled(Link)<PostCardProps>`
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
    font-weight: 600;
    font-size: 1.2rem;
  }

  .postcard-info-wrapper {
    text-align: right;
  }
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

  :hover {
    background-color: ${(props) =>
      props.theme.accentColor}20;
  }
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

  return (
    <Wrapper>
      <PostWrapper>
        <ButtonCreatePost as={Link} to={"/post/new"}>
          글 작성하기
        </ButtonCreatePost>
        <SectionPosts>
          <h2 className="sr-only">포스트 리스트</h2>
          <ol>
            {posts.map((post, i) => (
              <li key={post.uid + post.createdAt}>
                <PostCard
                  to={ROUTE_PATH.HOME}
                  isLast={i === posts.length - 1}
                >
                  <div>
                    <strong className="title">
                      {post.title}
                    </strong>
                    <ul>
                      {post.category.map((cate) => (
                        <CategoryBadge
                          key={
                            post.uid + post.createdAt + cate
                          }
                          categoryKey={cate}
                        />
                      ))}
                    </ul>
                  </div>
                  <div className="postcard-info-wrapper">
                    <span className="date">
                      {getDateStringFromTimestamp(
                        post.createdAt
                      )}
                    </span>
                    <em className="like-count">
                      {post.likes.length}
                    </em>
                    <em className="comment-count">
                      {post.comments.length}
                    </em>
                  </div>
                </PostCard>
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
