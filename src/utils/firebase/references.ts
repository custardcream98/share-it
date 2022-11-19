import { collection, doc } from "firebase/firestore";

import {
  COLLECTION_NAME,
  firestore,
} from "configs/firebase.config";
import useCurrentUser from "hooks/useCurrentUser";

export const postCollectionRef = collection(
  firestore,
  COLLECTION_NAME.POSTS
);

export const commentCollectionRef = collection(
  firestore,
  COLLECTION_NAME.COMMENTS
);

export const getProfileDocRef = () => {
  const { uid } = useCurrentUser(true);

  return doc(firestore, COLLECTION_NAME.PROFILE, uid);
};
