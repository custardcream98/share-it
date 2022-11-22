import { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { ROUTE_PATH } from "configs/router.config";
import useCurrentUser from "hooks/useCurrentUser";

const CheckAuth = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { uid } = useCurrentUser(false);

  if (uid === "anon") {
    return (
      <Navigate
        to={"/" + ROUTE_PATH.AUTH}
        state={{ from: location }}
        replace
      />
    );
  }
  return <>{children}</>;
};

export default CheckAuth;
