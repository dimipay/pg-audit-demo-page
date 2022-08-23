import Head from 'next/head';
import { AppProps } from 'next/app';
import { globalStyles } from '../styles/styles';
import { RecoilRoot } from 'recoil';
import LoadingCard from '../components/LoadingCard';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>디미페이</title>

        <meta name="theme-color" content="#317EFB" />
      </Head>
      {globalStyles}
      <LoadingCard />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
