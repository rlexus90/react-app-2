import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import MoreInfo from '../Modal/MoreInfo';
import App from '../../App';
import NotFound from './NotFound';
// import { respMock } from '../../common/Mocks/respMock';
// import { RequestAns } from '../../types/types';

// vi.mock('./utils/utils', () => ({
//   queryToAPI: vi.fn().mockResolvedValue(respMock),
// }));
// const resp = {
//   type: 'return',
//   value: { results: null },
// } as unknown as RequestAns;
// const getmovie = vi.spyOn(APIResponce, 'getMovie');
// getmovie.mockResolvedValue(resp);

it.skip('Test not found page', async () => {
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
  render(<RouterProvider router={rote} />);

  const text = await screen.findByText('Sorry... Page not found');
  expect(text).toBeInTheDocument();
});
