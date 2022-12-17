import React from "react";
import { ThemeProvider } from "styled-components";
import Router from "./shared/Router";
import theme from "./styles/theme";
import GlobalStyle from "./shared/GlobalStyle";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
