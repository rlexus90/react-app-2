import { useState } from 'react';
import './App.scss';
import Header from './ViewComponent/Header/Header';
import Main from './ViewComponent/Main/Main';
import { RequestAns } from './types/types';

function App() {
  const [searchValue, setSearchValue] = useState(() => {
    const loadFromStorage = localStorage.getItem('searchValue');
    if (loadFromStorage) return loadFromStorage;
    return '';
  });
  const [filmResp, setFilmResp] = useState<RequestAns | undefined>();

  return (
    <>
      <Header
        searchValue={searchValue}
        setFilmResp={setFilmResp}
        setSearchValue={setSearchValue}
      ></Header>

      {/* <Main
        starShips={starShips}
        dataResp={dataResp}
        setDataResp={setDataResp}
      ></Main> */}
    </>
  );
}

export default App;
