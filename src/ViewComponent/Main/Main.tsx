import { Link, Outlet } from 'react-router-dom';
import { RequestAns, RespParam } from '../../types/types';
import style from './Main.module.scss';
import { Dispatch } from 'react';
import noImg from '/no_image.jpg';
import NavPanel from '../../component/NavPanel/NavPanel';

type MainProps = {
  filmResp: RequestAns | undefined;
  setFilmResp: Dispatch<RequestAns | undefined>;
  respParam: RespParam;
  setIsFilmLoad: Dispatch<boolean>;
};

export default function Main({
  filmResp,
  setFilmResp,
  respParam,
  setIsFilmLoad,
}: MainProps) {
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
        <NavPanel
          filmResp={filmResp}
          setFilmResp={setFilmResp}
          respParam={respParam}
          setIsFilmLoad={setIsFilmLoad}
        />
      </div>
      <Outlet></Outlet>
    </div>
  );
}
