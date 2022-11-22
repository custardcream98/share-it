import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import styled from "styled-components";

import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import { MOBILE_BREAK_POINT } from "styles/styleConstants";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage(
  "typescript",
  typescript
);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage(
  "javascript",
  javascript
);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

const CodeblockCustomStyle = styled(SyntaxHighlighter)`
  font-size: 1rem !important;
  font-family: D2Coding, "D2 coding", monospace !important;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    font-size: 0.9rem;
  }
`;

const codeBlockHighlighter = ({
  inline,
  className,
  children,
  // eslint-disable-next-line
  style,
  ...props
}: CodeProps) => {
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <CodeblockCustomStyle
      style={materialLight}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </CodeblockCustomStyle>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default codeBlockHighlighter;
