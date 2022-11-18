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
  comments: CommentId[];
  content: string;
}
export interface PostWithPostId extends Post {
  postId: string;
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
