import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import MoreInfo from '../Modal/MoreInfo';
import App from '../../App';
import NotFound from './NotFound';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { server } from '../../mock/api/server';

const store = setupStore();
server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

it('Test not found page', async () => {
  const rote = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: ':id',
            element: <MoreInfo />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
    {
      initialEntries: ['/wrong'],
    }
  );
  render(
    <Provider store={store}>
      <RouterProvider router={rote} />
    </Provider>
  );

  const text = await screen.findByText('Sorry... Page not found');
  expect(text).toBeInTheDocument();
});
