import { MouseEvent } from "react";
import styled from "styled-components";
import {
  generatePath,
  useNavigate,
} from "react-router-dom";

import Button from "components/common/Button";
import Counter from "components/common/Counter";
import Username from "components/common/Username";
import useCurrentUser from "hooks/useCurrentUser";
import { deletePost } from "utils/firebase/posts";
import { ROUTE_PATH } from "configs/router.config";
import CategoryBadges from "components/common/CategoryBadges";

const Wrapper = styled.header`
  position: relative;
  margin: 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid
    ${(props) => props.theme.borderColor};
`;

const EditButtonsWrapper = styled.div`
  position: absolute;

  right: 0;
  top: -20px;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ButtonEditPost = styled(Button)`
  margin-left: 10px;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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
      <Title>{title}</Title>
      <PostInfoWrapper>
        <div>
          <Username
            username={username}
            profilePhotoURL={profilePhotoURL}
            createdAt={createdAt}
            editedAt={editedAt}
          />
          <CategoryBadges
            categories={categories}
            postId={postId}
          />
        </div>
        <Counter
          commentsCount={commentsCount}
          likes={likes}
          isLikeClickable={true}
          postId={postId}
        />
      </PostInfoWrapper>
      {uid === authorUid && (
        <EditButtonsWrapper>
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
        </EditButtonsWrapper>
      )}
    </Wrapper>
  );
};

export default PostTitle;
