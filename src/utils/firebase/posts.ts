import { addDoc, deleteDoc, doc } from "firebase/firestore";

import { postCollectionRef } from "./references";
import { Post } from "interfaces";

export const createPost = async (postData: Post) => {
  try {
    return await addDoc(postCollectionRef, postData);
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const docRef = doc(postCollectionRef, postId);
    return await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};
