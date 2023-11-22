import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Main } from '@/ViewComponent/Main/Main';
import { GetServerSideProps } from 'next/types';
import { RequestAns } from '@/types/types';
import { HEADERS, REQUEST_URL } from '@/common/constants';
import axios from 'axios';
import { FC } from 'react';

const Home: FC<RequestAns> = (data) => {
  return (
    <>
      <Main data={data}></Main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<RequestAns> = async (
  context
) => {
  const { data } = await axios.get<RequestAns>(REQUEST_URL, {
    headers: HEADERS,
    params: {
      page: '1',
      limit: '10',
    },
  });
  console.log(2);
  console.log(context.query);
  return {
    props: data,
  };
};

export default Home;
