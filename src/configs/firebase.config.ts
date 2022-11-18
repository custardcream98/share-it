import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
}

type Uid = string;
type Timestamp = number;
type URL = string;
type Username = string;

type PostId = string;
type CommentId = string;

export interface ContentMetaData {
  createdAt: Timestamp;
  editedAt: Timestamp;
  uid: Uid;
  profilePhotoURL: URL;
  username: Username;
}
export interface Likes {
  [uid: string]: number;
}
export interface Post extends ContentMetaData {
  title: string;
  category: string[];
  likes: Username[];
  content: string;
}
export interface Comment extends ContentMetaData {
  content: string;
  subcommentTo: CommentId;
}
export interface PostComment {
  [postId: PostId]: Comment[];
}
export interface Profile {
  posts: PostId[];
  comments: { postId: PostId; commentId: CommentId }[];
  likes: PostId[];
}
