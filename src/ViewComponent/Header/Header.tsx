import { KeyboardEvent, ChangeEvent, useContext } from 'react';
import styles from './Header.module.scss';
import { queryToAPI } from '../../utils/utils';
import { RespContext } from '../../context/RespContext';
import { RequestAns } from '../../types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVirus } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const { respParam, setFilmResp, setRespParam, setIsFilmLoad } =
    useContext(RespContext);

  const saveSearchValue = () => {
    if (respParam?.searchValue)
      localStorage.setItem('searchValue', respParam.searchValue);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setRespParam({ ...respParam, searchValue: value });
  };

  const buttonClick = async () => {
    setIsFilmLoad(false);
    const resp = await queryToAPI(respParam);
    saveSearchValue();
    setFilmResp(resp);
    setIsFilmLoad(true);
  };

  const inputKeyPress = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'Enter') buttonClick();
  };

  const selectlimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setRespParam({ ...respParam, limit: value });
  };
  const throwError = () => {
    const resp = {} as RequestAns;
    setFilmResp(resp);
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
          value={respParam.searchValue}
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
