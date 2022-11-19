import {
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  doc,
} from "firebase/firestore";
import { Comment } from "interfaces";

import {
  commentCollectionRef,
  getProfileDocRef,
  postCollectionRef,
} from "./references";

export const createComment = async (
  commentData: Comment
) => {
  try {
    const createdDoc = await addDoc(
      commentCollectionRef,
      commentData
    );

    const postDocRef = doc(
      postCollectionRef,
      commentData.postId
    );

    await updateDoc(getProfileDocRef(), {
      comments: arrayUnion(commentData.postId),
    });
    await updateDoc(postDocRef, {
      comments: arrayUnion(createdDoc.id),
    });

    return createdDoc;
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};

export const deleteComment = async (
  commentId: string,
  postId: string
) => {
  try {
    const commentDocRef = doc(
      commentCollectionRef,
      commentId
    );

    const postDocRef = doc(postCollectionRef, postId);

    await deleteDoc(commentDocRef);
    await updateDoc(getProfileDocRef(), {
      comments: arrayRemove(postId),
    });
    await updateDoc(postDocRef, {
      comments: arrayRemove(commentId),
    });

    return true;
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};
