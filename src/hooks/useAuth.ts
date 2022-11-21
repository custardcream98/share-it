import { fireAuth } from "configs/firebase.config";
import { useLayoutEffect, useState } from "react";
import { Auth } from "firebase/auth";

export default () => {
  const [auth, setAuth] = useState<Auth | null>(null);

  useLayoutEffect(() => {
    const unsubscribeAuthStateListner =
      fireAuth.onAuthStateChanged((user) => {
        if (user) setAuth(fireAuth);
        else setAuth(null);
      });

    if (fireAuth.currentUser) {
      setAuth(fireAuth);
    }

    return unsubscribeAuthStateListner;
  }, []);

  return auth;
};
