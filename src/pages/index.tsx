import { Main } from '@/ViewComponent/Main/Main';
import { GetServerSideProps } from 'next/types';
import { RequestAns } from '@/types/types';
import { FC } from 'react';
import { filmApi } from '@/controler/FilmAPI';
import Header from '@/ViewComponent/Header/Header';

const Home: FC<RequestAns> = (filmsAns) => {
  return (
    <>
      <Header />
      <Main filmsAns={filmsAns} />
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
