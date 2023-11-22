import { ErrorBoundary } from 'react-error-boundary';
import './App.scss';
import Header from './ViewComponent/Header/Header';
import Main from './ViewComponent/Main/Main';
import { FallbackRender } from './component/ErrorBoundary/FallbackRender';

function App() {
  return (
    <>
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Header />
        <Main />
      </ErrorBoundary>
    </>
  );
}

export default App;
