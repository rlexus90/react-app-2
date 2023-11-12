import { Link, Outlet } from 'react-router-dom';
import style from './Main.module.scss';
import { useContext } from 'react';
import noImg from '/no_image.jpg';
import NavPanel from '../../component/NavPanel/NavPanel';
import { RespContext } from '../../context/RespContext';

export default function Main() {
  const { filmResp } = useContext(RespContext);
  return (
    <div className={style.main} data-testid="main">
      <div className={style.wrapper}>
        <ul className={style.container}>
          {!filmResp?.results.length ? (
            <div className={style.no_film}>Nothing found!</div>
          ) : (
            filmResp?.results.map((el) => {
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
            })
          )}
        </ul>
        {filmResp?.results.length ? <NavPanel /> : null}
      </div>
      <Outlet></Outlet>
    </div>
  );
}
