import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import FoldedHandsEmojiImg from "public/imgs/folded-hands.png";
import WinkEmojiImg from "public/imgs/wink.png";
import PersonRaisingHandImg from "public/imgs/person-raising-hand.png";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);

export const firestore = getFirestore();
export const fireAuth = getAuth();

export enum COLLECTION_NAME {
  POSTS = "posts",
  PROFILE = "profile",
  COMMENTS = "comments",
}

export const categories: {
  [key: string]: [name: string, iconUrl: string];
} = {
  rv: ["리뷰해주세요", FoldedHandsEmojiImg],
  ad: ["참고하세요", WinkEmojiImg],
  qu: ["질문있어요", PersonRaisingHandImg],
};
