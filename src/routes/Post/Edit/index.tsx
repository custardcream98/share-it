import LoadingIndicator from "components/common/LoadingIndicator";
import PostEditor from "components/common/PostEditor";
import { ROUTE_PATH } from "configs/router.config";
import useCurrentUser from "hooks/useCurrentUser";
import usePostData from "hooks/usePostData";
import { useEffect } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const PostEditPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const postId = searchParams.get("postId");
  const { uid } = useCurrentUser(false);

  if (!postId || uid === "anon") {
    navigate(ROUTE_PATH.HOME, { replace: true });
    return <></>;
  }

  const postData = usePostData(postId);

  useEffect(() => {
    if (postData) {
      if (postData.uid !== uid) {
        navigate(ROUTE_PATH.HOME, { replace: true });
      }
    }
  }, [postData]);

  if (!postData) {
    return <LoadingIndicator />;
  }

  return (
    <PostEditor initialPostData={{ ...postData, postId }} />
  );
};

export default PostEditPage;
