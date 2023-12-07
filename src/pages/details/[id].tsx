import { Main } from '@/ViewComponent/Main/Main';
import { GetServerSideProps } from 'next/types';
import { Film, RequestAns } from '@/types/types';
import { FC, useEffect, useRef } from 'react';
import { filmApi } from '@/controler/FilmAPI';
import Header from '@/ViewComponent/Header/Header';
import { useRouter } from 'next/router';
import { Loader } from '@/component/Loader/Loader';

const Home: FC<{ filmsAns: RequestAns; film?: Film }> = ({
  filmsAns,
  film,
}) => {
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
      <Main filmsAns={filmsAns} film={film} />
      <div className="loader" ref={loader}>
        <Loader />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  filmsAns: RequestAns;
  film?: Film;
}> = async (context) => {
  const { query, params } = context;
  const filmsAns = await filmApi.getFilmsPage(query);
  if (!params?.id) return { props: { filmsAns } };
  const film = await filmApi.getFilm(params.id as string);
  return {
    props: { filmsAns, film },
  };
};

export default Home;
