import { Main } from '@/ViewComponent/Main/Main';
import { GetServerSideProps } from 'next/types';
import { RequestAns } from '@/types/types';
import { FC, useEffect, useRef } from 'react';
import { filmApi } from '@/controler/FilmAPI';
import Header from '@/ViewComponent/Header/Header';
import { Loader } from '@/component/Loader/Loader';
import { useRouter } from 'next/router';

const Home: FC<RequestAns> = (filmsAns) => {
  const router = useRouter();
  const loader = useRef<HTMLDivElement>(null);
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      if (loader.current) loader.current.className = 'loader active';
    });

    router.events.on('routeChangeComplete', () => {
      if (loader.current) loader.current.className = 'loader';
    });
  }, []);

  return (
    <>
      <Header />
      <Main filmsAns={filmsAns} />
      <div className="loader" ref={loader}>
        <Loader />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<RequestAns> = async (
  context
) => {
  const query = context.query;
  const filmsAns = await filmApi.getFilmsPage(query);
  return {
    props: filmsAns,
  };
};

export default Home;
