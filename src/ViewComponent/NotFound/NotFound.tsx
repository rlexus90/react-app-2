import { useRouter } from 'next/router';
import styles from './NotFound.module.scss';

export default function NotFound() {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    router.push('/');
  }, 3000);

  const router = useRouter();
  return (
    <div
      className={styles.notFound}
      onClick={() => {
        router.push('/');
      }}
    >
      <h1>Sorry... Page not found</h1>
    </div>
  );
}
