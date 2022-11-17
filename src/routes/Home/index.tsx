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
`}</MarkdownRenderer>
  );
};

export default Home;
