import style from './Loader.module.scss';

export const Loader = () => {
  return (
    <div data-testid="loader">
      <div className={style.background}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
