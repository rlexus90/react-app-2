import { useEffect, useState } from 'react';
import './App.scss';
import Header from './ViewComponent/Header/Header';
import Main from './ViewComponent/Main/Main';
import { RequestAns, RespParam } from './types/types';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';
import { queryToAPI } from './utils/utils';
import { Loader } from './component/Loader/Loader';

function App() {
  const [respParam, setRespParam] = useState((): RespParam => {
    const search = localStorage.getItem('searchValue');
    if (search) return { searchValue: search, page: '1', limit: '10' };
    return { page: '1', limit: '10' };
  });
  const [filmResp, setFilmResp] = useState<RequestAns | undefined>();
  const [isFilmLoad, setIsFilmLoad] = useState(false);

  useEffect(() => {
    (async () => {
      const firstLoad = await queryToAPI(respParam);
      setFilmResp(firstLoad);
      setIsFilmLoad(true);
    })();
  }, []);

  return (
    <>
      <Header
        respParam={respParam}
        setFilmResp={setFilmResp}
        setRespParam={setRespParam}
        setIsFilmLoad={setIsFilmLoad}
      ></Header>
      <ErrorBoundary>
        {isFilmLoad ? (
          <Main
            filmResp={filmResp}
            setFilmResp={setFilmResp}
            respParam={respParam}
            setIsFilmLoad={setIsFilmLoad}
          ></Main>
        ) : (
          <Loader />
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
