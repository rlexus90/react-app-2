import { FallbackRender } from '@/component/ErrorBoundary/FallbackRender';
import { Layout } from '@/component/Layuot/Layout';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from 'react-error-boundary';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallbackRender={FallbackRender}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
