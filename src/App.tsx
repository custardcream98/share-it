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
  return (
    <HelmetProvider>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>
        <Wrapper>
          <AppRouter isLoggedIn={true} />
        </Wrapper>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
