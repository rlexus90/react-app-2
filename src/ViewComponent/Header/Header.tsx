import { KeyboardEvent, ChangeEvent, useEffect, FC, useRef } from 'react';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { RespParam } from '@/types/types';
import { useErrorBoundary } from 'react-error-boundary';
import { ParsedUrlQuery } from 'querystring';

export const Header: FC = () => {
  const router = useRouter();
  const query: RespParam = router.query;
  const input = useRef<HTMLInputElement>(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const text = localStorage.getItem('searchValue');

    if (text && input.current) input.current.value = text;
  });

  const saveSearchValue = () => {
    localStorage.setItem('searchValue', query.search as string);
  };

  const buttonClick = async () => {
    query.search = input.current?.value;
    query.page = '1';
    saveSearchValue();
    router.push({ pathname: '/', query: query as ParsedUrlQuery });
  };

  const inputKeyPress = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'Enter') buttonClick();
  };

  const selectlimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!value) return;
    query.limit = value;
    router.push({ pathname: '/', query: query as ParsedUrlQuery });
  };
  const throwError = () => {
    showBoundary(Error('Opps!'));
  };

  return (
    <div className="header">
      <div className={styles.wrapper}>
        <FontAwesomeIcon
          icon={faBomb}
          onClick={throwError}
          className={styles.error}
          data-testid="bug-icon"
          fade
        />
        <input
          type="text"
          className={styles.search}
          ref={input}
          onKeyDown={inputKeyPress}
          data-testid="search-input"
        />
        <button className={styles.btn} onClick={buttonClick}>
          Search
        </button>
        <select
          defaultValue={query.limit || 10}
          onChange={selectlimit}
          data-testid="select"
        >
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
};

export default Header;
