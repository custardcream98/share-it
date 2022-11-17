import AppRouter from "routes";
import styled, {
  createGlobalStyle,
  ThemeProvider,
} from "styled-components";
import reset from "styled-reset";
import { cssCustomReset } from "styles/css";
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
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>
        <Wrapper>
          <AppRouter isLoggedIn={true} />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
