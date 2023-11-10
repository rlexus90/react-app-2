import { Dispatch } from 'react';
import styles from './Header.module.scss';
import { RequestAns } from '../../types/types';
import APIResponce from '../../controller/APIResponse';

type HeaderProps = {
  searchValue: string;
  setFilmResp: Dispatch<RequestAns | undefined>;
  setSearchValue: Dispatch<string>;
};

function Header({ searchValue, setFilmResp, setSearchValue }: HeaderProps) {
  const saveSearchValue = () => {
    if (searchValue) localStorage.setItem('searchValue', searchValue);
  };

  const onChangeHandler = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const buttonClick = async () => {
    let resp: RequestAns | undefined;
    saveSearchValue();
    if (searchValue) {
      resp = await APIResponce.getSearchMovie(searchValue);
    } else {
      resp = await APIResponce.getMoviePage();
    }
    setFilmResp(resp);
  };
  return (
    <div className="header">
      <div className={styles.wrapper}>
        <input
          type="text"
          className={styles.search}
          value={searchValue}
          onChange={onChangeHandler}
        />
        <button className={styles.btn} onClick={buttonClick}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Header;
