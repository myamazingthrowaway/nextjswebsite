import React from "react";
import App from "next/app";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";

import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import initStore from "../src/store";
import theme from "../src/theme";

import Shell from "../src/components/Shell";

class EnhancedApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    };
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <title>nextjswebsite</title>
            <CssBaseline />
            <Shell>
              <Component {...pageProps} />
            </Shell>
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}

export default withRedux(initStore)(EnhancedApp);
