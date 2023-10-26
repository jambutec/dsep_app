import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
    return (
        <Html>
            <Head>
                <meta
                    name="description"
                    content="Um aplicativo para educação digital  para todos"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="shortcut icon"
                    href="/images/belem_tag.svg"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
