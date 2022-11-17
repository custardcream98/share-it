import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CodeProps } from "react-markdown/lib/ast-to-react";

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
    <SyntaxHighlighter
      style={materialLight}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default codeBlockHighlighter;
