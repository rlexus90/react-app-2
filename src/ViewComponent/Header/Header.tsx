import { Dispatch, KeyboardEvent, ChangeEvent } from 'react';
import styles from './Header.module.scss';
import { RequestAns, RespParam } from '../../types/types';
import { queryToAPI } from '../../utils/utils';

type HeaderProps = {
  respParam: RespParam;
  setFilmResp: Dispatch<RequestAns | undefined>;
  setRespParam: Dispatch<RespParam>;
  setIsFilmLoad: Dispatch<boolean>;
};

function Header({
  respParam,
  setFilmResp,
  setRespParam,
  setIsFilmLoad,
}: HeaderProps) {
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

  return (
    <div className="header">
      <div className={styles.wrapper}>
        <input
          type="text"
          className={styles.search}
          value={respParam.searchValue}
          onChange={onChangeHandler}
          onKeyDown={inputKeyPress}
        />
        <button className={styles.btn} onClick={buttonClick}>
          Search
        </button>
        <select defaultValue={10} onChange={selectlimit}>
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="10" disabled={true}>
            10
          </option>
          <option value="12">12</option>
          <option value="16">16</option>
        </select>
      </div>
    </div>
  );
}

export default Header;
