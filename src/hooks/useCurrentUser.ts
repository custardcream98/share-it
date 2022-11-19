import { fireAuth } from "configs/firebase.config";

export default (shouldThrowError: boolean) => {
  const { currentUser } = fireAuth;

  if (!currentUser) {
    if (shouldThrowError) {
      throw Error("유저 정보를 찾을 수 없습니다.");
    }
    return { uid: "anon" };
  }

  return currentUser;
};
