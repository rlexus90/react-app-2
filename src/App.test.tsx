import { it, expect, vi } from 'vitest';
import { respMock } from './common/Mocks/respMock';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import router from './controller/router/router';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
// import { RequestAns } from './types/types';

// const resp = respMockOneFilm as unknown as RequestAns;
vi.mock('./utils/utils', () => ({
  queryToAPI: vi.fn().mockResolvedValue(respMock),
}));

it.skip('test navigation on document', async () => {
  const div = document.createElement('div');
  const { rerender, container } = render(<RouterProvider router={router} />, {
    container: document.body.appendChild(div),
  });
  // const getmovie = vi.spyOn(APIResponce, 'getMovie');
  // getmovie.mockResolvedValue(resp);

  const link = await screen.findAllByRole('link');
  const url1 = container.baseURI;

  expect(link[0]).toBeInTheDocument();
  // expect(getmovie).toBeCalledTimes(0);

  await userEvent.click(link[0]);
  await rerender(<RouterProvider router={router} />);

  const moreInfo = await screen.findByTestId('more-info');
  const url2 = container.baseURI;

  // expect(getmovie).toBeCalledTimes(1);
  // expect(getmovie).toBeCalledWith('tt21361444');
  expect(url1).not.equal(url2);
  await userEvent.click(moreInfo);
  await rerender(<RouterProvider router={router} />);
  await screen.findAllByRole('link');

  const url3 = container.baseURI;
  expect(url2).not.equal(url3);
  expect(url1).equal(url3);
});
