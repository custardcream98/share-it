import { css } from "styled-components";
import { cssLinkStyle } from "styles/css";

export default css`
  --main-font-size: 1.1rem;
  --main-heading-margin: 1rem;
  @media (max-width: 800px) {
    --main-font-size: 0.95rem;
  }

  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-size: var(--main-font-size);
  font-weight: 300;
  line-height: 1.5;
  word-wrap: break-word;

  transition: linear 0.3s;

  a {
    ${cssLinkStyle}
  }

  b,
  strong {
    font-weight: 700;
  }
  .strong-h1,
  .strong-h2,
  .strong-h3,
  .strong-h4,
  .strong-h5,
  .strong-h6 {
    font-weight: 700;
    line-height: 1.25;
    display: block;
  }
  .strong-h1 tt,
  .strong-h1 code,
  .strong-h2 tt,
  .strong-h2 code,
  .strong-h3 tt,
  .strong-h3 code,
  .strong-h4 tt,
  .strong-h4 code,
  .strong-h5 tt,
  .strong-h5 code,
  .strong-h6 tt,
  .strong-h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  /* Scroll Target Margin */

  .strong-h1:target,
  .strong-h2:target,
  .strong-h3:target,
  .strong-h4:target,
  .strong-h5:target,
  .strong-h6:target {
    scroll-margin-top: 60px;
  }

  .strong-h1 {
    margin: var(--main-heading-margin) 0 1rem 0;
    padding-bottom: 0.1em;
    font-size: calc(var(--main-font-size) * 2);
    border-bottom: 2px solid #b3b3b3;
  }
  .strong-h2 {
    margin-top: calc(var(--main-heading-margin) * 0.7);
    padding-bottom: 0.1em;
    font-size: calc(var(--main-font-size) * 1.6);
  }
  .strong-h3 {
    margin-top: calc(var(--main-heading-margin) * 0.5);
    padding-bottom: 0.1em;
    font-size: calc(var(--main-font-size) * 1.3);
  }
  .strong-h4 {
    margin-top: calc(var(--main-heading-margin) * 0.5);
    padding-bottom: 0.1em;
    font-size: calc(var(--main-font-size) * 1.15);
  }
  .strong-h5 {
    margin-top: calc(var(--main-heading-margin) * 0.5);
    padding-bottom: 0.1em;
    font-size: calc(var(--main-font-size) * 1.12);
  }
  .strong-h6 {
    margin-top: calc(var(--main-heading-margin) * 0.5);
    padding-bottom: 0.1em;
    font-size: calc(var(--main-font-size) * 1.1);
  }

  p {
    margin-bottom: calc(var(--main-heading-margin) * 0.5);
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

  ol,
  ul {
    margin-bottom: calc(var(--main-heading-margin));
  }

  ul > li,
  ol > li {
    position: relative;
    display: block;
    margin: calc(var(--main-heading-margin) * 0.05) 0;
    padding-left: 0.5rem;
  }

  ul > li {
    margin-left: 0.5rem;
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
