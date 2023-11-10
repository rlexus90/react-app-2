import styles from './NotFound.module.scss';
console.log(document.baseURI);
export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>Sorry... Page not found</h1>
    </div>
  );
}
