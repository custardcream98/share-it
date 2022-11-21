import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { ROUTE_PATH } from "configs/router.config";
import {
  COLLECTION_NAME,
  firestore,
} from "configs/firebase.config";
import { Post } from "interfaces";

export default (postId: string | undefined) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<
    Post | undefined
  >();

  useLayoutEffect(() => {
    if (!postId) {
      console.log("없음");

      navigate(ROUTE_PATH.HOME, { replace: true });
      return;
    }

    (async () => {
      try {
        const postDocRef = doc(
          firestore,
          COLLECTION_NAME.POSTS,
          postId
        );
        const postDataSnap = await getDoc(postDocRef);

        const loadedDocData =
          postDataSnap.data() as unknown as Post;

        setPostData(loadedDocData);
      } catch (error) {
        console.log(error);
        alert("포스트를 찾을 수 없습니다.");
        navigate(ROUTE_PATH.HOME, { replace: true });
      }
    })();
  }, []);

  return postData;
};
