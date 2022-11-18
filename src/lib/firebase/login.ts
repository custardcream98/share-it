import {
  GithubAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

import {
  COLLECTION_NAME,
  fireAuth,
  firestore,
  Profile,
} from "configs/firebase.config";

const createProfileIfUserIsNew = async (user: User) => {
  const profileDocRef = doc(
    firestore,
    COLLECTION_NAME.PROFILE,
    user.uid
  );

  const profileSnap = await getDoc(profileDocRef);

  if (!profileSnap.exists()) {
    const newUserProfile: Profile = {
      posts: [],
      comments: [],
      likes: [],
    };

    await setDoc(
      doc(firestore, COLLECTION_NAME.PROFILE, user.uid),
      newUserProfile
    );
  }
};

export const loginGithubUser = async () => {
  const ghProvider = new GithubAuthProvider();
  try {
    const { user } = await signInWithPopup(
      fireAuth,
      ghProvider
    );

    createProfileIfUserIsNew(user);
  } catch (error) {
    console.log(error);
    return;
  }
};
