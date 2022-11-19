import {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import MarkdownRenderer from "components/common/MarkdownRenderer";
import StyledLink from "components/common/StyledLink";
import textareaDefalutDescription from "./textareaDefalutDescription";
import { navbarHeight } from "styles/styleConstants";
import createPost from "utils/firebase/createPost";
import { ROUTE_PATH } from "configs/router.config";
import useCreateContentMetaData from "hooks/useCreateContentMetaData";
import { Post } from "interfaces";
import { categories } from "configs/firebase.config";
import { cssCategoryBadgeNotColored } from "styles/css";

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
  border: 1px solid ${(props) => props.theme.borderColor};
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

const CheckboxWrapper = styled.div`
  margin: 15px 0 15px auto;
  width: fit-content;

  label {
    padding: 5px;
    padding-left: 27px;
    margin-left: 10px;
    border-radius: 10px;
    transition: ease 0.15s;

    cursor: pointer;
  }
  input:checked + label {
    background-color: ${(props) => props.theme.accentColor};
    color: #fff;
  }
`;

const CheckboxLabel = styled.label`
  ${cssCategoryBadgeNotColored}
  transition: ease 0.15s;
`;

const CheckboxCategory = ({
  categoryKey,
  setCategoriesChecked,
}: {
  categoryKey: string;
  setCategoriesChecked: Dispatch<SetStateAction<string[]>>;
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [categoryString, iconUrl] = categories[categoryKey];

  const onCheckboxChange = () => {
    if (checkboxRef.current?.checked) {
      setCategoriesChecked((prev) => [
        categoryKey,
        ...prev,
      ]);
    } else {
      setCategoriesChecked((prev) =>
        prev.filter((key) => key !== categoryKey)
      );
    }
  };

  return (
    <>
      <input
        className="sr-only"
        type="checkbox"
        ref={checkboxRef}
        value={categoryKey}
        id={categoryKey}
        onChange={onCheckboxChange}
      />
      <CheckboxLabel
        htmlFor={categoryKey}
        iconUrl={iconUrl}
      >
        {categoryString}
      </CheckboxLabel>
    </>
  );
};

const PostNewPage = () => {
  const navigate = useNavigate();

  const contentMetaData = useCreateContentMetaData();

  const [categoriesChecked, setCategoriesChecked] =
    useState<string[]>([]);

  const [content, setContent] = useState(
    textareaDefalutDescription
  );
  const textareaEditorRef =
    useRef<HTMLTextAreaElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  const onEditorChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const onFormSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      !contentMetaData ||
      !inputTitleRef.current ||
      !inputTitleRef.current.value ||
      !textareaEditorRef.current
    ) {
      return;
    }

    const postData: Post = {
      title: inputTitleRef.current.value,
      category: categoriesChecked,
      likes: [],
      comments: [],
      content: textareaEditorRef.current.value,
      ...contentMetaData,
    };

    const result = await createPost(postData);

    if (result) {
      navigate(ROUTE_PATH.HOME);
    }
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
          placeholder="제목을 입력해주세요."
          required
        />
        <StyledLink as="button">글 올리기</StyledLink>
      </InputTitleWrapper>
      <CheckboxWrapper>
        {Object.keys(categories).map((categoryKey) => (
          <CheckboxCategory
            key={categoryKey}
            categoryKey={categoryKey}
            setCategoriesChecked={setCategoriesChecked}
          />
        ))}
      </CheckboxWrapper>
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