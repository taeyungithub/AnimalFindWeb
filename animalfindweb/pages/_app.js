import Layout from '../src/layout/index';
import { globalStyles } from "../src/globalStyles";
import { Global } from '@emotion/react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { pathname } = router;
  
  // 레이아웃을 제거할 페이지 경로 목록
  const pagesWithoutLayout = ['/', '/signjoin/join'];

  // 현재 페이지가 레이아웃을 제거할 페이지인지 확인
  const shouldRenderLayout = !pagesWithoutLayout.includes(pathname);

  return (
    <>
      <Global styles={globalStyles} />
      {shouldRenderLayout && <Layout> {/* 레이아웃을 적용할 경우 */}
        <Component {...pageProps} />
      </Layout>}
      {!shouldRenderLayout && <Component {...pageProps} />} {/* 레이아웃을 제거할 경우 */}
    </>
  );
}
