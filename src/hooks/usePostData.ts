import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!postId) {
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
      }
    })();
  }, []);

  return postData;
};
