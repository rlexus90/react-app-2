import style from './Main.module.scss';
import noImg from '../../../public/no_image.jpg';
import { NavPanel } from '@/component/NavPanel/NavPanel';
import { FC } from 'react';
import { Film, RequestAns } from '@/types/types';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { MoreInfo } from '../Modal/MoreInfo';

export const Main: FC<{ filmsAns: RequestAns; film?: Film }> = ({
  filmsAns,
  film,
}) => {
  const { page, next } = filmsAns;
  const router = useRouter();
  const query = router.query;
  delete query.id;
  const url = new URLSearchParams(
    query as unknown as URLSearchParams
  ).toString();

  return (
    <>
      <div className={style.main} data-testid="main">
        <div className={style.wrapper}>
          <ul className={style.container}>
            {!filmsAns?.results?.length ? (
              <div className={style.no_film}>Nothing found!</div>
            ) : (
              filmsAns?.results.map((el) => {
                return (
                  <li data-testid="card" className={style.film} key={el.id}>
                    <Link
                      href={`details/${el.id}?${url}`}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push({
                          pathname: `/details/${el.id}`,
                          query: query,
                        });
                      }}
                      className={style.more}
                    >
                      <Image
                        className={style.image}
                        width={el.primaryImage ? el.primaryImage.width : 200}
                        height={el.primaryImage ? el.primaryImage.height : 200}
                        src={el.primaryImage ? el.primaryImage.url : noImg}
                        alt={
                          el.primaryImage
                            ? el.primaryImage.caption.plainText
                            : 'No image'
                        }
                      />
                      <p className={style.name}>{el.titleText.text}</p>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>

          {filmsAns?.results?.length ? (
            <NavPanel page={page} next={next} />
          ) : null}
        </div>
        {film ? <MoreInfo film={film} /> : <></>}
      </div>
    </>
  );
};
