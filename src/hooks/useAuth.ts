import { fireAuth } from "configs/firebase.config";
import { useEffect, useState } from "react";
import { Auth } from "firebase/auth";

export default () => {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const unsubscribeAuthStateListner =
      fireAuth.onAuthStateChanged((user) => {
        if (user) setAuth(fireAuth);
      });

    if (fireAuth.currentUser) {
      setAuth(fireAuth);
    }

    return unsubscribeAuthStateListner;
  }, []);

  return auth;
};
