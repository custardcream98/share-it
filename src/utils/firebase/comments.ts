import {
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  doc,
} from "firebase/firestore";
import { Comment } from "interfaces";
import sendMail from "utils/fetch/sendMail";

import {
  commentCollectionRef,
  getProfileDocRef,
  postCollectionRef,
} from "./references";

type PropForCreatingComment = {
  postUserEmail: string;
  postTitle: string;
  commentData: Comment;
  authToken: string;
};
export const createComment = async ({
  postUserEmail,
  postTitle,
  commentData,
  authToken,
}: PropForCreatingComment) => {
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

    await sendMail({
      token: authToken,
      email: {
        receiver: postUserEmail,
        title: postTitle,
        postId: commentData.postId,
        commentContent: commentData.content,
        senderUsername: commentData.username,
      },
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

export const updateComment = async (
  commentId: string,
  commentContent: string
) => {
  try {
    const commentDocRef = doc(
      commentCollectionRef,
      commentId
    );

    await updateDoc(commentDocRef, {
      content: commentContent,
      editedAt: Date.now(),
    });

    return true;
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};
