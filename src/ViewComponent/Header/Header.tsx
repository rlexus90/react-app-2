import { KeyboardEvent, ChangeEvent, useEffect } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
import { useActions, useAppSelector } from '../../store/hook/hook';

function Header() {
  const { setRespParam } = useActions();
  const { searchValue } = useAppSelector((store) => store.respParam);

  useEffect(() => {
    const search = localStorage.getItem('searchValue');
    if (search) {
      setRespParam({ searchValue: search });
    }
  }, []);

  const saveSearchValue = () => {
    localStorage.setItem('searchValue', searchValue as string);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRespParam({ searchValue: value });
  };

  const buttonClick = async () => {
    saveSearchValue();
    setRespParam({ searchValue });
  };

  const inputKeyPress = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'Enter') buttonClick();
  };

  const selectlimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setRespParam({ limit: value });
  };
  const throwError = () => {
    // const resp = {} as RequestAns;
  };

  return (
    <div className="header">
      <div className={styles.wrapper}>
        <FontAwesomeIcon
          icon={faVirus}
          onClick={throwError}
          className={styles.error}
          data-testid="bug-icon"
        />
        <input
          type="text"
          className={styles.search}
          value={searchValue}
          onChange={onChangeHandler}
          onKeyDown={inputKeyPress}
          data-testid="search-input"
        />
        <button className={styles.btn} onClick={buttonClick}>
          Search
        </button>
        <select defaultValue={10} onChange={selectlimit} data-testid="select">
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="10" disabled={true}>
            10
          </option>
          <option value="12">12</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
