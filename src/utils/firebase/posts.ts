import {
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import {
  getProfileDocRef,
  postCollectionRef,
} from "./references";
import { Post } from "interfaces";

export const createPost = async (postData: Post) => {
  try {
    const createdDoc = await addDoc(
      postCollectionRef,
      postData
    );
    await updateDoc(getProfileDocRef(), {
      posts: arrayUnion(createdDoc.id),
    });
    return createdDoc;
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const postDocRef = doc(postCollectionRef, postId);
    await deleteDoc(postDocRef);
    await updateDoc(getProfileDocRef(), {
      posts: arrayRemove(postId),
    });
    return;
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};

export const updatePost = async ({
  title,
  content,
  category,
  postId,
}: {
  title: string;
  content: string;
  category: string[];
  postId: string;
}) => {
  try {
    const postDocRef = doc(postCollectionRef, postId);

    await updateDoc(postDocRef, {
      editedAt: Date.now(),
      title: title,
      content: content,
      category: category,
    });

    return true;
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};
