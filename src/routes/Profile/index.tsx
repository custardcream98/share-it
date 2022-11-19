import Button from "components/common/Button";
import { fireAuth } from "configs/firebase.config";
import { ROUTE_PATH } from "configs/router.config";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const onLogoutClick = async () => {
    await fireAuth.signOut();
    navigate(ROUTE_PATH.HOME, { replace: true });
  };
  return <Button onClick={onLogoutClick}>로그아웃</Button>;
};

const ProfilePage = () => {
  return <LogoutButton />;
};

export default ProfilePage;
