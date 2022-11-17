import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import { linkStyle } from "../StyledLink";
import codeBlockHighlighter from "./codeBlockHighlighter";

const StyledMarkdown = styled(ReactMarkdown)`
  --main-font-size: 1.1rem;
  --main-heading-margin: 4rem;
  @media (max-width: 800px) {
    --main-font-size: 0.95rem;
  }

  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  width: 100%;
  margin-top: 2rem;
  font-size: var(--main-font-size);
  font-weight: 300;
  line-height: 1.8;
  word-wrap: break-word;

  transition: linear 0.3s;

  a {
    ${linkStyle}
  }

  b,
  strong {
    font-weight: 700;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: 1.25;
    display: block;
  }
  h1 tt,
  h1 code,
  h2 tt,
  h2 code,
  h3 tt,
  h3 code,
  h4 tt,
  h4 code,
  h5 tt,
  h5 code,
  h6 tt,
  h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  /* Scroll Target Margin */

  h1:target,
  h2:target,
  h3:target,
  h4:target,
  h5:target,
  h6:target {
    scroll-margin-top: 60px;
  }

  /* 
    Semantic한 HTML을 위해 h1, h2는 쓰지 않고
    h3부터만 사용합니다.
  */

  h3 {
    margin: var(--main-heading-margin) 0 1rem 0;
    padding-bottom: 0.3em;
    font-size: calc(var(--main-font-size) * 2);
    border-bottom: 1px solid #21262d;
  }
  h4 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    padding-bottom: 0.3em;
    font-size: calc(var(--main-font-size) * 1.6);
    border-bottom: 1px solid #21262d;
  }
  h5 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    font-size: calc(var(--main-font-size) * 1.3);
  }
  h6 {
    margin: calc(var(--main-heading-margin) * 0.5) 0 1rem 0;
    font-size: calc(var(--main-font-size) * 1.2);
  }

  p {
    margin-bottom: calc(var(--main-heading-margin) * 0.23);
  }

  code,
  tt {
    font-family: "D2Coding";
    padding: 0 0.4em;
    margin: 0;
    font-size: 0.85em;
    vertical-align: 0.0725em;
    color: rgb(203, 155, 34);
  }

  img {
    max-width: 100%;
    image-resolution: from-image;
    display: block;
    margin: auto;
  }

  ol {
    counter-reset: item;
  }

  & > ol,
  & > ul {
    margin-bottom: calc(var(--main-heading-margin) * 0.23);
  }

  ul > li,
  ol > li {
    position: relative;
    display: block;
    margin: calc(var(--main-heading-margin) * 0.05) 0;
    padding-left: 1rem;
  }

  ul > li {
    margin-left: 1.5rem;
    padding-left: 1.3rem;
  }

  ul > li > ul > li {
    margin-left: 0.3rem;
  }

  ul > li::before {
    content: " ";
    position: absolute;
    left: 0rem;
    top: 0.8rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.textColor};
  }

  ol > li::before {
    content: counters(item, ".") ".";
    font-weight: 500;
    margin: 0 0.4rem 0.2rem 0.3rem;
    counter-increment: item;
  }

  hr {
    margin: 2rem 0;
  }

  em {
    font-style: italic;
  }

  table {
    margin: auto;
    max-width: 600px;
    border-top: 1px solid rgb(203, 155, 34);
    border-bottom: 1px solid rgb(203, 155, 34);
    th,
    td {
      padding: 0.2rem 3rem;
      @media (max-width: 800px) {
        padding: 0.2rem 0.8rem;
      }
    }
    thead {
      background-color: #ffd45290;
      font-weight: 500;
      th {
        text-align: center;
      }
    }
    tbody {
      td {
        text-align: start;
        padding-left: 0.5rem;
      }
    }
  }
`;

type Props = {
  children: string;
};

const MarkdownRenderer = ({ children }: Props) => {
  return (
    <StyledMarkdown
      remarkPlugins={[remarkGfm]}
      components={{ code: codeBlockHighlighter }}
    >
      {children}
    </StyledMarkdown>
  );
};

export default MarkdownRenderer;
