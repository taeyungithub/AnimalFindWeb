import Layout from '../src/layout/index'
import { globalStyles } from "../src/globalStyles";
import { Global } from '@emotion/react'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Global styles={globalStyles} />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
  )
}
