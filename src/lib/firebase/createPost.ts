import { addDoc, collection } from "firebase/firestore";

import {
  COLLECTION_NAME,
  firestore,
  Post,
} from "configs/firebase.config";

export default async (postData: Post) => {
  const postCollectionRef = collection(
    firestore,
    COLLECTION_NAME.POSTS
  );

  try {
    return await addDoc(postCollectionRef, postData);
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};
