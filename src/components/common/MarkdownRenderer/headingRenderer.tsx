import { CodeProps } from "react-markdown/lib/ast-to-react";

const headingRenderer = ({
  className,
  children,
  node,
}: CodeProps) => {
  const match = /h(\d+)/.exec(node.tagName || "");

  if (match) {
    return (
      <strong
        className={`strong-h${match[1]} ${className ?? ""}`}
      >
        {children}
      </strong>
    );
  }

  throw Error(
    "headingRenderer에는 Heading 요소만 올 수 있습니다."
  );
};

export default headingRenderer;
