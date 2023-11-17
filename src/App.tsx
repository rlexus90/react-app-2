import './App.scss';
import Header from './ViewComponent/Header/Header';
import Main from './ViewComponent/Main/Main';
import ErrorBoundary from './component/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </>
  );
}

export default App;
