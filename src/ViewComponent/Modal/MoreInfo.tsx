import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import styles from './MoreInfo.module.scss';
import { Film, RequestAns } from '../../types/types';
import noImg from '/no_image.jpg';

export default function MoreInfo() {
  const data = useLoaderData() as RequestAns;
  const film = data.results as unknown as Film;
  const navigate = useNavigate();

  if (!film) return <Navigate to="*" />;

  const returnBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.modal} onClick={returnBack}>
      <div className={styles.wrapper}>
        <img
          className={styles.image}
          src={film.primaryImage ? film.primaryImage.url : noImg}
          alt={
            film.primaryImage ? film.primaryImage.caption.plainText : 'No Image'
          }
        />
        <p>{film.originalTitleText.text}</p>
        <p>Year: {film.releaseYear?.year}</p>
      </div>
    </div>
  );
}
