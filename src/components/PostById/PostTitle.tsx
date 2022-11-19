import { MouseEvent } from "react";
import styled from "styled-components";

import Button from "components/common/Button";
import Counter from "components/common/Counter";
import Username from "components/common/Username";
import useCurrentUser from "hooks/useCurrentUser";
import { deletePost } from "utils/firebase/posts";
import {
  generatePath,
  useNavigate,
} from "react-router-dom";
import { ROUTE_PATH } from "configs/router.config";
import CategoryBadges from "components/common/CategoryBadges";

const Wrapper = styled.header`
  margin: 20px 0;
  padding-bottom: 25px;
  border-bottom: 2px solid
    ${(props) => props.theme.borderColor};
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
`;

const ButtonEditPost = styled(Button)`
  margin-left: 10px;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

  const onEditPostClick = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    if (uid !== authorUid) {
      throw Error("잘못된 접근입니다.");
    }

    const { name } = event.currentTarget;

    switch (name) {
      case "delete":
        await deletePost(postId);
        navigate(ROUTE_PATH.HOME);
        break;
      case "edit":
        navigate(
          generatePath(
            `/${ROUTE_PATH.POST}/${ROUTE_PATH.EDIT}?postId=:postId`,
            { postId }
          )
        );
        break;
    }
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        {uid === authorUid && (
          <div>
            <ButtonEditPost
              type="button"
              name="delete"
              onClick={onEditPostClick}
            >
              삭제하기
            </ButtonEditPost>
            <ButtonEditPost
              type="button"
              name="edit"
              onClick={onEditPostClick}
            >
              수정하기
            </ButtonEditPost>
          </div>
        )}
      </TitleWrapper>
      <PostInfoWrapper>
        <div>
          <Username
            username={username}
            profilePhotoURL={profilePhotoURL}
          />
          <CategoryBadges
            categories={categories}
            postId={postId}
          />
        </div>
        <Counter
          createdAt={createdAt}
          editedAt={editedAt}
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
