import { Link, Outlet } from 'react-router-dom';
import { Starship, StarshipsRequest } from '../../types/types';
import style from './Main.module.scss';
import { SyntheticEvent } from 'react';
import APIResponce from '../../controller/APIResponse';

export default function Main(props: {
  starShips: Starship[] | undefined;
  dataResp: StarshipsRequest | undefined;
  setDataResp(a: StarshipsRequest): void;
}) {
  const data = props.dataResp;

  const currentPage = data
    ? !data.previous
      ? '1'
      : Number(data.previous?.split('=').slice(-1)) + 1
    : '';

  const prewPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!props.dataResp?.previous) return;
    const resp = await APIResponce.getShipFromPage(props.dataResp.previous);
    if (resp) props.setDataResp(resp) as void;
  };

  const nextPage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!props.dataResp?.next) return;
    const resp = await APIResponce.getShipFromPage(props.dataResp.next);
    if (resp) props.setDataResp(resp) as void;
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <ul>
          {data?.results.map((el) => {
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
          })}
        </ul>
        <nav className={style.nav}>
          <a
            href="#"
            className={!props.dataResp?.previous ? style.disabled : ' '}
            onClick={prewPage}
          >
            prew
          </a>
          <p>{currentPage}</p>
          <a
            href="#"
            className={!props.dataResp?.next ? style.disabled : ' '}
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
