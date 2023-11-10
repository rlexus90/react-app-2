import { Outlet } from 'react-router-dom';
import { RequestAns, RespParam } from '../../types/types';
import style from './Main.module.scss';
import { Dispatch, SyntheticEvent } from 'react';
import { queryToAPI } from '../../utils/utils';

type MainProps = {
  filmResp: RequestAns | undefined;
  setFilmResp: Dispatch<RequestAns | undefined>;
  respParam: RespParam;
};

export default function Main({ filmResp, setFilmResp, respParam }: MainProps) {
  const currentPage = filmResp ? filmResp.page : '';

  const prewPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (filmResp?.page === 1 || !filmResp?.page) return;
    const page = await queryToAPI({
      ...respParam,
      page: String(filmResp?.page - 1),
    });
    if (page) setFilmResp(page);
    console.log(page);
  };

  const nextPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!filmResp?.next) return;
    const page = await queryToAPI({
      ...respParam,
      page: String(+filmResp.page + 1),
    });
    if (page) setFilmResp(page);
    console.log(page);
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <ul>
          {/* {data?.results.map((el) => {
            const id = +el.url.split('/').slice(-2, -1);

            return (
              <li className={style.starship} key={id}>
                <p className={style.name}>{el.name}</p>
                <p className={style.model}>{el.model}</p>
                <Link to={`${id}`} className={style.more}>
                  more info
                </Link>
              </li>
            );
          })} */}
        </ul>
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
      </div>
      <Outlet></Outlet>
    </div>
  );
}
