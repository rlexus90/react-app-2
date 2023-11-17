import { Link, Outlet, useSearchParams } from 'react-router-dom';
import style from './Main.module.scss';
import noImg from '/no_image.jpg';
import NavPanel from '../../component/NavPanel/NavPanel';
import { useActions, useAppSelector } from '../../store/hook/hook';
import { useGetMoviePageQuery } from '../../controller/FilmAPI';
import { Loader } from '../../component/Loader/Loader';
import { useEffect } from 'react';

export default function Main() {
  const { searchValue, page, limit } = useAppSelector(
    (store) => store.respParam
  );
  const { data: filmsAns, isFetching } = useGetMoviePageQuery({
    searchValue,
    page,
    limit,
  });
  const { setHaveNext, setRespParam } = useActions();
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const searchPage = searchParam.get('page');
    if (searchPage) setRespParam({ page: searchPage });
  }, [searchParam]);

  useEffect(() => {
    if (page) setSearchParam({ page });
  }, [page]);

  (async () => {
    (await filmsAns?.next) ? setHaveNext(true) : setHaveNext(false);
  })();

  return (
    <div className={style.main} data-testid="main">
      <div className={style.wrapper}>
        {isFetching ? (
          <Loader />
        ) : (
          <ul className={style.container}>
            {!filmsAns?.results.length ? (
              <div className={style.no_film}>Nothing found!</div>
            ) : (
              filmsAns?.results.map((el) => {
                return (
                  <li data-testid="card" className={style.film} key={el.id}>
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
              })
            )}
          </ul>
        )}
        {filmsAns?.results.length ? <NavPanel /> : null}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
