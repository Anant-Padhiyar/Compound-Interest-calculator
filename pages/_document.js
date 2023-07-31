import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add Bootstrap CSS */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          />
          <style>
            {`
              body {
                background-color: ${this.props.mode === 'dark' ? 'black' : 'white'};
                color: white;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
          {/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}
        </body>
      </Html>
    );
  }
}

export default Document;

Document.getInitialProps = async (ctx) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  const { req } = ctx;
  const mode = req?.cookies?.mode || 'light';

  return { ...initialProps, mode };
};

