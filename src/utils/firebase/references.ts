import { collection } from "firebase/firestore";

import {
  COLLECTION_NAME,
  firestore,
} from "configs/firebase.config";

export const postCollectionRef = collection(
  firestore,
  COLLECTION_NAME.POSTS
);
