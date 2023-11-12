import { SyntheticEvent, useContext } from 'react';
import { queryToAPI } from '../../utils/utils';
import style from './NavPanel.module.scss';
import { RespContext } from '../../context/RespContext';

export default function NavPanel() {
  const { filmResp, setFilmResp, respParam, setIsFilmLoad } =
    useContext(RespContext);

  const currentPage = filmResp ? filmResp.page : '';

  const prewPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsFilmLoad(false);
    if (filmResp?.page === 1 || !filmResp?.page) return;
    const page = await queryToAPI({
      ...respParam,
      page: String(filmResp?.page - 1),
    });
    if (page) setFilmResp(page);
    setIsFilmLoad(true);
  };

  const nextPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsFilmLoad(false);
    if (!filmResp?.next) return;
    const page = await queryToAPI({
      ...respParam,
      page: String(+filmResp.page + 1),
    });
    if (page) setFilmResp(page);
    setIsFilmLoad(true);
  };

  return (
    <nav className={style.nav}>
      <a
        href="#"
        className={filmResp?.page == 1 ? style.disabled : ' '}
        onClick={prewPage}
      >
        prew
      </a>
      <p>{currentPage}</p>
      <a
        href="#"
        className={!filmResp?.next ? style.disabled : ' '}
        onClick={nextPage}
      >
        next
      </a>
    </nav>
  );
}
