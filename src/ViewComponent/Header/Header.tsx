import { KeyboardEvent, ChangeEvent, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';
import { useActions } from '../../store/hook/hook';
import { useErrorBoundary } from 'react-error-boundary';

function Header() {
  const { setRespParam, setRespWithOutSearch } = useActions();
  const [inputVal, setInputVal] = useState('');
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const search = localStorage.getItem('searchValue');
    if (search) {
      setRespParam({ searchValue: search });
      setInputVal(search);
    }
  }, []);

  const saveSearchValue = () => {
    localStorage.setItem('searchValue', inputVal as string);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputVal(value);
    setRespWithOutSearch({ searchValue: value });
  };

  const buttonClick = async () => {
    saveSearchValue();
    setRespWithOutSearch({ searchValue: inputVal });
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
    showBoundary(Error('Opps!'));
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
          value={inputVal}
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
