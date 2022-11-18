import { fireAuth } from "configs/firebase.config";
import { ROUTE_PATH } from "configs/router.config";
import { PropsWithChildren } from "react";
import { useLocation, Navigate } from "react-router-dom";

const CheckAuth = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  if (!fireAuth.currentUser) {
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
