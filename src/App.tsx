import { useState } from 'react';
import './App.scss';
import Header from './Header/Header';
import Main from './Main/Main';
import APIResponce from './controller/APIResponse';
import { Starship, StarshipsRequest } from './types/types';

function App() {
  const [searchValue, setSearchValue] = useState(() => {
const loadFromStorage = localStorage.getItem('searchValue');
    if (loadFromStorage) return loadFromStorage;
    return '';
  });
  const [starShips, setStarships] = useState<Starship[]>();
  const [dataResp, setDataResp] = useState<StarshipsRequest | undefined>();

  const buttonClick = async () => {
    let resp: StarshipsRequest | undefined;
    saveSearchValue();
    if (searchValue) {
      resp = await APIResponce.getSearchShips(searchValue);
    } else {
      resp = await APIResponce.getAllShips();
    }
    if (resp) {
      setStarships(resp.results);
    }
    setDataResp(resp);
  };

  const onChangeHandler = (event: { target: { value: string } }) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const saveSearchValue = () => {
    if (searchValue) localStorage.setItem('searchValue', searchValue);
  };

  return (
    <>
      <Header
        searchValue={searchValue}
        buttonClick={buttonClick}
        onChangeHandler={onChangeHandler}
      ></Header>

      <Main
        starShips={starShips}
        dataResp={dataResp}
        setDataResp={setDataResp}
      ></Main>
    </>
  );
}

export default App;
