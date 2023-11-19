import { render } from '@testing-library/react';
import { setupStore } from '../store/store';
import { Provider } from 'react-redux';
import router from '../controller/router/router';
import { RouterProvider } from 'react-router-dom';

export const renderApp = () => {
  const store = setupStore();
  const div = document.createElement('div');
  const renderProvider = (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );

  return {
    renderProvider,
    ...render(renderProvider, { container: document.body.appendChild(div) }),
  };
};
