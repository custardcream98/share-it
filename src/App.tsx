import styled, {
  createGlobalStyle,
  ThemeProvider,
} from "styled-components";
// eslint-disable-next-line
import reset from "styled-reset";
import { HelmetProvider } from "react-helmet-async";

import AppRouter from "routes";
import { cssMaxWidth } from "styles/css";
import { lightTheme } from "styles/theme";

const GlobalStyle = createGlobalStyle`
  ${reset}

  /* 커스텀 리셋 */
  a {
    text-decoration: none;
    color: inherit;
  }
  input,
  button {
    padding: 0;
    border: none;
    background: none;
    font-size: inherit;
    font: inherit;
  }
  button {
    cursor: pointer;
  }
  button:disabled {
    cursor: initial;
  }

  /* 접근성 관련 */
  .sr-only {
    overflow: hidden;
    position: absolute;
    clip: rect(0, 0, 0, 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
  }
  
  body {
    font-family: "Pretendard";
    * {
      box-sizing: border-box;
    }
  }
`;

const Wrapper = styled.div`
  ${cssMaxWidth}
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

function App() {
  console.clear();

  console.log(
    "%c주니어 개발자 박시우가 열심히 개발중인",
    "font-family: 'Pretendard'; font-size: 16px; font-weight: 300"
  );
  console.log(
    "%cShare it!",
    "font-family: 'Pretendard'; font-size: 24px; font-weight: 800;background-image: linear-gradient(45deg, #fff710,#e47c0d); color: #ffffff; padding: 6px 8px 2px 11px;"
  );

  return (
    <HelmetProvider>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>
        <Wrapper>
          <AppRouter />
        </Wrapper>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
