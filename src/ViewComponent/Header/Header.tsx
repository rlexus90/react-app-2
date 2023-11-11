import { Dispatch, KeyboardEvent } from 'react';
import styles from './Header.module.scss';
import { RequestAns, RespParam } from '../../types/types';
import { queryToAPI } from '../../utils/utils';

type HeaderProps = {
  respParam: RespParam;
  setFilmResp: Dispatch<RequestAns | undefined>;
  setRespParam: Dispatch<RespParam>;
};

function Header({ respParam, setFilmResp, setRespParam }: HeaderProps) {
  const saveSearchValue = () => {
    if (respParam?.searchValue)
      localStorage.setItem('searchValue', respParam.searchValue);
  };

  const onChangeHandler = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setRespParam({ ...respParam, searchValue: value });
  };

  const buttonClick = async () => {
    const resp = await queryToAPI(respParam);
    saveSearchValue();
    setFilmResp(resp);
  };

  const inputKeyPress = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'Enter') buttonClick();
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
      </div>
    </div>
  );
}

export default Header;
