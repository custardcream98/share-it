import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { postCollectionRef } from "utils/firebase/references";
import { Post, PostWithPostId } from "interfaces";

export default (uid?: string) => {
  const [posts, setPosts] = useState<PostWithPostId[]>();

  useEffect(() => {
    return onSnapshot(
      uid
        ? query(postCollectionRef, where("uid", "==", uid))
        : postCollectionRef,
      (snapshot) => {
        const newPosts = snapshot.docs
          .sort(
            (post1, post2) =>
              (post2.data() as unknown as Post).createdAt -
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
  }, []);

  return posts;
};
