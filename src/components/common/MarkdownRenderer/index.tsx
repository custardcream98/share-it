import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import codeBlockHighlighter from "./codeBlockHighlighter";
import cssMarkdown from "./cssMarkdown";
import headingRenderer from "./headingRenderer";

const StyledMarkdown = styled(ReactMarkdown)`
  ${cssMarkdown}
`;

type Props = {
  children: string;
  className?: string;
};

const MarkdownRenderer = ({
  children,
  className,
}: Props) => {
  return (
    <StyledMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      components={{
        code: codeBlockHighlighter,
        h1: headingRenderer,
        h2: headingRenderer,
        h3: headingRenderer,
        h4: headingRenderer,
        h5: headingRenderer,
        h6: headingRenderer,
      }}
    >
      {children}
    </StyledMarkdown>
  );
};

export default MarkdownRenderer;
