import { wrapper } from '../redux/store';
import Head from "next/head";

function App({ Component, pageProps, router }) {

  let title;
  if (router.asPath === '/') {
    title = 'Dashboard';
  } else {
    const tempName = router.asPath.slice(1);
    title = tempName[0].toUpperCase() + tempName.slice(1);
  }

  return <>
    <Head>
      <title>{ title }</title>
    </Head>
    <Component {...pageProps} />
  </>
}

export default wrapper.withRedux(App)