import { Link } from "react-router-dom";

import EditPage from "routes/Post/New";
import MarkdownRenderer from "components/common/MarkdownRenderer";

const HomePage = () => {
  return (
    <>
      <Link to={"/post/new"}>글 작성하기</Link>
      {/* <MarkdownRenderer>{`A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
~~~typescript
const app = "hello";
const root = createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
~~~

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
|ㅎㅎㅎ|ㅎㅎㅎ|
~~~typescript
const app = "hello";
const root = createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
~~~

1. ㅇㄹㄴㅁㄹ
2. ㅇㅁㄴㄹㅁㄴㅇㄹ
3. ㅇㄴㅁㄹㅇㄴㄹ
`}</MarkdownRenderer> */}
    </>
  );
};

export default HomePage;
