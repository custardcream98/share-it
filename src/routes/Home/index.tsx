import { Link } from "react-router-dom";

const HomePage = () => {
  return <Link to={"/post/new"}>글 작성하기</Link>;
};

export default HomePage;
