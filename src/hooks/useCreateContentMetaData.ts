import { ContentMetaData } from "interfaces";
import useAuth from "./useAuth";

/**
 * PostNewPage 등 새로운 컨텐트를 올릴 때 사용하는 훅
 *
 * 유저의 정보를 가져옵니다.
 */
export default (): ContentMetaData | undefined => {
  const auth = useAuth();

  if (auth && auth.currentUser) {
    const now = Date.now();
    return {
      createdAt: now,
      editedAt: now,
      profilePhotoURL: auth.currentUser.photoURL ?? "",
      uid: auth.currentUser.uid,
      username:
        auth.currentUser.displayName ??
        auth.currentUser.email ??
        "알 수 없는 사용자",
      email: auth.currentUser.email ?? "none",
    };
  }
};
