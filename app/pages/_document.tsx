import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import React from 'react';
import { DocumentContext, RenderPage } from 'next/dist/next-server/lib/utils';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // Render the app and get the context of the page with collected side effects
    const sheets = new ServerStyleSheets();
    const originalRenderPage: RenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
