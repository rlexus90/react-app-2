import { SyntheticEvent } from 'react';
import style from './NavPanel.module.scss';
import { useActions, useAppSelector } from '../../store/hook/hook';

export default function NavPanel() {
  const { page } = useAppSelector((store) => store.respParam);
  const { setRespParam } = useActions();
  const { haveNext } = useAppSelector((store) => store.nextPage);

  const prewPage = (event: SyntheticEvent) => {
    event.preventDefault();
    if (page === '1' || !page) return;
    const newPage = +page - 1;
    setRespParam({ page: newPage.toString() });
  };

  const nextPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!haveNext || !page) return;
    const newPage = +page + 1;
    setRespParam({ page: newPage.toString() });
  };

  return (
    <nav className={style.nav}>
      <a
        href="#"
        className={page === '1' ? style.disabled : ' '}
        onClick={prewPage}
      >
        prew
      </a>
      <p>{page}</p>
      <a
        href="#"
        className={!haveNext ? style.disabled : ' '}
        onClick={nextPage}
      >
        next
      </a>
    </nav>
  );
}
