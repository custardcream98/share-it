import MarkdownRenderer from "components/common/MarkdownRenderer";
import {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  FormEvent,
} from "react";
import styled, { css } from "styled-components";
import { navbarHeight } from "styles/styleConstants";
import textareaDefalutDescription from "./textareaDefalutDescription";

import FoldedHandsEmojiImg from "imgs/folded-hands.png";
import WinkEmojiImg from "imgs/wink.png";
import StyledLink from "components/common/StyledLink";

const TextEditorWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const StyledRenderer = styled(MarkdownRenderer)`
  width: calc(50% - 10px);
  height: calc(87vh - ${navbarHeight});
  overflow: auto;
`;

const cssInputBorder = css`
  border-radius: 10px;
  border: 1px solid rgb(204, 204, 204);
`;

const TextareaEditor = styled.textarea`
  resize: none;

  width: calc(50% - 10px);
  height: calc(87vh - ${navbarHeight});

  padding: 10px;

  ${cssInputBorder}

  font-family: inherit;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const InputTitle = styled.input`
  padding-left: 10px;
  margin-right: 10px;
  flex: 1;
  height: 2.5rem;

  font-weight: 600;
  font-size: 1.2rem;

  ${cssInputBorder}
`;

const InputTitleWrapper = styled.div`
  display: flex;
`;

const RadioWrapper = styled.div`
  margin: 15px 0 15px auto;
  width: fit-content;

  label {
    padding: 5px;
    padding-left: 27px;
    margin-left: 10px;
    border-radius: 10px;
    transition: ease 0.15s;
  }
  input:checked + label {
    background-color: ${(props) => props.theme.accentColor};
    color: #fff;
  }

  .lab-request-review {
    background: url(${FoldedHandsEmojiImg}) no-repeat 6px
      center/18px 18px;
  }
  .lab-provide-help {
    background: url(${WinkEmojiImg}) no-repeat 6px
      center/18px 18px;
  }
`;

const PostNewPage = () => {
  const [content, setContent] = useState(
    textareaDefalutDescription
  );
  const textareaEditorRef =
    useRef<HTMLTextAreaElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const [
    isRequestReviewChecked,
    setIsRequestReviewChecked,
  ] = useState(false);

  const onEditorChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const onFormSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (textareaEditorRef.current) {
      textareaEditorRef.current.value =
        textareaDefalutDescription;
    }
  }, []);

  return (
    <form onSubmit={onFormSubmit}>
      <label className="sr-only" htmlFor="title">
        제목 입력란
      </label>
      <InputTitleWrapper>
        <InputTitle
          id="title"
          ref={inputTitleRef}
          type="text"
          min="1"
          placeholder="제목을 입력해주세요."
        />
        <StyledLink as="button">글 올리기</StyledLink>
      </InputTitleWrapper>
      <RadioWrapper>
        <input
          className="sr-only"
          type="radio"
          name="postType"
          id="request-review"
          onChange={() => setIsRequestReviewChecked(true)}
        />
        <label
          className="lab-request-review"
          htmlFor="request-review"
        >
          리뷰해주세요
        </label>
        <input
          className="sr-only"
          type="radio"
          name="postType"
          id="provide-help"
          checked
          onChange={() => setIsRequestReviewChecked(false)}
        />
        <label
          className="lab-provide-help"
          htmlFor="provide-help"
        >
          참고하세요
        </label>
      </RadioWrapper>
      <TextEditorWrapper>
        <label className="sr-only" htmlFor="editor">
          내용 입력란
        </label>
        <TextareaEditor
          id="editor"
          ref={textareaEditorRef}
          spellCheck={false}
          onChange={onEditorChange}
          placeholder="내용을 입력해주세요."
        />
        <StyledRenderer>{content}</StyledRenderer>
      </TextEditorWrapper>
    </form>
  );
};

export default PostNewPage;
