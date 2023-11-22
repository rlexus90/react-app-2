import style from './Main.module.scss';
import noImg from '../../../public/no_image.jpg';
import { NavPanel } from '@/component/NavPanel/NavPanel';
import { FC } from 'react';
import { RequestAns } from '@/types/types';
import Link from 'next/link';
import Image from 'next/legacy/image';

export const Main: FC<{ data: RequestAns }> = ({ data: filmsAns }) => {
  // console.log(filmsAns)
  const { page, next } = filmsAns;
  return (
    <div className={style.main} data-testid="main">
      <div className={style.wrapper}>
        <ul className={style.container}>
          {!filmsAns?.results.length ? (
            <div className={style.no_film}>Nothing found!</div>
          ) : (
            filmsAns?.results.map((el) => {
              return (
                <li data-testid="card" className={style.film} key={el.id}>
                  <Link href={`${el.id}`} className={style.more}>
                    <Image
                      className={style.image}
                      width={266}
                      height={380}
                      layout="responsive"
                      src={el.primaryImage ? el.primaryImage.url : noImg}
                      alt={
                        el.primaryImage
                          ? el.primaryImage.caption.plainText
                          : 'No image'
                      }
                    ></Image>
                    <p className={style.name}>{el.titleText.text}</p>
                  </Link>
                </li>
              );
            })
          )}
        </ul>

        {filmsAns?.results.length ? <NavPanel page={page} next={next} /> : null}
      </div>
      {/* <Outlet></Outlet> */}
    </div>
  );
};
