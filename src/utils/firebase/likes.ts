import {
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

import {
  getProfileDocRef,
  postCollectionRef,
} from "./references";
import useCurrentUser from "hooks/useCurrentUser";
import { Profile } from "interfaces";

export const toggleLike = async (
  postId: string,
  likes: string[]
) => {
  try {
    const { uid } = useCurrentUser(true);

    const postDocRef = doc(postCollectionRef, postId);

    await updateDoc(postDocRef, {
      likes: likes.includes(uid)
        ? arrayRemove(uid)
        : arrayUnion(uid),
    });

    const profileDocRef = getProfileDocRef();
    const { likes: profileLikes } = (
      await getDoc(profileDocRef)
    ).data() as unknown as Profile;

    await updateDoc(profileDocRef, {
      likes: profileLikes.includes(postId)
        ? arrayRemove(postId)
        : arrayUnion(postId),
    });

    return;
  } catch (error) {
    console.log(error);
    alert("에러가 발생했습니다!\n" + error);
    return false;
  }
};
