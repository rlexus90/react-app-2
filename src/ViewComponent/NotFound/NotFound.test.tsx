import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import APIResponce from '../../controller/APIResponse';
import MoreInfo from '../Modal/MoreInfo';
import App from '../../App';
import NotFound from './NotFound';
import { respMock } from '../../common/Mocks/respMock';
import { RequestAns } from '../../types/types';

vi.mock('./utils/utils', () => ({
  queryToAPI: vi.fn().mockResolvedValue(respMock),
}));
const resp = { type: 'return', value: { results: null } } as unknown as RequestAns;
const getmovie = vi.spyOn(APIResponce, 'getMovie');
getmovie.mockResolvedValue(resp)

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
            loader: (params) => {
              if (params.params.id) {
                const data = APIResponce.getMovie(params.params.id);
                return data;
              }
              return null;
            },
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
	console.log(getmovie.mock.results)
});
