import Head from 'next/head'
import LoginPage from './signjoin/login'

export default function Home() {
  return (
    <>
      <LoginPage />
      <Head>
        <title>집사를 찾아주세요</title>
      </Head>
    
    </>
  )
}
