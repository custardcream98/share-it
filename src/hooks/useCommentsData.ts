import {
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Comment, CommentWithCommentId } from "interfaces";
import { useEffect, useState } from "react";
import { commentCollectionRef } from "utils/firebase/references";

export default (postId: string) => {
  const [comments, setComments] =
    useState<CommentWithCommentId[]>();

  useEffect(() => {
    return onSnapshot(
      query(
        commentCollectionRef,
        where("postId", "==", postId)
      ),
      (snapshot) => {
        const newComments = snapshot.docs
          .sort(
            (comment1, comment2) =>
              (comment1.data() as unknown as Comment)
                .createdAt -
              (comment2.data() as unknown as Comment)
                .createdAt
          )
          .map(
            (document) =>
              ({
                ...document.data(),
                commentId: document.id,
              } as unknown as CommentWithCommentId)
          );

        setComments(newComments);
      }
    );
  }, []);

  return comments;
};
