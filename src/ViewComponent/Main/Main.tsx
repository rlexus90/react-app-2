import { Link, Outlet } from 'react-router-dom';
import { RequestAns, RespParam } from '../../types/types';
import style from './Main.module.scss';
import { Dispatch, SyntheticEvent } from 'react';
import { queryToAPI } from '../../utils/utils';
import noImg from '/no_image.jpg';

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
  };

  const nextPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!filmResp?.next) return;
    const page = await queryToAPI({
      ...respParam,
      page: String(+filmResp.page + 1),
    });
    if (page) setFilmResp(page);
  };

  return (
    <div className={style.main}>
      <div className={style.wrapper}>
        <ul className={style.container}>
          {filmResp?.results.map((el) => {
            return (
              <li className={style.film} key={el.id}>
                <Link to={`${el.id}`} className={style.more}>
                  <img
                    className={style.image}
                    src={el.primaryImage ? el.primaryImage.url : noImg}
                    alt={
                      el.primaryImage
                        ? el.primaryImage.caption.plainText
                        : 'No image'
                    }
                  ></img>
                  <p className={style.name}>{el.titleText.text}</p>
                </Link>
              </li>
            );
          })}
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
