import { useState } from 'react';
import './App.scss';
import Header from './ViewComponent/Header/Header';
import Main from './ViewComponent/Main/Main';
import { RequestAns, RespParam } from './types/types';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';

function App() {
  const [respParam, setRespParam] = useState((): RespParam => {
    const search = localStorage.getItem('searchValue');
    if (search) return { searchValue: search, page: '1', limit: '10' };
    return { page: '1', limit: '10' };
  });
  const [filmResp, setFilmResp] = useState<RequestAns | undefined>();

  return (
    <>
      <Header
        respParam={respParam}
        setFilmResp={setFilmResp}
        setRespParam={setRespParam}
      ></Header>
      <ErrorBoundary>
        <Main
          filmResp={filmResp}
          setFilmResp={setFilmResp}
          respParam={respParam}
        ></Main>
      </ErrorBoundary>
    </>
  );
}

export default App;
