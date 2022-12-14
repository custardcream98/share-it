import {
  useState,
  ChangeEvent,
  useRef,
  FormEvent,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import MarkdownRenderer from "components/common/MarkdownRenderer";
import {
  MOBILE_BREAK_POINT,
  navbarHeight,
} from "styles/styleConstants";
import { ROUTE_PATH } from "configs/router.config";
import useCreateContentMetaData from "hooks/useCreateContentMetaData";
import { Post, PostWithPostId } from "interfaces";
import { categories } from "configs/firebase.config";
import { cssCategoryBadgeNotColored } from "styles/css";
import {
  createPost,
  updatePost,
} from "utils/firebase/posts";
import textareaDefalutDescription from "./textareaDefalutDescription";
import LoadingIndicator from "../LoadingIndicator";
import { ButtonForDisableable } from "../Buttons/Button";
import ButtonGlanceMarkdown from "../Buttons/ButtonGlanceMarkdown";

const TextEditorWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    margin-top: 0px;
  }
`;

type StyleProps = {
  isWatchingMd: boolean;
};

const StyledRenderer = styled(MarkdownRenderer)<StyleProps>`
  width: calc(50% - 10px);
  height: calc(87vh - ${navbarHeight});
  overflow: auto;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    visibility: ${({ isWatchingMd }) =>
      isWatchingMd ? "visible" : "hidden"};
    width: ${({ isWatchingMd }) =>
      isWatchingMd ? "100%" : "0%"};
  }
`;

const cssInputBorder = css`
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const TextareaEditor = styled.textarea<StyleProps>`
  resize: none;

  width: calc(50% - 10px);
  height: calc(87vh - ${navbarHeight});

  padding: 10px;

  ${cssInputBorder}

  font-family: inherit;
  font-size: 1.1rem;
  line-height: 1.5;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    visibility: ${({ isWatchingMd }) =>
      isWatchingMd ? "hidden" : "visible"};
    width: ${({ isWatchingMd }) =>
      isWatchingMd ? "0%" : "100%"};
  }
`;

const ButtonGlanceMarkdownForEditor = styled(
  ButtonGlanceMarkdown
)`
  visibility: hidden;
  height: 0;
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    visibility: visible;
    height: 32px;
  }
`;

const InputTitle = styled.input`
  padding-left: 10px;
  margin-right: 10px;
  flex: 1;
  height: 2.5rem;

  font-weight: 600;
  font-size: 1.2rem;

  @media (max-width: 800px) {
    font-size: 1rem;
  }

  ${cssInputBorder}
`;

const InputTitleWrapper = styled.div`
  display: flex;
`;

const CheckboxWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 5px;

  padding-bottom: 13px;

  border-bottom: 2px solid
    ${({ theme }) => theme.borderColor};

  label {
    padding: 5px;
    padding-left: 27px;
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
  initialState = false,
}: {
  categoryKey: string;
  setCategoriesChecked: Dispatch<SetStateAction<string[]>>;
  initialState: boolean;
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [categoryString, iconUrl] = categories[categoryKey];

  const onCheckboxChange = () => {
    if (checkboxRef.current?.checked) {
      setCategoriesChecked((prev) =>
        prev.includes(categoryKey)
          ? prev
          : [categoryKey, ...prev]
      );
    } else {
      setCategoriesChecked((prev) =>
        prev.filter((key) => key !== categoryKey)
      );
    }
  };

  useLayoutEffect(() => {
    if (initialState && checkboxRef.current) {
      checkboxRef.current.checked = true;
      onCheckboxChange();
    }
  }, []);

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

type Props = {
  initialPostData?: PostWithPostId;
};
const PostEditor = ({ initialPostData }: Props) => {
  const navigate = useNavigate();
  const contentMetaData = useCreateContentMetaData();

  const [categoriesChecked, setCategoriesChecked] =
    useState<string[]>([]);
  const [content, setContent] = useState(
    initialPostData?.content ?? textareaDefalutDescription
  );
  const [isSubmitOngoing, setIsSubmitOngoing] =
    useState(false);
  const [isWatchingMd, setIsWatchingMd] = useState(false);

  const inputTitleRef = useRef<HTMLInputElement>(null);

  const toggleMarkdownWatchigState = () =>
    setIsWatchingMd((prev) => !prev);

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
      isSubmitOngoing
    ) {
      return;
    }

    setIsSubmitOngoing(true);

    let result;
    if (!initialPostData) {
      const postData: Post = {
        title: inputTitleRef.current.value,
        category: categoriesChecked,
        likes: [],
        comments: [],
        content,
        ...contentMetaData,
      };
      result = await createPost(postData);
    } else {
      result = await updatePost({
        title: inputTitleRef.current.value,
        content,
        category: categoriesChecked,
        postId: initialPostData.postId,
      });
    }

    if (result) {
      navigate(ROUTE_PATH.HOME, { replace: true });
    }
  };

  useLayoutEffect(() => {
    if (initialPostData && inputTitleRef.current) {
      inputTitleRef.current.value = initialPostData.title;
    }
  }, []);

  return (
    <form onSubmit={onFormSubmit}>
      <label className="sr-only" htmlFor="title">
        ?????? ?????????
      </label>
      <InputTitleWrapper>
        <InputTitle
          id="title"
          ref={inputTitleRef}
          type="text"
          placeholder="????????? ??????????????????."
          required
        />
        <ButtonForDisableable isDisabled={isSubmitOngoing}>
          {isSubmitOngoing ? (
            <LoadingIndicator isForSmall={true} />
          ) : initialPostData ? (
            "????????????"
          ) : (
            "?????????"
          )}
        </ButtonForDisableable>
      </InputTitleWrapper>
      <CheckboxWrapper>
        {Object.keys(categories).map((categoryKey) => (
          <CheckboxCategory
            key={categoryKey}
            categoryKey={categoryKey}
            setCategoriesChecked={setCategoriesChecked}
            initialState={
              !!(
                initialPostData &&
                initialPostData.category.includes(
                  categoryKey
                )
              )
            }
          />
        ))}
      </CheckboxWrapper>
      <ButtonGlanceMarkdownForEditor
        isWatchingMd={isWatchingMd}
        toggleMarkdownWatchingState={
          toggleMarkdownWatchigState
        }
      />
      <TextEditorWrapper>
        <label className="sr-only" htmlFor="editor">
          ?????? ?????????
        </label>
        <TextareaEditor
          id="editor"
          spellCheck={false}
          onChange={onEditorChange}
          placeholder="????????? ??????????????????."
          value={content}
          isWatchingMd={isWatchingMd}
        />
        <StyledRenderer isWatchingMd={isWatchingMd}>
          {content}
        </StyledRenderer>
      </TextEditorWrapper>
    </form>
  );
};
export default PostEditor;
