import { it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderApp } from './utils/testUtils';
// import { server } from './mock/api/server';

//This for controll API request`s
// server.events.on('request:start', ({ request }) => {
//   console.log('MSW intercepted:', request.method, request.url);
// });

it('test navigation on document', async () => {
  const { container } = renderApp();

  const link = await screen.findAllByRole('link');
  const url1 = container.baseURI;

  expect(link[0]).toBeInTheDocument();

  await userEvent.click(link[0]);

  const moreInfo = await screen.findByTestId('more-info');
  const url2 = container.baseURI;

  expect(moreInfo).toBeInTheDocument();
  expect(url1).not.equal(url2);
  await userEvent.click(moreInfo);
  await screen.findAllByRole('link');

  const url3 = container.baseURI;
  expect(url2).not.equal(url3);
});
