import { Navigate, useNavigate, useParams } from 'react-router-dom';
import styles from './MoreInfo.module.scss';
import noImg from '/no_image.jpg';
import { useGetMovieQuery } from '../../controller/FilmAPI';
import { Loader } from '../../component/Loader/Loader';

export default function MoreInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, status } = useGetMovieQuery(id as string);
  const film = data?.results;
  console.log(status);
  if (status == 'fulfilled') {
    if (!film) return <Navigate to={'*'} />;
  }
  const returnBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.modal} onClick={returnBack} data-testid="more-info">
      {isFetching ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <img
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
      )}
    </div>
  );
}
