import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className={styles.notFound}
      onClick={() => {
        navigate('/');
      }}
    >
      <h1>Sorry... Page not found</h1>
    </div>
  );
}
