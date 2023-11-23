import { Film, RequestAnsOneFilm, RespParam } from '@/types/types';
import styles from './MoreInfo.module.scss';
import noImg from '../../../public/no_image.jpg';
import { Loader } from '@/component/Loader/Loader';
import { FC } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const MoreInfo: FC<{ film: Film }> = ({ film }) => {
  const router = useRouter();
  const query: RespParam = router.query;
  delete query.id;
  const url = new URLSearchParams(
    query as unknown as URLSearchParams
  ).toString();

  if (!film) return router.push('/');

  const returnBack = () => {
    router.replace(`/?${url}`);
  };

  return (
    <>
      <div
        className={styles.modal}
        onClick={returnBack}
        data-testid="more-info"
      >
        <div className={styles.wrapper}>
          <Image
            width={650}
            height={900}
            layout="responsive"
            className={styles.image}
            src={film?.primaryImage ? film.primaryImage.url : noImg}
            alt={
              film?.primaryImage
                ? film.primaryImage.caption.plainText
                : 'No Image'
            }
          />
          <p>{film?.originalTitleText.text}</p>
          <p>Year: {film?.releaseYear?.year}</p>
        </div>
      </div>
    </>
  );
};
