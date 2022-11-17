import MarkdownRenderer from "components/common/MarkdownRenderer";

const Home = () => {
  return (
    <MarkdownRenderer>{`A paragraph with *emphasis* and **strong importance**.

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
`}</MarkdownRenderer>
  );
};

export default Home;
