import { FC, SyntheticEvent } from 'react';
import style from './NavPanel.module.scss';
import Link from 'next/link';

export const NavPanel: FC<{
  page: number;
  next: string | undefined;
}> = ({ page, next }) => {
  // const prewPage = (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   if (page === '1' || !page) return;
  //   const newPage = +page - 1;
  //   setRespParam({ page: newPage.toString() });
  // };

  // const nextPage = async (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   if (!haveNext || !page) return;
  //   const newPage = +page + 1;
  //   setRespParam({ page: newPage.toString() });
  // };

  return (
    <nav className={style.nav}>
      <Link
        href="#"
        className={page == 1 ? style.disabled : ' '}
        // onClick={prewPage}
      >
        prew
      </Link>
      <p>{page}</p>
      <Link
        href="#"
        className={!next ? style.disabled : ' '}
        // onClick={nextPage}
      >
        next
      </Link>
    </nav>
  );
};
