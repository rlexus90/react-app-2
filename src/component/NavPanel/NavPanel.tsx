import { FC, SyntheticEvent } from 'react';
import style from './NavPanel.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { RespParam } from '@/types/types';
import { ParsedUrlQuery } from 'querystring';

export const NavPanel: FC<{
  page: number;
  next: string | undefined;
}> = ({ page, next }) => {
  const router = useRouter();
  const query = router.query as RespParam;

  const prewPage = (event: SyntheticEvent) => {
    event.preventDefault();
    if (page === 1 || !page) return;
    const newPage = +page - 1;
    query.page = newPage.toString();
    router.push({ pathname: '/', query: query as ParsedUrlQuery });
  };

  const nextPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!next || !page) return;
    const newPage = +page + 1;
    query.page = newPage.toString();
    router.push({ pathname: '/', query: query as ParsedUrlQuery });
  };

  return (
    <nav className={style.nav}>
      <Link
        href="#"
        className={page == 1 ? style.disabled : ' '}
        onClick={prewPage}
      >
        prew
      </Link>
      <p>{page}</p>
      <Link
        href="#"
        className={!next ? style.disabled : ' '}
        onClick={nextPage}
      >
        next
      </Link>
    </nav>
  );
};
