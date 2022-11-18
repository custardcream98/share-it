import { addDoc } from "firebase/firestore";

import { postCollectionRef } from "./references";
import { Post } from "interfaces";

export default async (postData: Post) => {
  try {
    return await addDoc(postCollectionRef, postData);
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};
