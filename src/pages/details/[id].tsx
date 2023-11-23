import { Main } from '@/ViewComponent/Main/Main';
import { GetServerSideProps } from 'next/types';
import { Film, RequestAns } from '@/types/types';
import { FC } from 'react';
import { filmApi } from '@/controler/FilmAPI';
import Header from '@/ViewComponent/Header/Header';

const Home: FC<{ filmsAns: RequestAns; film?: Film }> = ({
  filmsAns,
  film,
}) => {
  return (
    <>
      <Header />
      <Main filmsAns={filmsAns} film={film} />
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
