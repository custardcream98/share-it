import styled, {
  createGlobalStyle,
  ThemeProvider,
} from "styled-components";
// eslint-disable-next-line
import reset from "styled-reset";
import { HelmetProvider } from "react-helmet-async";

import AppRouter from "routes";
import { cssCustomReset, cssMaxWidth } from "styles/css";
import { lightTheme } from "styles/theme";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${cssCustomReset}
  
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
