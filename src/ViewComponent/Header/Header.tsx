import { ChangeEventHandler, MouseEventHandler } from 'react';
import styles from './Header.module.scss';

function Header(props: {
  searchValue: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  buttonClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="header">
      <div className={styles.wrapper}>
        <input
          type="text"
          className={styles.search}
          value={props.searchValue}
          onChange={props.onChangeHandler}
        />
        <button className={styles.btn} onClick={props.buttonClick}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
