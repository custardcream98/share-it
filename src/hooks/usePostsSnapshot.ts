import { useLayoutEffect, useState } from "react";
import {
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { postCollectionRef } from "utils/firebase/references";
import { Post, PostWithPostId } from "interfaces";
import useAuth from "./useAuth";

export default (useUid?: boolean) => {
  const [posts, setPosts] = useState<PostWithPostId[]>();
  const auth = useAuth();

  useLayoutEffect(() => {
    if ((useUid && auth && auth.currentUser) || !useUid) {
      return onSnapshot(
        useUid && auth && auth.currentUser
          ? query(
              postCollectionRef,
              where("uid", "==", auth.currentUser.uid)
            )
          : postCollectionRef,
        (snapshot) => {
          const newPosts = snapshot.docs
            .sort(
              (post1, post2) =>
                (post2.data() as unknown as Post)
                  .createdAt -
                (post1.data() as unknown as Post).createdAt
            )
            .map(
              (document) =>
                ({
                  ...document.data(),
                  postId: document.id,
                } as unknown as PostWithPostId)
            );

          setPosts(newPosts);
        }
      );
    }
  }, [auth]);

  return posts;
};
